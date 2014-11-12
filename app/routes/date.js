/**
 * Created by Faisal on 10/21/2014.
 */

import Ember from "ember";

export default Ember.Route.extend({
    beforeModel: function() { console.log("Hello; in beforeModel in date router!"); },
    model: function(params) {
        console.log("Resolving date w/params:",params);

        var user = this.modelFor('user');

        // resolve the user model
        return Ember.$.getJSON('http://lifestreams.smalldata.io/ora/daily/' + user.uid);
    },
    setupController: function(controller, model) {
        console.log("Setting up controller in date");

        // Call _super for default behavior
        this._super(controller, model);

        controller.set('selectedDate', new Date());
        controller.set('user', this.modelFor('user'));
    }
});