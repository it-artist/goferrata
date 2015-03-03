import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['currentDifficulty'],
  action: 'setDifficulty',
  currentDifficulty: null,
  targetDifficulty: null,
  tagName: 'button',
  classNames: ['btn', 'btn-default'],
  classNameBindings: ['activeClass'],

  activeClass: function() {
    if(this.get('currentDifficulty') === this.get('targetDifficulty')) {
      return 'active';
    }
  }.property('currentDifficulty', 'targetDifficulty'),

  click: function() {
    this.sendAction('action', this.get('targetDifficulty'));
    return false;
  }
});
