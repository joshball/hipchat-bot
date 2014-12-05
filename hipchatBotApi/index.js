'use strict';

// Load modules

//var Hoek = require('hoek');
var Routes = require('./routes');


// Declare internals

var internals = {};


exports.register = function (plugin, options, next) {

    console.log('registering... options', options)
    plugin.bind({
        config: plugin.app.config,
        //vault: plugin.app.vault
    });

    //Hoek.assert(!err, 'Failed loading plugin: ' + err);

    plugin.route({
        method: 'GET',
        path: '/test',
        handler: function (request, reply) {
            reply('test passed');
        }
    });

    plugin.route(Routes.endpoints);
    console.log('done...')

    next();

};


exports.register.attributes = {
    pkg: require('./package.json')
};


