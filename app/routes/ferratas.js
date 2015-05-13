import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.find('point');
  },

  actions: {
    facebookLogin: function() {
      this.
        get('session').
        authenticate('simple-auth-authenticator:torii', 'facebook-oauth2').
        then(function () {
          alert("logged in");
        });
      return;
    }
  }

});
