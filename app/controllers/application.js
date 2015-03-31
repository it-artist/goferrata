import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  heightMin: null,
  heightMax: null,
  durationMin: null,
  durationMax: null,
  difficulties: config.APP.difficulties,
  currentDifficulties: Ember.A(),
  actions: {
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
