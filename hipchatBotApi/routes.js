// Load modules

var RoomEvent = require('./RoomEvent');


// API Server Endpoints

exports.endpoints = [

    { method: 'GET', path: '/info', config: RoomEvent.getInfo },
    { method: 'POST', path: '/room/event', config: RoomEvent.post }
];

