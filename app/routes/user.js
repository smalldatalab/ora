/**
 * Created by Faisal on 10/18/2014.
 */

import Ember from "ember";

export default Ember.Route.extend({
    model: function(params) {
        console.log("Resolving user w/params:",params);

        var key = this.get('session').get('key');

        // resolve the user model
        return Ember.$.getJSON('http://lifestreams.smalldata.io/ora/users/' + params.user_id, { key: this.get('session').get('key') });
    }
});