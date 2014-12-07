'use strict';

// Load modules
var Bluebird = require('bluebird');
var CSV = require('csv');

Bluebird.promisifyAll(CSV);

// Declare internals

var internals = {};


// Exports


exports.monthly = function (fileData) {

    // http://wiki.sandaysoft.com/a/Monthly_log_files
    // Parses the monthly logs. Filename is MMMDDlog.txt (i.e. Apr14log.txt)
    // It consists of a month of logs, every 15 minutes: about 3000 lines (30 (days) * 24 (hours) * 4 (records/hour) => 2880
    // Field Descriptions:
    //      Field #	    Example	    Description
    //      00(A)	    22/04/11	Date as 2 figure day [separator] 2 figure month [separator] 2 figure year - the separator is that set in the windows system short date format (see setup)
    //      01(B)	    10:25	    Current time
    //      02(C)	    8.1	        Current temperature
    //      03(D)	    96	        Current relative humidity
    //      04(E)	    7.5	        Current dewpoint
    //      05(F)	    13.5	    Cumulus 'Average' wind speed (See #Cumulus_Wind_Speed_Terminology)
    //      06(G)	    20.3	    Cumulus 'Gust' wind speed
    //      07(H)	    138	        Average wind bearing (integer degrees)
    //      08(I)	    7.2	        Current rainfall rate
    //      09(J)	    5.4	        Total rainfall today so far (i.e. resets to zero at daily rollover)
    //      10(K)	    30.10	    Current sea level pressure
    //      11(L)	    215.2	    Total rainfall counter (content depends on weather station type, might be rainfall total so far this year)
    //      12(M)	    20.3	    Inside temperature
    //      13(N)	    53	        Inside humidity
    //      14(O)	    17.6	    Cumulus 'Latest' gust (See #Cumulus_Wind_Speed_Terminology)
    //      15(P)	    4.8	        wind chill (content depends on weather station type and Cumulus station settings)
    //      16(Q)	    8.1	        Heat index
    //      * 17(R)	    0.5	        UV Index (only valid if output by weather station)
    //      * 18(S)	    197	        Solar Radiation (only valid if solar sensor on weather station)
    //      * 19(T)	    0.08	    Evapotranspiration (only valid if output by weather station)
    //      * 20(U)	    171.88	    Annual Evapotranspiration (only valid if ET sensor on weather station)
    //      21(V)	    3.4	        Apparent temperature
    //      22(W)	    663	        Current theoretical max solar radiation (see the FAQ)
    //      * 23(X)	    3.1	        Hours of sunshine so far today (only valid if solar sensor on weather station)
    //      24(Y)	    158	        Current Wind bearing (See 7)
    //      25(Z)	    6.0	        RG-11 rain today (only valid if output by sensor)
    //      26(AA)	    5.7	        Total Rainfall since midnight (this is for 0900/1000 'rollover' users; normally same as rain today for 'midnight rollover' users)
    //
    // Example Line:
    // 24/04/14,02:43,39.4,99,39.1,0.0,1.6,135,0.05,0.06,1013.1,9.06,71.8,40,1.6,39.4,39.4,0,0,0.000,0.000,37.0,121,0.0,135,0.00,0.06

    var columns = [
        'date',
        'time',
        'temperature',
        'relative_humidity',
        'dewpoint',
        'avg_wind_speed',
        'gust_wind_speed',
        'avg_wind_bearing',
        'rainfall_rate',
        'total_rainfall_today',
        'sea_level_pressure',
        'total_rainfall_special',
        'inside_temperature',
        'inside_humidity',
        'latest_gust_wind_speed',
        'wind_chill',
        'heat_index',
        'uv_index',
        'solar_radiation',
        'evaapotranspiration',
        'apparent_temperature',
        'max_solar_radiation',
        'hours_of_sunshine',
        'current_wind_bearing',
        'rain_today',
        'total_rainfall_since_midnight',
    ];
    return CSV.parseAsync(fileData, {delimiter: ',', columns: columns})
        .then(function(result){
            console.log('Parsed Result Len', result.length);
            //console.log('PARSED: ', JSON.stringify(result, undefined, 4));
            console.log('PARSED: ', JSON.stringify(result[0], undefined, 4));
            return result;
        });

};
