/**
 * Created by Faisal on 10/8/2014.
 */

import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    primaryKey: "local_date"
});