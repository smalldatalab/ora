/**
 * Created by Faisal on 10/3/2014.
 */

import Ember from 'ember';
import OraAuthenticator from '../auth/ora-authenticator';
import OraAuthorizer from '../auth/ora-authorizer';

export default {
    name: 'authentication',
    before: 'simple-auth',
    initialize: function(container, application) {
        window.ENV = EmberENV;
        container.register('authenticator:custom', OraAuthenticator);
        container.register('authorizer:custom', OraAuthorizer);
    }
};