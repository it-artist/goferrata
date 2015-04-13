import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  needs: ['ferratas'],
  heightMin: null,
  heightMax: null,
  durationMin: null,
  durationMax: null,
  difficulties: config.APP.difficulties,
  currentDifficulties: Ember.A(),
  centerLat: Ember.computed.alias('controllers.ferratas.centerLat'),
  centerLng: Ember.computed.alias('controllers.ferratas.centerLng'),
  actions: {
    centerMap: function(lat, lon) {
      this.setProperties({
        centerLat: lat,
        centerLng: lon
      });
    },
    triggerDifficulty: function(targetDifficulty) {
      var difficulty = this.get('currentDifficulties');

      if(difficulty.contains(targetDifficulty)) {
        difficulty.removeObject(targetDifficulty);
      } else {
        difficulty.pushObject(targetDifficulty);
      }
    }
  }
});
