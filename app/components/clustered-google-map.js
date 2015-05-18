/* globals MarkerClusterer, google */
import Ember from 'ember';
import GoogleMapComponent from './google-map';
import config from './../config/environment';

export default GoogleMapComponent.extend({
  action: 'openDetail',
  ferratas: null,
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

    for (index = 0; index < this.ferratas.get('length'); ++index) {

      var ferrata = this.ferratas.objectAt(index);

      // filter difficulty
      if(this.currentDifficulties.length > 0) {
        if(!this.currentDifficulties.contains(ferrata.get('difficulty'))) {continue;}
      }

      if(this.heightMin) {
        if(ferrata.get('height') < this.heightMin) {continue;}
      }

      if(this.heightMax) {
        if(ferrata.get('height') > this.heightMax) {continue;}
      }

      if(this.durationMin) {
        if(ferrata.get('duration') < this.durationMin * 60) {continue;}
      }

      if(this.durationMax) {
        if(ferrata.get('duration') > this.durationMax * 60) {continue;}
      }

      var latLng = new google.maps.LatLng(ferrata.get('lat'), ferrata.get('lng'));

      var marker = new google.maps.Marker({
        position: latLng,
        title: this.getMarkerTitle(ferrata),
        icon: this.getImagePath(this.getIconForDifficulty(ferrata.get('difficulty')))
      });
      ferrata.set('marker', marker);

      google.maps.event.addListener(ferrata.get('marker'), 'click', this.markerClickHandler(latLng, clusterer.getMap(), ferrata));

      if(ferrata.get('active')) {
        this.markerClickHandler(latLng, clusterer.getMap(), ferrata)();
      }

      newMarkers.push(ferrata.get('marker'));
    }

    clusterer.clearMarkers();
    clusterer.addMarkers(newMarkers);
  }.observes('currentDifficulties.[]', 'heightMin', 'heightMax', 'durationMin', 'durationMax', 'ferratas.@each'),

  getImagePath: function(path) {
    return config.baseURL + path;
  },

  getMarkerTitle: function(ferrata) {
    return ferrata.get('name') + ' (' + ferrata.get('height') + 'm)';
  },

  getIconForDifficulty: function(difficulty) {
    if(['A', 'A/B'].contains(difficulty)) {
      return 'pointer_green.png';
    } else if(['B', 'B/C'].contains(difficulty)) {
      return 'pointer_blue.png';
    } else if(['C', 'C/D', 'D'].contains(difficulty)) {
      return 'pointer_red.png';
    } else {
      return 'pointer_black.png';
    }
  },

  stopPreviousMarkerAnimation: function() {
    var active = this.get('activeMarker');
    var previous = this.get('previousMarker');

    if(active !== previous) {
      this.set('previousMarker', active);
      if(previous) {
        previous.setAnimation(null);
      }
    }
  }.observes('activeMarker'),

  startActiveMarkerAnimation: function() {
    var active = this.get('activeMarker');
    if(active) {
      active.setAnimation(google.maps.Animation.BOUNCE);
    }
  }.observes('activeMarker'),

  markerClickHandler: function(latLng, map, ferrata) {
    var self = this;
    return function() {
      map.panTo(latLng);

      self.set('activeMarker', ferrata.get('marker'));
      self.sendAction('action', ferrata);
    };
  }

});
