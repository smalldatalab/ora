/**
 * Created by Faisal on 8/20/2014.
 */

import Ember from "ember";
/* global $ */

export default Ember.Route.extend({
    model: function() {
        return this.store.find('person');
    },
    actions: {
        openModal: function(modalName) {
            var result = this.render(modalName, {
                into: 'application',
                outlet: 'modal'
            });

            // animate the drawer into appearing
            $("#modal-drawer").show().animate({left: 0}, 300);

            return result;
        },
        closeModal: function() {
            var result = null;
            var me = this;

            // animate the drawer into appearing
            var $dialog = $('#modal-drawer');
            var oldWidth = $dialog.width();
            $dialog.animate({left: (-oldWidth) }, 300, function() {
                $(this).hide();

                result = me.disconnectOutlet({
                    outlet: 'modal',
                    parentView: 'application'
                });
            });

            return result;
        }
    }
});