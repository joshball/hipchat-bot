'use strict';

// Load modules

//var Hoek = require('hoek');
var Routes = require('./routes');


// Declare internals

var internals = {};


exports.register = function (plugin, options, next) {

    plugin.bind({
        config: plugin.app.config,
        vault: plugin.app.vault
    });

    //Hoek.assert(!err, 'Failed loading plugin: ' + err);

    plugin.route({
        method: 'GET',
        path: '/test',
        handler: function (request, reply) {
            reply('test passed');
        }
    });

    plugin.ext('onPreResponse', internals.onPreResponse);
    plugin.route(Routes.endpoints);

    next();

};


exports.register.attributes = {
    pkg: require('./package.json')
};


// Post handler extension middleware

internals.onPreResponse = function (request, reply) {

    var response = request.response;
    if (!response.isBoom &&
        response.variety === 'plain' &&
        response.source instanceof Array === false) {

        // Sanitize database fields

        var payload = response.source;

        if (payload._id) {
            payload.id = payload._id;
            delete payload._id;
        }

        for (var i in payload) {
            if (payload.hasOwnProperty(i)) {
                if (i[0] === '_') {
                    delete payload[i];
                }
            }
        }
    }

    return reply();
};

