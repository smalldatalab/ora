import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'ora', // TODO: loaded via config
  Resolver: Resolver
});

loadInitializers(App, 'ora');

// register helpers
import timeSinceHelper from './helpers/time-since';
Ember.Handlebars.registerBoundHelper('time-since', timeSinceHelper);
import monthDayFormat from './helpers/month-day-format';
Ember.Handlebars.registerBoundHelper('month-day', monthDayFormat);

export default App;
