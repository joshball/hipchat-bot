'use strict';

var RoomEvent = require('./../hipchatBotApi/RoomEvent');

var payload = {
    "event": "room_message",
    "item": {
        "message": {
            "date": "2014-12-07T22:28:16.943100+00:00",
            "from": {
                "id": 872482,
                "links": {
                    "self": "https://api.hipchat.com/v2/user/872482"
                },
                "mention_name": "JoshuaBall",
                "name": "Joshua Ball"
            },
            "id": "ffeca7e7-5ddc-47cd-8141-6bdf95cd7106",
            "mentions": [
                {
                    "id": 872482,
                    "links": {
                        "self": "https://api.hipchat.com/v2/user/872482"
                    },
                    "mention_name": "JoshuaBall",
                    "name": "Joshua Ball"
                }
            ],
            "message": "@all foo !bot bar baz",
            "type": "message"
        },
        "room": {
            "id": 1031892,
            "links": {
                "members": "https://api.hipchat.com/v2/room/1031892/member",
                "participants": "https://api.hipchat.com/v2/room/1031892/participant",
                "self": "https://api.hipchat.com/v2/room/1031892",
                "webhooks": "https://api.hipchat.com/v2/room/1031892/webhook"
            },
            "name": "bt"
        }
    },
    "oauth_client_id": "ecfd5dd2-b811-40da-b5e8-1e788c0fd791",
    "webhook_id": 442718
};

var request = {
    payload: payload,
    headers: {},
    query: {}
};

RoomEvent.post.handler(request, function(msg){console.log('REPLY:', msg)});
