/**
 * Created by Faisal on 10/18/2014.
 */

import Ember from "ember";

export default Ember.Route.extend({
    model: function(params) {
        console.log("Returning resolved user model from child route");

        return this.modelFor('user');
    },
    afterModel: function(model) {
        var format = d3.time.format("%Y-%m-%d");
        console.log("transitioning w/params:", model.uid, format(new Date()));
        this.transitionTo('date', model.uid, format(new Date()));
    }
});