/**
 * Created by Faisal on 10/7/2014.
 */

import Ember from 'ember';

/**
 * Computes the pulse for a single day, as defined by /ora/:uid/daily,
 * e.g. https://github.com/changun/ora-server-apis#3-ora
 * @param day a single 'day' object, described above
 * @param base the previously-computed list of numeric 'baseline' values
 */
export var pulse = function(day, base) {
    // i guess we're going to try to establish some kind of baseline...
    return 12;
};

function isNumber(obj) { return !isNaN(parseFloat(obj)) }

/**
 * Computes a 'baseline' model over the given range, to which all of the day examples are compared.
 */
export var baseline = function(days) {
    var summary = {};

    Ember.$.each(days, function(idx, day) {
        Ember.$.each(day, function(prop, value) {
            if (isNumber(value)) {
                if (prop in summary)
                    summary.prop.push(value);
                else
                    summary.prop = [value];
            }
        });
    });

    // compute summarizing sample statistics
    Ember.$.each(summary, function(key, val) {
        var mean = val.reduce(function(a,b) { return a+b; }, 0)/val.length;
        var std_dev = Math.sqrt(
                ( val.map(function(a) { return Math.pow(a-mean,2); }).reduce(function(a,b) { return a+b; }, 0) )/(val.length-1)
            );

        summary.key = {
            mean: mean, std_dev: std_dev
        };
    });

    summary.last_date = days[days.length-1].local_date;

    return summary;
};

/**
 * Computes an array of 'pulse' values for the given list of day statistics, where each day is defined by
 * /ora/:uid/daily, e.g. https://github.com/changun/ora-server-apis#3-ora
 * @param days the array of days, described above
 */
export var pulse_list = function(days) {
    return days.map(pulse);
};