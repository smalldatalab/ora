/**
 * Created by Faisal on 8/20/2014.
 */

import Ember from "ember";
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
/* global $ */

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function() {
        // we're going to fire off a request to the ora server in a sec
        // return [];

        var key = this.get('session').get('key');
        var _this = this;

        return Ember.$.getJSON('http://lifestreams.smalldata.io/ora/users', {key: key})
            .then(function(users) {
                // for each user, query for their pulse
                return Ember.RSVP.all(users.map(function(user) {
                    return Ember.$.getJSON("http://lifestreams.smalldata.io/ora/daily/" + user.uid, { key: key}).then(function(daily) {
                        // make this returned data a subset of the user model
                        user.daily = daily.slice(-5);
                        return user;
                    });
                }));
            }, function() {
                // request failed, redirect to login
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
            $("#modal-drawer").show().animate({left: 0}, 300);

            return result;
        },
        closeModal: function() {
            var result = null;
            var me = this;

            // animate the drawer into appearing
            var $dialog = $('#modal-drawer');
            var oldWidth = $dialog.width();
            $dialog.animate({left: (-oldWidth) }, 300, function() {
                $(this).hide();

                result = me.disconnectOutlet({
                    outlet: 'modal',
                    parentView: 'application'
                });
            });

            return result;
        }
    }
});