/**
 * Created by Faisal on 8/20/2014.
 */

import Ember from 'ember';
/* global d3 */

export default Ember.ObjectController.extend({
    selectedDate: new Date(),
    selectedDateString: function() {
      var isoFormatter = d3.time.format("%Y-%m-%d");
      return isoFormatter(this.get('selectedDate'));
    }.property('selectedDate'),
    user: function() {
        return this.modelFor('user');
    }.property(),
    isOwnPage: function() {
        var user = this.get('user');
        return this.get('session').get('uid') == this.get('user').uid;
    }.property('session', 'user')
    /*
    actions: {
        changeDate: function(newDate) {
            this.set('selectedDate', newDate);
        }
    }
    */
});
