import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  startHeight: [0, 8000],
  startDuration: [0, 1000],
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
    changedHeight: function(values) {
      this.setProperties({
        heightMin: values[0],
        heightMax: values[1]
      });
    },
    changedDuration: function(values) {
      this.setProperties({
        durationMin: values[0],
        durationMax: values[1]
      });
    },
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
