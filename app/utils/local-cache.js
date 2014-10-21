/**
 * Created by Faisal on 10/20/2014.
 */

import Ember from 'ember';

export var storePulses = function(user_id, data) {
    var today = (new Date().setHours(0, 0, 0, 0));
    localStorage.setItem('pulses_' + user_id, JSON.stringify({
        storedOn: today,
        dates: data
    }));
};

export var isPulsesSet = function(user_id) {
    return localStorage.getItem('pulses_' + user_id) != null;
};

export var getPulses = function(user_id, key) {
    var today = (new Date().setHours(0, 0, 0, 0));

    // retrieve from the server if we don't have it at all, or if the date is less than today's date
    var pulse_data = JSON.parse(localStorage.getItem('pulses_' + user_id));
    if (pulse_data == null || pulse_data.storedOn < today) {
        return Ember.$.getJSON('http://lifestreams.smalldata.io/ora/daily/' + user_id, { key: key }).then(function(data) {
            // save it back to the store
            storePulses(user_id, data);
            return data;
        });
    }

    // otherwise, we return a promise that immediately resolves
    return Ember.RSVP.Promise.resolve(pulse_data.dates);
};
