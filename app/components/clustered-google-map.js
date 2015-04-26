/* globals MarkerClusterer, google */
import Ember from 'ember';
import GoogleMapComponent from './google-map';
import config from './../config/environment';

export default GoogleMapComponent.extend({
  action: 'windowOpened',
  activeMarker: null,
  currentDifficulties: null,
  heightMin: null,
  heightMax: null,
  durationMin: null,
  durationMax: null,
  clusterer: null,
  markerViewClass: 'ferrata-map-marker',
  markerController: 'ferratas/marker',
  markerInfoWindowTemplateName: 'map/info-window',
  type: 'terrain',

  /**
   * Initialize the map
   */
  initGoogleMap: Ember.on('didInsertElement', function () {
    this._super();
    var map = this.googleObject;

    var input = document.getElementById('search-input');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    map.setOptions({
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.LEFT_BOTTOM,
      },
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.LEFT_CENTER
      }
    });

    var mcOptions = {gridSize: 50, maxZoom: 10, imagePath: this.getImagePath('static/m')};

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
    });

    this.clusterer = new MarkerClusterer(map, [], mcOptions);

    this.initMarkers();
  }),

  initMarkers: function() {
    var newMarkers = [];
    var clusterer = this.clusterer;
    var index;

    for (index = 0; index < this.ferratas.length; ++index) {
      var ferrata = this.ferratas[index];

      // filter difficulty
      if(this.currentDifficulties.length > 0) {
        if(!this.currentDifficulties.contains(ferrata.difficulty)) {continue;}
      }

      if(this.heightMin) {
        if(ferrata.height < this.heightMin) {continue;}
      }

      if(this.heightMax) {
        if(ferrata.height > this.heightMax) {continue;}
      }

      if(this.durationMin) {
        if(ferrata.duration < this.durationMin * 60) {continue;}
      }

      if(this.durationMax) {
        if(ferrata.duration > this.durationMax * 60) {continue;}
      }

      var latLng = new google.maps.LatLng(ferrata.lat, ferrata.lng);

      ferrata.marker = new google.maps.Marker({
        position: latLng,
        title: this.getMarkerTitle(ferrata),
        icon: this.getImagePath(this.getIconForDifficulty(ferrata.difficulty))
      });

      google.maps.event.addListener(ferrata.marker, 'click', this.markerClickHandler(latLng, clusterer.getMap(), ferrata));

      if(ferrata.active) {
        this.markerClickHandler(latLng, clusterer.getMap(), ferrata)();
      }

      newMarkers.push(ferrata.marker);
    }

    clusterer.clearMarkers();
    clusterer.addMarkers(newMarkers);
  }.observes('currentDifficulties.[]', 'heightMin', 'heightMax', 'durationMin', 'durationMax'),

  getImagePath: function(path) {
    return config.baseURL + path;
  },

  getMarkerTitle: function(ferrata) {
    return ferrata.name + ' (' + ferrata.height + 'm)';
  },

  getIconForDifficulty: function(difficulty) {
    if(['A', 'A/B'].contains(difficulty)) {
      return 'pointer_green.png';
    } else if(['B', 'B/C'].contains(difficulty)) {
      return 'pointer_blue.png';
    } else if(['C', 'C/D'].contains(difficulty)) {
      return 'pointer_red.png';
    } else {
      return 'pointer_black.png';
    }
  },

  markerClickHandler: function(latLng, map, ferrata) {
    var self = this;
    return function() {
      map.panTo(latLng);

      if(self.activeMarker) {
        self.activeMarker.setAnimation(null);
      }

      ferrata.marker.setAnimation(google.maps.Animation.BOUNCE);
      self.set('activeMarker', ferrata.marker);
      self.sendAction('action', ferrata);
    };
  }

});
