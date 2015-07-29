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
            localStorage.setItem("token", data.user.token);
            var currentUser = Ember.Object.create(data.user);
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

