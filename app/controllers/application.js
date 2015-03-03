import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  heightMin: null,
  heightMax: null,
  durationMin: null,
  durationMax: null,
  difficulty: null,
  difficulties: config.APP.difficulties,
  actions: {
    setDifficulty: function(difficulty) {
      this.set('difficulty', difficulty);
    }
  }
});
