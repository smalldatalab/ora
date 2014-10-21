/**
 * Created by Faisal on 10/8/2014.
 */

import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    typeForRoot: function(data) { return this._super({"user": data}); },
    normalizePayload: function(payload) {
        // strip out the first name and save that into the payload
    },
    primaryKey: "uid"
});