import Ember from 'ember';
import config from '../config/environment';

export default Ember.Object.extend({
  open: function(authorization){
    return this._fetchSession({
      "authorization_code": authorization.authorizationCode
    });
  },

  fetch: function() {
    return this._fetchSession({
      "token": localStorage.getItem("token")
    });
  },

  _fetchSession: function(tokenData) {
    let self = this;

    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax({
        url: `http:\/\/${ config.apiHost }/users/login.json`,
        type: "POST",
        data: tokenData,
        dataType: "json",
        success: function(data) {
          localStorage.setItem("token", data.user.token);
          console.log(data);
          var currentUser = Ember.Object.create(data.user);
          //var currentUser = self.store.createRecord("user", data);
          console.log(currentUser);
          Ember.run.bind(null, resolve({ "currentUser": currentUser }));
        },
        error: function(jqXHR, textStatus, errorThrown){
          Ember.run.bind(null, reject({ "message": errorThrown }));
        }
      });
    });
  }
});

