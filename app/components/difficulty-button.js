import Ember from 'ember';

export default Ember.Component.extend({
  action: 'triggerDifficulty',
  tagName: 'button',
  classNames: ['filter__difficulty-button'],
  classNameBindings: ['active:filter__difficulty-button--active', 'color'],
  targetDifficulty: null,
  active: false,
  click: function() {
    this.sendAction('action', this.get('targetDifficulty'));
    return false;
  },
  setActive: function() {
    var difficulty = this.get('currentDifficulties');

    this.set('active', difficulty.contains(this.get('targetDifficulty')));
  }.observes('currentDifficulties.[]'),

  color: function() {
    let difficulty = this.get('targetDifficulty');
    if(['A', 'A/B'].contains(difficulty)) {
      return 'green';
    } else if(['B', 'B/C'].contains(difficulty)) {
      return 'blue';
    } else if(['C', 'C/D'].contains(difficulty)) {
      return 'red';
    } else {
      return 'black';
    }
  }.property('targetDifficulty')
});
