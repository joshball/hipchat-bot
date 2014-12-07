'use strict';

// Load modules
var Util = require('util');
var Fs = require('fs');
var Path = require('path');

var Bluebird = require('bluebird');

var logParsing = require('./logParsing');

// Declare internals

var internals = {};


// Exports

//exports.report = Runner.report;
//exports.execute = Runner.execute;
//exports.coverage = Coverage;
//exports.leaks = Leaks;
//exports.assertions = null;                                              // Set by the -a command line option

var getDataFile = function(type, options){
    var wxDir = Path.join(__dirname, '..', 'weather_history', 'latest');
    if(type === 'monthLog'){
        var month = options || 'Aug';
        return Path.join(wxDir, Util.format('%s14log.txt', month));
    }
};

Bluebird.promisifyAll(Fs);

var readDataFileAsync = function(type, options){

    var file = getDataFile(type, options);
    console.log('Reading File: ', Path.resolve(file));
    return Fs.readFileAsync(file, 'utf8')
        .then(function(results){
            console.log('FILE:', results.length);
            return logParsing.monthly(results);
        })
        .then(function(r){
            return {
                temp: {
                    high: {
                        f: 110,
                        c: 112,
                        date: new Date()
                    },
                    low: {
                        f: -20,
                        c: 112,
                        date: new Date()
                    }
                }
            };

        })
};

var getData = function(type, options){
    return readDataFileAsync('monthLog');
    //return new Promise(function (resolve, reject) {
    //    resolve()
    //});
    //
    //if(type === 'monthLog'){
    //
    //}
};

exports.getLimits = function () {
    return getData();
};
