/**
 * Created by Faisal on 8/20/2014.
 */

import Ember from "ember";
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import ajax from 'ic-ajax';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function() {
        var _this = this;

        return Ember.$.getJSON('http://lifestreams.smalldata.io/ora/users')
            .then(function(users) {

                // ok, we can now do a query for all the users' data and sew it into the
                return Ember.$.getJSON('http://lifestreams.smalldata.io/ora/daily/')
                  .then(function(daily_data) {

                    // insert daily data into each user's object
                    users.forEach(function(user) {
                      if (daily_data[user.uid])
                        user.daily = daily_data[user.uid].slice(-5);
                      else
                        user.daily = undefined;
                    });

                    return users;
                  });

                /*
                // OLD METHOD: for each user, run a separate query for all their daily activity
                // for each user, query for their pulse
                return Ember.RSVP.all(users.map(function(user) {
                    return ajax("http://lifestreams.smalldata.io/ora/daily/" + user.uid, {
                        dataType: 'json'
                    }).then(function(daily) {
                        // make this returned data a subset of the user model
                        user.daily = daily.slice(-5);
                        return user;
                    });
                }));
                */

            }, function() {
                // request failed, redirect to login
                console.error("Call to /ora/users failed, presuming credentials have expired");
                _this.transitionTo('login');
            });
    },
    actions: {
        openModal: function(modalName) {
            var result = this.render(modalName, {
                into: 'application',
                outlet: 'modal'
            });

            // animate the drawer into appearing
            Ember.$("#modal-drawer").show().animate({left: 0}, 300);

            return result;
        },
        closeModal: function() {
            var result = null;
            var me = this;

            // animate the drawer into appearing
            var $dialog = Ember.$('#modal-drawer');
            var oldWidth = $dialog.width();
            $dialog.animate({left: (-oldWidth) }, 300, function() {
                Ember.$(this).hide();

                result = me.disconnectOutlet({
                    outlet: 'modal',
                    parentView: 'application'
                });
            });

            return result;
        }
    }
});
