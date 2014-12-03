import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route("login");
    this.route("logout");
    this.route("authed");
    this.route("connect");

    this.resource("users", function() {
        this.route("add");
    });
    this.resource("user", { path: "/users/:user_id" }, function() {
        this.resource("user.date", { path: "/date/:date_id" });
        this.resource("user.details", { path: "/date/:date_id/details" });
    });
});

export default Router;
