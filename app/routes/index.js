/**
 * Created by Faisal on 8/21/2014.
 */

import Ember from "ember";

export default Ember.Route.extend({
    beforeModel: function () {
        // console.log("Hit index, transitioning...");
        this.transitionTo('users');
    }
});