'use strict';

var Bluebird = require('bluebird');
var Path = require('path');
var Fs = require('fs');
var hipchat = require('node-hipchat');
var Hipchatter = require('hipchatter');

var getEnvVar = function(envVar){
    //console.log('getEnvVar: ', envVar);
    if(!process.env[envVar]){
        throw new Error('Missing Environment Variable: ' + envVar);
    }
    return process.env[envVar];
};

var getEnvVars = function(){
    return {
        apiKey: getEnvVar('HIPCHAT_API_KEY'),
        personalToken: getEnvVar('HIPCHAT_PERSONAL_TOKEN'),
        rooms: getEnvVar('HIPCHAT_ROOMS')
    };
};
var envVars;

try {
    envVars = getEnvVars();
}
catch(err){
    var secretEnvVars = Path.resolve(__dirname, '..', 'secretEnvVars.js');
    //console.log('Checking for secretEnvVars:', secretEnvVars)

    if(Fs.existsSync(secretEnvVars)){
        //console.log('Exists! requiring them...');
        require(secretEnvVars);
    }
    envVars = getEnvVars();
}

var HC = new hipchat(envVars.apiKey);
var hipchatter = new Hipchatter(envVars.personalToken);

Bluebird.promisifyAll(HC);
Bluebird.promisifyAll(hipchatter);

module.exports = {
    HC: HC,
    hipchatter: hipchatter,
    ENV: envVars
};