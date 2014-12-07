'use strict';

// Load modules

//var Fs = require('fs');
//var Path = require('path');

var Parser = require('nomnom');

var Current = require('./current');
var History = require('./history');
var Utils = require('./utils');


// Declare internals

var internals = {};

// Exports

exports.run = function () {
    var command = internals.parseArgs();
    command.makeItSo();
};


internals.parseArgs= function () {

    Parser.script('lcw');
        //.option('units', {
        //    abbr: 'u',
        //    default: 'metric',
        //    help: 'units to use'
        //});


    Parser.command('history')
        .callback(function(opts) {
            opts.command = 'history';
        })
        .option('date', {
            position: 1,
            required: false,
            help: 'date to get'
        })
        .option('year', {
            abbr: 'y',
            help: 'year to lookup'
        })
        .option('month', {
            abbr: 'm',
            help: 'month to lookup'
        })
        .option('day', {
            abbr: 'd',
            help: 'day to lookup'
        })
        .option('hour', {
            abbr: 'h',
            help: 'hour to lookup'
        });

    Parser.command('now')
        .callback(function(opts) {
            opts.command = 'now';
        })
        .option('location', {
            position: 1,
            required: false,
            help: 'location of weather [ state/city | zip | country/city | airport | lat,long | pws:id | Keywords: IP,LC] '
        });

    Parser.command('aggregates')
        .callback(function(opts) {
            opts.command = 'aggregates';
        })
        .option('limits', {
            abbr: 'l',
            flag: true,
            help: 'return the all time weather extremes'
        });


    var opts = Parser.parse();

    console.log('NOMNOM PArsed Options: \n', JSON.stringify(opts, undefined, 4));

    if (opts.command == 'history') {
        return new internals.HistoryCommand(opts);
    }

    if (opts.command  == 'aggregates') {
        return new internals.AggregatesCommand(opts);
    }

    if (opts.command  == 'now') {
        return new internals.NowCommand(opts);
    }

    return new internals.NowCommand(opts);
};

internals.HistoryCommand = function(opts){

    console.log('HistoryCommand: \n', JSON.stringify(opts, undefined, 4));
    this.name = 'History';

    // get arg info:
    // 1. allow lcw history DATE (1/1/2014)
    this.makeItSo = function(){
        console.log('All Time Weather at Lost Creek:');
        return History.getLimits()
            .then(function(l){
                console.log('SHOW:', l)
                //console.log('High: %s (%s)', limits.temp.high.f, limits.temp.high.date);
            });
    };
};

internals.AggregatesCommand = function(opts){
    this.name = 'Aggregates';
    this.makeItSo = function(){
        console.log('Weather Aggregates at Lost Creek:');
    };
};

internals.NowCommand = function(opts){
    this.name = 'Now';
    var lcPwsId = 'KWATONAS4';


    var getLocation = function(loc){
        if(!loc){
            return;
        }

        var lowLoc = loc.toLowerCase();
        switch (lowLoc){
            case 'lc':
                return { pws: lcPwsId };
            case 'ip':
                return { ip: true };
        }
        var commaSplit = lowLoc.split(',');

        if(commaSplit.length == 2){
            return { geo: { lat: commaSplit[0], long: commaSplit[1] } }
        }

        if(commaSplit.length > 1){
            console.log('comma can only be used in lat,long:', loc);
            throw new Error('comma can only be used in lat,long');
        }

        var colonSplit = lowLoc.split(':');

        if(colonSplit.length == 2 && colonSplit[0] == 'pws'){
            return { pws: colonSplit[1]};
        }

        if(colonSplit.length > 1){
            console.log('only pws:STATIONID is valid:', loc);
            throw new Error('only pws:STATIONID is valid');
        }

        return { lookup: loc };
    };

    var location = getLocation(opts.location);
    console.log('location:',location);

    this.makeItSo = function(){
        if(!location){
            return Current.pws(lcPwsId).then(Current.showString).then(console.log);
        }
        if(location.pws){
            return Current.pws(location.pws).then(Current.showString).then(console.log);
        }
        if(location.lookup){
            return Current.lookup(location.lookup).then(Current.showString).then(console.log);
        }
        if(location.geo){
            return Current.geo(location.geo).then(Current.showString).then(console.log);
        }
        if(location.ip){
            return Current.ip().then(Current.showString).then(console.log);
        }
    };
};


