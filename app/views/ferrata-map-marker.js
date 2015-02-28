import Ember from 'ember';
import GoogleMapMarkerView from './google-map/marker';

export default GoogleMapMarkerView.extend({
  markAsLoaded: Ember.on('didInsertElement', function () {
    var controller = this.get('controller.controllers.loading');
    controller.set('alreadyLoaded', controller.get('alreadyLoaded') + 1);
  }),
});
