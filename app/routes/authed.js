/**
 * Created by Faisal on 10/3/2014.
 */

import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel: function(transition) {
        var _this = this;

        this.get('session').authenticate('authenticator:custom', transition.queryParams).then(function() {
            _this.transitionTo('connect');
        });
    }
})