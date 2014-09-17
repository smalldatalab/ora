/**
 * Created by Faisal on 8/21/2014.
 */

import Ember from "ember";

export default Ember.Route.extend({
    beforeModel: function () {
        this.transitionTo('people');
    }
});