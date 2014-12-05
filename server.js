'use strict';
// Load modules

var Path = require('path');
var Hapi = require('hapi');
var Config = require('./config');
//var Vault = require('./secretEnvVars');


// Declare internals

var internals = {};


Config.server.hipchatBotApi.uri = (Config.server.hipchatBotApi.tls ? 'https://' : 'http://') + Config.server.hipchatBotApi.host + ':' + Config.server.hipchatBotApi.port;

var manifest = {
    pack: {
        app: {
            config: Config,
            vault: Vault
        }
    },
    servers: [
        {
            host: Config.server.hipchatBotApi.host,
            port: Config.server.hipchatBotApi.port,
            options: {
                labels: 'api',
                cors: true
            }
        }
    ],
    plugins: {
        './hipchatBotApi': [{ select: 'api', route: {prefix: '/hipchatBot/api'} }]
    }
};

console.log('about to compose')
Hapi.Pack.compose(manifest, { relativeTo: Path.join(__dirname) }, function (err, pack) {

    console.log('hipchatBotApi: ', Config.server.hipchatBotApi.uri);

    pack.start();
});

