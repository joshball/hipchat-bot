'use strict';

var util = require('util');


var getJoiValidationDescriptionArray = function(validationObject){
    var validationDescArray = [];
    if(validationObject.isJoi){
        var description = validationObject.describe();
        var kids = Object.keys(description.children);
        kids.forEach(function(kid){
            var val = description.children[kid];
            var s = util.format(' - %s [%s]', kid, val.type);
            if(val.description){
                s +=  util.format(': ', val.description);
            }
            validationDescArray.push(s);
        })
    }
    else {
        validationDescArray.push('Not a JOI validation object');
    }
    return validationDescArray;
};

var getHapiValidationInfo = function(route){
    var validationInfoArray = [];
    if (route.settings.validate) {
        if (route.settings.validate.payload) {
            validationInfoArray.push('Payload:');
            validationInfoArray = validationInfoArray.concat(getJoiValidationDescriptionArray(route.settings.validate.payload));
        }
        if (route.settings.validate.params) {
            validationInfoArray.push('Params:');
            validationInfoArray = validationInfoArray.concat(getJoiValidationDescriptionArray(route.settings.validate.params));
        }
        if (route.settings.validate.query) {
            //cl.dump('RoutingTable', route);
            validationInfoArray.push('Query Parameters:');
            validationInfoArray = validationInfoArray.concat(getJoiValidationDescriptionArray(route.settings.validate.query));
        }
    }
    return validationInfoArray;
};


var dumpHapiRoute = function(route){
    delete route.server
    //delete route.settings.validate
    //cl.logRaw('trace', '---------------------------------------------------------------------------------------------------');
    //cl.dump('RoutingTable', route);
    //cl.logRaw('trace', '---------------------------------------------------------------------------------------------------');

    console.log('\n   - %s %s', route.method.toUpperCase(), route.path);
    console.log('      | plugin: %s', route._env.plugin);
    if (route._env.route && route._env.route.prefix) {
        console.log('      | prefix: %s', route._env.route.prefix);
    }

    var hvi = getHapiValidationInfo(route);
    hvi.forEach(function(validationLine){
        console.log('      | %s', validationLine);
    });


    if (route.settings.tags || route.settings.app.name) {
        console.log('      | tags: %s (app: %s)', route.settings.tags, route.settings.app.name);
    }

    if (route.settings.notes) {
        route.settings.notes.forEach(function (note) {
            console.log ('      | notes: ', note);
        });
    }
};

var dumpHapiRoutes = function(hapiServer){
    var routingTable = hapiServer.table();
    console.log('---------------------------------------------------------------------------------------------------');
    console.log('------------------------------------------ Server Routes ------------------------------------------');
    console.log('---------------------------------------------------------------------------------------------------');
    routingTable.map(dumpHapiRoute);
    console.log('---------------------------------------------------------------------------------------------------');
};


module.exports = {
    dumpHapiRoutes: dumpHapiRoutes
};