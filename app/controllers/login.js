/**
 * Created by Faisal on 9/23/2014.
 */

// app/controllers/login.js
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
    authenticator: 'authenticator:custom'
});