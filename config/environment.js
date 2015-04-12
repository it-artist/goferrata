/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'go-ferrata',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    googleMap: {
      libraries: ['places']
    },
    contentSecurityPolicy: {
      'default-src': "*",
      'script-src': "*",
      'font-src': "*",
      'connect-src': "*",
      'img-src': "*",
      'style-src': "*",
      'media-src': "*"
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      difficulties: ["B", "B/C", "C", "C/D", "D", "D/E", "E", "E/F", "F"]
    }
  };

  if (environment === 'development') {
    ENV.googleAnalytics = { webPropertyId: 'UA-60379606-1' };
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.baseURL =  '/goferrata';
    ENV.locationType = 'hash';
    ENV.googleAnalytics = { webPropertyId: 'UA-60379606-1' };
  }

  return ENV;
};
