import Ember from 'ember';

var Router = Ember.Router.extend({
  location: OraENV.locationType
});

Router.map(function() {
    this.resource("people", function() {
        this.route("add");
    });
    this.resource("person", { path: "/person/:person_id" });
});

export default Router;
