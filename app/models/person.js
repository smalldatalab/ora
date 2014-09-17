/**
 * Created by Faisal on 8/20/2014.
 */

import DS from 'ember-data';

var attr = DS.attr,
    hasMany = DS.hasMany;

var Person = DS.Model.extend({
    name: attr('string'),
    lastUpdated: attr('date')
});

Person.reopenClass({
    FIXTURES: [
        { id: 1, name: 'Gert',      lastUpdated: new Date() },
        { id: 2, name: 'Andy',      lastUpdated: new Date() },
        { id: 3, name: 'Josh',      lastUpdated: new Date() },
        { id: 4, name: 'Faisal',    lastUpdated: new Date() },
        { id: 5, name: 'Fabian',    lastUpdated: new Date() },
        { id: 6, name: 'Deborah',   lastUpdated: new Date() },
        { id: 7, name: 'Lucky',     lastUpdated: new Date() }
    ]
});

export default Person;