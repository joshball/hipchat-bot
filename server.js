'use strict';
// Load modules

var BluebirdPromise = require('Bluebird');
var Path = require('path');
var Hapi = require('hapi');
var Config = require('./config');
//var Vault = require('./secretEnvVars');
var hapiHelpers = require('./hipchatBotApi/hapiHelpers');

var hipchatBotApi = require(Path.join(__dirname, 'hipchatBotApi'));

// Declare internals

var internals = {};

console.log('===================================== NEW RUN =====================================');

var server = new Hapi.Server(~~process.env.PORT || 8112);

server.pack.app.config = Config;

BluebirdPromise.promisifyAll(server);
BluebirdPromise.promisifyAll(server.pack);

var hipchatBotApiOptions = {
    labels: 'api',
    cors: true
};

console.log('Registering plugins...');

return server.pack
    //.registerAsync({plugin: hipchatBotApi, options: hipchatBotApiOptions}, {select: 'api', route: {prefix: '/hipchatBot/api'}})
    .registerAsync({plugin: hipchatBotApi, options: hipchatBotApiOptions}, {route: {prefix: '/hipchatBot/api'}})
    //.registerAsync({plugin: hipchatBotApi, options: hipchatBotApiOptions})
    .then(function () {
        console.log('Starting Server...');
        return server.startAsync();
    })
    .then(function () {
        hapiHelpers.dumpHapiRoutes(server);
        console.log('Server Started! The party is on at: %s', server.info.uri);
        return server;
    })
    .catch(function (error) {
        console.error('createServer has an error!');
        console.error(error);
        console.error(error.stack);
        throw error;
    });


