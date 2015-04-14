import Ember from 'ember';

export default Ember.Component.extend({
  action: 'centerMap',
  classNames: ['geolocate-button'],
  tagName: 'button',
  classNameBindings: ['hidden:geolocate-button--hidden'],
  hidden: true,
  latitude: null,
  longitude: null,
  didInsertElement: function() {
    if(navigator && navigator.geolocation) {
      this.set('hidden', false);
    }
  },
  click: function() {
    var self = this;
    if(navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        self.sendAction('action', position.coords.latitude, position.coords.longitude);
      }, function() {
        console.info('Geolocation was denied in the browser.');
      });
    };
    return false;
  },
});
