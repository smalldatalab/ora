/**
 * Created by Faisal on 10/14/2014.
 */

import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(key, provider) {
    var url = "http://lifestreams.smalldata.io/oauth/auth" +
        "?key=" + key +
        "&provider=" + provider.toLowerCase() +
        "&redirect=" + encodeURIComponent("http://ora.smalldata.io/connect");
    return new Ember.Handlebars.SafeString('<a class="connect btn btn-primary" href="' + url + '">Connect to ' + provider + ' <i class="fa fa-fw fa-angle-right"></i></a>');
});