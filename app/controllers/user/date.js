/**
 * Created by Faisal on 8/20/2014.
 */

import Ember from 'ember';

export default Ember.ObjectController.extend({
    selectedDate: new Date(),
    user: function() {
        return this.modelFor('user');
    }.property()
});