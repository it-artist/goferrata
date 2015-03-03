import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['ferratas'],
  centerLat: Ember.computed.alias('controllers.ferratas.centerLat'),
  centerLng: Ember.computed.alias('controllers.ferratas.centerLng')
});
