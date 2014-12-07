'use strict';

// Load modules

var Current = require('./current');
//var History = require('./history');

// Declare internals

var internals = {};


// Exports

exports.current = {
    showString: Current.showString,
    lookup: Current.lookup,
    pws: Current.pws,
    geo: Current.geo,
    ip: Current.ip
};



