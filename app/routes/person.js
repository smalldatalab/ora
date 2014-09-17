import Ember from "ember";

export default Ember.Route.extend({
    model: function(params) {
        return this.store.find('person', params.person_id);
    },
    setupController: function(controller, person) {
        controller.set('model', person);
    }
});