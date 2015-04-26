import config from '../config/environment';
import Ember from 'ember';

export default Ember.ArrayController.extend({
  zoom: 8,
  startHeight: [config.APP.heightRange.min, config.APP.heightRange.max],
  startDuration: [config.APP.durationRange.min, config.APP.durationRange.max],
  startHeightMax: config.APP.heightRange.max,
  startDurationMax: config.APP.durationRange.max,
  heightRange: config.APP.heightRange,
  durationRange: config.APP.durationRange,
  heightMin: null,
  heightMax: null,
  durationMin: null,
  durationMax: null,
  difficulties: config.APP.difficulties,
  currentDifficulties: Ember.A(),
  actions: {
    windowOpened: function(ferrata) {
      this.transitionToRoute('ferratas.show', ferrata);
    },
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
