import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    didTransition: function() {
      this.controllerFor('ferratas').set('activeMarker', null);
      return true;
    }
  }
});
