import config from '../config/environment';
import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['application'],
  zoom: Ember.computed.alias('controllers.application.zoom'),
  activeMarker: null,
  centerLat: Ember.computed.alias('controllers.application.centerLat'),
  centerLng: Ember.computed.alias('controllers.application.centerLng'),
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
    openDetail: function(ferrata) {
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
