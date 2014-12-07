'use strict';

// Load modules


// Declare internals

var internals = {};


// Exports

//exports.report = Runner.report;
//exports.execute = Runner.execute;
//exports.coverage = Coverage;
//exports.leaks = Leaks;
//exports.assertions = null;                                              // Set by the -a command line option


exports.getLimits = function () {
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
};
