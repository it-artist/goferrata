import Ember from 'ember';

export default Ember.Controller.extend({

  currentUser: Ember.computed.alias('session.currentUser'),

  centerLat: 46.87946,
  centerLng: 13.317000000000007,
  actions: {
    centerMap: function(lat, lon) {
      this.setProperties({
        centerLat: lat,
        centerLng: lon
      });
    }
  }
});
