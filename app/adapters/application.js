/**
 * Created by Faisal on 8/20/2014.
 */

import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    namespace: 'ora',
    host: 'http://lifestreams.smalldata.io'
});