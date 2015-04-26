import config from '../config/environment';
import Ember from 'ember';

export default Ember.ArrayController.extend({
  zoom: 8,
  centerLat: 46.87946,
  centerLng: 13.317000000000007,
  startHeight: [config.APP.heightSlider.min, config.APP.heightSlider.max],
  startDuration: [config.APP.durationSlider.min, config.APP.durationSlider.max],
  startHeightMax: config.APP.heightSlider.max,
  startDurationMax: config.APP.durationSlider.max,
  heightRange: config.APP.heightSlider,
  durationRange: config.APP.durationSlider,
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
