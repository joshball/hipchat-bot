'use strict';

// Load modules

var Util = require('util');
var rp = require('request-promise');


// Declare internals

var internals = {};


// Exports

exports.current = {};

exports.current.pws = function(pwsId){
    var url = internals.makeUrl('conditions', {pwsId: pwsId});
    console.log('\nwxApi.current.pws: ', pwsId, url);
    return internals.get(url);
};

exports.current.ip = function(){
    var url = internals.makeUrl('conditions', {ip: true});
    console.log('\nwxApi.current.ip: ', url);
    return internals.get(url);
};

exports.current.lookup = function(lookupString){
    var url = internals.makeUrl('conditions', {lookup: lookupString});
    console.log('\nwxApi.current.lookup: ', url);
    return internals.get(url);
};

exports.current.geo = function(geo){
    var url = internals.makeUrl('conditions', {lat: geo.lat, long: geo.long});
    console.log('\nwxApi.current.geo: ', url);
    return internals.get(url);
};


// Internals

internals.makeBaseUrl = function(query){
    var key = '02ea5a34ed7ad22f';
    return Util.format('http://api.wunderground.com/api/%s/%s', key, query);
};
internals.get = function(url){
    return rp(url).then(JSON.parse);
};

internals.makeUrl = function(feature, options){

    var featureData;
    console.log('\n WX_API.makeUrl: ', feature, options);

    if(feature == 'conditions'){
        if(options.pwsId){
            featureData = Util.format('q/pws:%s.json', options.pwsId);
        }
        else if(options.lookup){
            featureData = Util.format('q/%s.json', options.lookup);
        }
        else if(options.ip){
            featureData = Util.format('q/autoip.json');
        }
        else if(options.lat && options.long){
            featureData = Util.format('q/%s,%s.json', options.lat, options.long);
        }
        else {
            throw new Error('Unknown feature CONDITIONS option', options);
        }
    }
    else {
        throw new Error('Unknown feature');
    }

    var query = Util.format('%s/%s', feature, featureData);
    return internals.makeBaseUrl(query);
};


exports.conditionsPws = function(pwsId){
    var url = internals.makeUrl('conditions', {pwsId: pwsId});
    console.log('Calling conditions PWS: ', url);
    // TODO: Cache the calls for 15 minutes!
    // TODO: Handle errors
    return rp(url)
        .then(function(result){
            console.log('result:', result);
            return result;
        })
        .catch(console.error);
};