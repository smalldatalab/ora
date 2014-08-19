import Ember from 'ember';

var Router = Ember.Router.extend({
  location: OraENV.locationType
});

Router.map(function() {
    this.resource("people");
    this.resource("person", { path: "/person/:person_id" });
});

export default Router;
