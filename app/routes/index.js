/**
 * Created by Faisal on 8/18/2014.
 */

import Ember from "ember";

var IndexRoute = Ember.Route.extend({
    model: function() {
        return ['Gert', 'Andy', 'Josh', 'Faisal', 'Fabian', 'Deborah', 'Lucky'];
    }
});

export default IndexRoute;