/**
 * Created by Faisal on 10/15/2014.
 */

import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel: function() {
        console.log("Logging out...");
        this.get('session').invalidate().then(function() {
            console.log("Logged out!");
            this.transitionTo('users');
        });
    }
})