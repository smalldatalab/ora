/**
 * Created by faisal on 12/3/14.
 */

import Ember from 'ember';

export default {
  request: function(url, params) {
    return Ember.$.getJSON(url, params).catch(function(data) {
      // invalidate session if server says our key is invalid
    });
  }
};
