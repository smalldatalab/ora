/**
 * Created by Faisal on 10/18/2014.
 */

import Ember from "ember";
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function(params) {
        console.log("Returning resolved user model from child route");

        return this.modelFor('user');
    },
    afterModel: function(model) {
        var format = d3.time.format("%Y-%m-%d");
        var targetDate = d3.time.day.offset(new Date(), 0); // changed it to current day since we're getting intraday
        console.log("transitioning w/params:", model.uid, format(targetDate));
        this.transitionTo('user.date', model.uid, format(targetDate));
    }
});
