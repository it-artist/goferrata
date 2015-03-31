import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['application'],
  heightMin: Ember.computed.alias('controllers.application.heightMin'),
  heightMax: Ember.computed.alias('controllers.application.heightMax'),
  durationMin: Ember.computed.alias('controllers.application.durationMin'),
  durationMax: Ember.computed.alias('controllers.application.durationMax'),
  currentDifficulties: Ember.computed.alias('controllers.application.currentDifficulties'),
  zoom: 8,
  centerLat: 46.87946,
  centerLng: 13.317000000000007,
  actions: {
    windowOpened: function(slug) {
      this.transitionToRoute('ferratas.show', slug);
    }
  }
});
