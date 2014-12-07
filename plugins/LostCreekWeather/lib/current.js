'use strict';

// Load modules

var Util = require('util');
var Bluebird = require('bluebird');
var Moment = require('moment-timezone');
//var Fs = require('fs');
//var Path = require('path');

var rp = require('request-promise');

var WxApi = require('./wxUndergrounApi');

// Declare internals

var internals = {};


// Exports


exports.lookup = function(lookupString){
    return WxApi.current.lookup(lookupString);
};
exports.pws = function(pwsId){
    return WxApi.current.pws(pwsId);
    //return Bluebird.resolve(internals.exampleCurrentWeatherResponseData);
};
exports.geo = function(latLong){
    return WxApi.current.geo(latLong);
};
exports.ip = function(){
    return WxApi.current.ip();
};


exports.showString = function(r){
    console.log('showString :', r);
    var co = r.current_observation;
    var ol = co.observation_location;

    var msg = [];
    msg.push(Util.format('Current Weather for: %s [%s]', ol.full, co.station_id));
    msg.push(Util.format('    Elev: %s, Geo: %s, %s', ol.elevation, ol.latitude, ol.longitude));

    var ot = Moment(co.observation_time_rfc822, 'ddd, DD MMM YYYY HH:mm:ss ZZ');
    // TODO (validate the timezone)
    msg.push(Util.format('    Reported: %s (%s)', ot.fromNow(), ot.tz(co.local_tz_long).format("dddd, MMMM Do YYYY, h:mm:ss a z")));
    msg.push(Util.format('    Weather: %s, %s [DewPoint: %s]', co.weather, co.temperature_string, co.dewpoint_string));
    msg.push(Util.format('             Wind: %s [Feels Like: %s]', co.wind_string, co.feelslike_string));
    msg.push(Util.format('             Precip: %s [%s]', co.precip_today_string, co.precip_1hr_string));
    return msg.join('\n');
};

// Internals
internals.exampleCurrentWeatherResponseData = {
    response: {
        version: "0.1",
        termsofService: "http://www.wunderground.com/weather/api/d/terms.html",
        features: {
            conditions: 1
        }
    },
    current_observation: {
        image: {
            url: "http://icons.wxug.com/graphics/wu2/logo_130x80.png",
            title: "Weather Underground",
            link: "http://www.wunderground.com"
        },
        display_location: {
            full: "Hart Ranch, WA",
            city: "Hart Ranch",
            state: "WA",
            state_name: "Washington",
            country: "US",
            country_iso3166: "US",
            zip: "98859",
            magic: "3",
            wmo: "99999",
            latitude: "48.520683",
            longitude: "-118.919426",
            elevation: "794.00000000"
        },
        observation_location: {
            full: "Ranch at Lost Creek, Tonasket, Washington",
            city: "Ranch at Lost Creek, Tonasket",
            state: "Washington",
            country: "",
            country_iso3166: "US",
            latitude: "48.520683",
            longitude: "-118.919426",
            elevation: "2313 ft"
        },
        estimated: { },
        station_id: "KWATONAS4",
        observation_time: "Last Updated on December 7, 12:45 AM PST",
        observation_time_rfc822: "Sun, 07 Dec 2014 12:45:11 -0800",
        observation_epoch: "1417981511",
        local_time_rfc822: "Sun, 07 Dec 2014 12:47:12 -0800",
        local_epoch: "1417981632",
        local_tz_short: "PST",
        local_tz_long: "America/Los_Angeles",
        local_tz_offset: "-0800",
        weather: "Overcast",
        temperature_string: "33.8 F (1.0 C)",
        temp_f: 33.8,
        temp_c: 1,
        relative_humidity: "84%",
        wind_string: "From the SSW at 1.6 MPH Gusting to 2.2 MPH",
        wind_dir: "SSW",
        wind_degrees: 197,
        wind_mph: 1.6,
        wind_gust_mph: "2.2",
        wind_kph: 2.6,
        wind_gust_kph: "3.5",
        pressure_mb: "1030",
        pressure_in: "30.41",
        pressure_trend: "+",
        dewpoint_string: "29.5 F (-1.4 C)",
        dewpoint_f: 29.5,
        dewpoint_c: -1.4,
        heat_index_string: "NA",
        heat_index_f: "NA",
        heat_index_c: "NA",
        windchill_string: "NA",
        windchill_f: "NA",
        windchill_c: "NA",
        feelslike_string: "33.8 F (1.0 C)",
        feelslike_f: "33.8",
        feelslike_c: "1.0",
        visibility_mi: "10.0",
        visibility_km: "16.1",
        solarradiation: "--",
        UV: "0",
        precip_1hr_string: "0.00 in (0.0 mm)",
        precip_1hr_in: "0.00",
        precip_1hr_metric: "0.0",
        precip_today_string: "0.00 in (0 mm)",
        precip_today_in: "0.00",
        precip_today_metric: "0",
        icon: "cloudy",
        icon_url: "http://icons.wxug.com/i/c/k/cloudy.gif",
        forecast_url: "http://www.wunderground.com/US/WA/Hart_Ranch.html",
        history_url: "http://www.wunderground.com/weatherstation/WXDailyHistory.asp?ID=KWATONAS4",
        ob_url: "http://www.wunderground.com/cgi-bin/findweather/getForecast?query=48.520683,-118.919426",
        nowcast: ""
    }
};
