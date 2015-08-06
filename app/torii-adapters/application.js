import Ember from 'ember';
import config from '../config/environment';

export default Ember.Object.extend({
  open: function(authorization){
    return this._fetchSession({
      "authorization_code": authorization.authorizationCode
    });
  },

  fetch: function() {
    let token = localStorage.getItem("token")

    return this._fetchSession({
      "token": token
    });
  },

  close: function() {
    localStorage.removeItem("token");
  },

  _fetchSession: function(tokenData) {
    let self = this;

    return new Ember.RSVP.Promise(function(resolve, reject){
      if (Ember.isPresent(tokenData["token"]) || Ember.isPresent(tokenData["authorization_code"])) {
        Ember.$.ajax({
          url: `http:\/\/${ config.apiHost }/users/login.json`,
          type: "POST",
          data: tokenData,
          dataType: "json",
          success: function(data) {
            // Persist token in browser
            localStorage.setItem("token", data.user.token);
            // Set token to be used for ajax calls
            Ember.$.ajaxPrefilter(function(options, originalOptions, xhr) {
                return xhr.setRequestHeader('AUTHORIZATION', "Token token=" + data.user.token);
            });
            // Prepare user object to be merged into torii's session object
            var currentUser = self.store.createRecord("user", data.user);
            Ember.run.bind(null, resolve({ "currentUser": currentUser }));
          },
          error: function(jqXHR, textStatus, errorThrown){
            Ember.run.bind(null, reject({ "message": errorThrown }));
          }
        });
      } else {
        Ember.run.bind(null, reject());
      }
    });
  }
});

