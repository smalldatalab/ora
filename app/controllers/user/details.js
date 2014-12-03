/**
 * Created by Faisal on 8/20/2014.
 */

import Ember from 'ember';

export default Ember.ObjectController.extend({
    selectedDate: new Date(),
    selectedDateString: function() {
      var isoFormatter = d3.time.format("%Y-%m-%d");
      return isoFormatter(this.get('selectedDate'));
    }.property('selectedDate'),
    modelFields: function() {
      var model = this.get('model');
      return Object.keys(model).sort().map(function(key) {
        return {key: key, val: model[key]}
      })
    }.property('model'),
    user: function() {
        return this.modelFor('user');
    }.property()
    /*
    actions: {
        changeDate: function(newDate) {
            this.set('selectedDate', newDate);
        }
    }
    */
});
