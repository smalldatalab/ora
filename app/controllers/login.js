/**
 * Created by Faisal on 9/23/2014.
 */

import Ember from "ember";
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
    authenticator: 'authenticator:custom'
});