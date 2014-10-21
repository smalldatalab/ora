/**
 * Created by Faisal on 10/3/2014.
 */

import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

var CustomAuthenticator = Base.extend({
    authenticate: function(options) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if ("key" in options)
                resolve(options);
            else {
                if ("error" in options)
                    reject(options.error);
                else
                    reject("No token specified in the options");
            }
        });
    },
    restore: function(data) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (data.key)
                resolve(data);
            else
                reject("No token specified in the data payload");
        });
    },
    invalidate: function(data) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            resolve(data);
        });
    }
});

export default {
    name: 'authentication',
    before: 'simple-auth',
    initialize: function(container, application) {
        window.ENV = EmberENV;
        container.register('authenticator:custom', CustomAuthenticator);
    }
};