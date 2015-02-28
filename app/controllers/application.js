import Ember from 'ember';

export default Ember.Controller.extend({
  heightMin: null,
  heightMax: null,
  durationMin: null,
  durationMax: null,
  difficulty: null,
  actions: {
    setDifficulty: function(difficulty) {
      this.set('difficulty', difficulty);
    }
  }
});
