import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment'

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
    modulePrefix: config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

// register helpers
import timeSinceHelper from './helpers/time-since';
Ember.Handlebars.registerBoundHelper('time-since', timeSinceHelper);
import monthDayFormat from './helpers/month-day-format';
Ember.Handlebars.registerBoundHelper('month-day', monthDayFormat);

export default App;
