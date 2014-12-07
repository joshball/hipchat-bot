// Load modules

//var Hoek = require('hoek');
//var Boom = require('boom');
//var Joi = require('joi');

var LostCreekWeather = require('../plugins/LostCreekWeather');

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

Bluebird.promisifyAll(utils.HC);

var handleMessage = function(item, message){
    if(message === 'wx') {

        return Current.ip()
            .then(Current.showString)
            .then(function(msgString){
                var roomId = item.room.id;
                var params = {
                    room: roomId,
                    from: 'Da Bot',
                    message: msgString,
                    color: 'yellow'
                };

                console.log('Posting to Room:', roomId);
                return utils.HC.postMessageAsync(params)
                    .then(function(r){
                        console.log('ALL DONE', r);
                    })
                    .catch(function(e){
                        if(e.status == 'sent'){
                            return
                        }
                        console.log('postMessageAsync.fail', e);
                        return;
                    });
            })
            .then(function(r){
                console.log('ALL DONE', r);
            });

    }
};

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

        if(event === 'room_message'){
            var msg = item.message;
            var room = item.room;
            var user = msg.from;
            var mentions = msg.mentions;
            var message = msg.message;
            var type = msg.type;
            var split = message.toLowerCase().split('!bot');

            if(split.length == 0){
                console.log('Why is this split only returning 0:', msg, split);
                return;
            }
            if(split.length == 1){
                console.log('Why is this split only returning 1:', msg, split);
                return;
            }
            var messages = split.filter(Boolean).map(function(msg){return msg.trim();});

            messages.forEach(function(msg){
                handleMessage(item, msg);
            })
        }

        reply({success: true});
    }
};
