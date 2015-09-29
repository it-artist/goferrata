import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  centerLat: Ember.computed.alias('controllers.application.centerLat'),
  centerLng: Ember.computed.alias('controllers.application.centerLng'),
  zoom: Ember.computed.alias('controllers.application.zoom')
});
