import Ember from "ember";

export default Ember.Route.extend({
    model: function() {
        return ['Gert', 'Andy', 'Josh', 'Faisal', 'Fabian', 'Deborah', 'Lucky'];
    }
});