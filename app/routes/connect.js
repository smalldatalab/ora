/**
 * Created by Faisal on 10/7/2014.
 */

import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel: function(transition) {
        var _this = this;

        // determine if each provider is reachable
        var promises = ["gmail","moves"].map(function(provider) {
            return Ember.$.getJSON("http://lifestreams.smalldata.io/oauth/check-auth", { provider: provider })
                .then(function(response) {
                    if (response.result) {
                        Ember.$("#connect-" + provider + " .status").text("connected");
                        Ember.$("#connect-" + provider + " .connect").hide();
                        _this.get('session').set(provider + '-authed', true);
                        return true;
                    }
                    else {
                        Ember.$("#connect-" + provider + " .status").text("disconnected");
                        Ember.$("#connect-" + provider + " .connect").show();
                        _this.get('session').set(provider + '-authed', false);
                        return false;
                    }
                });
            /*
             .catch(function(reason) {
             Ember.$("#connect-" + provider + " .status").text("error: " + reason);
             });
             */
        });

        // if they all are, let us proceed
        Ember.RSVP.all(promises)
            .then(function(results) {
                if (results.every(Boolean)) {
                    Ember.$("#connect-proceed").fadeIn(600);
                    _this.get('session').set('all-providers-authed', true);
                }
                else {
                    Ember.$("#connect-proceed").fadeOut(300);
                    _this.get('session').set('all-providers-authed', true);
                }
            });
    }
});