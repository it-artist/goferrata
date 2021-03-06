import Ember from 'ember';
import config from './config/environment';
import googlePageview from './mixins/google-pageview';

var Router = Ember.Router.extend(googlePageview, {
  location: config.locationType
});

Router.map(function() {
  this.resource('ferratas', { path: '/' }, function() {
    this.route('show', { path: '/:slug' });
  });
});

export default Router;
