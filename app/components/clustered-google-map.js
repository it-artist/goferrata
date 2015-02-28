/* globals MarkerClusterer  */
import Ember from 'ember';
import GoogleMapComponent from './google-map';
import helpers from 'ember-google-map/core/helpers';

export default GoogleMapComponent.extend({
  difficulty: null,
  heightMin: null,
  heightMax: null,
  durationMin: null,
  durationMax: null,
  clusterer: null,
  markerViewClass: 'ferrata-map-marker',
  markerController: 'ferratas/marker',
  markerInfoWindowTemplateName: 'map/info-window',
  type: 'satellite',

  /**
   * Initialize the map
   */
  initGoogleMap: Ember.on('didInsertElement', function () {
    var canvas;
    this.destroyGoogleMap();
    if (helpers.hasGoogleLib()) {
      canvas = this.$('div.map-canvas')[0];
      this.createGoogleObject(canvas, null);
      this.scheduleAutoFitBounds();

      var mcOptions = {gridSize: 50, maxZoom: 10};
      this.clusterer = new MarkerClusterer(this.googleObject, [], mcOptions);

      this.initMarkers();
    }

  }),

  initMarkers: function() {
    Ember.debug('Markers rendered!');

    var oldMarkers = this.clusterer.getMarkers();
    var newMarkers = [];

    var index;

    for (index = 0; index < this.markers.length; ++index) {
      var marker = this.markers[index];

      // filter difficulty
      if(this.difficulty) {
        if(marker.difficulty != this.difficulty) continue;
      }

      if(this.heightMin) {
        if(marker.targetMax < this.heightMin) continue;
      }

      if(this.heightMax) {
        if(marker.targetMax > this.heightMax) continue;
      }

      if(this.durationMin) {
        if(marker.duration < this.durationMin * 60) continue;
      }

      if(this.durationMax) {
        if(marker.duration > this.durationMax * 60) continue;
      }

      var latlng = new google.maps.LatLng(marker.lat, marker.lng);
      var googleMarker = new google.maps.Marker({
        position: latlng,
        title: marker.title + ' (' + marker.targetMax + 'm)'
      });
      newMarkers.push(googleMarker);
    }

    this.clusterer.clearMarkers();
    this.clusterer.addMarkers(newMarkers);

  }.observes('difficulty', 'heightMin', 'heightMax', 'durationMin', 'durationMax')
});
