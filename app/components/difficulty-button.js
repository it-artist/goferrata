import Ember from 'ember';

export default Ember.Component.extend({
  action: 'triggerDifficulty',
  tagName: 'button',
  classNames: ['btn', 'btn-default'],
  classNameBindings: ['active'],
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
});
