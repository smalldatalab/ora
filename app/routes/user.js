/**
 * Created by Faisal on 10/18/2014.
 */

import Ember from "ember";

export default Ember.Route.extend({
    model: function(params) {
        console.log("Resolving user w/params:",params);

        // resolve the user model
        return Ember.$.getJSON('http://lifestreams.smalldata.io/ora/users/' + params.user_id);
    }
});