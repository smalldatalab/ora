/**
 * Created by Faisal on 12/1/2014.
 */

import Ember from "ember";
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    selectedDate: new Date(),
    model: function(params) {
        console.log("Resolving date w/params:",params);

        var user = this.modelFor('user');

        var format = d3.time.format("%Y-%m-%d");
        this.selectedDate = format.parse(params.date_id);

        // resolve the user model
        return Ember.$.getJSON('http://lifestreams.smalldata.io/ora/details/' + user.uid + "/" + params.date_id);
    },
    setupController: function(controller, model) {
        console.log("Setting up date ", this.selectedDate, " in controller");

        // Call _super for default behavior
        this._super(controller, model);

        controller.set('selectedDate', this.selectedDate);
        controller.set('user', this.modelFor('user'));
    }
});