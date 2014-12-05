// Load modules

//var Hoek = require('hoek');
//var Boom = require('boom');
//var Joi = require('joi');


// Declare internals

var internals = {};


// Forbidden usernames

internals.commands = {
    pick: 'pick'
};


// Current user information

exports.getInfo = {
    handler: function (request, reply) {
        return reply({ok: 1234});
    }
};


// Change profile properties

exports.post = {
    //validate: {
    //    payload: {
    //        event: Joi.string().min(3).required(),
    //        item: Joi.object().required(),
    //        oauth_client_id: Joi.string().min(10), // get a real validation
    //        webhook_id: Joi.string().min(3).required() // get a better num?
    //    }
    //},
    handler: function (request, reply) {

        console.log('\n\nPOST: room/event');
        console.log('\nrequest.query:\n', JSON.stringify(request.query, undefined, 4));
        console.log('\nrequest.payload:\n', JSON.stringify(request.payload, undefined, 4));
        console.log('\nrequest.headers:\n', JSON.stringify(request.headers, undefined, 4));
        var event = request.payload.event,
            item = request.payload.item,
            oauth_client_id = request.payload.oauth_client_id,
            webhook_id = request.payload.webhook_id;

        //console.log('event: ',event);
        //console.log('item: ',JSON.stringify(item, undefined, 4));
        //console.log('oauth_client_id: ',oauth_client_id);
        //console.log('webhook_id: ',webhook_id);

        reply({success: true});
    }
};
