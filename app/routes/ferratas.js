import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('point');
  },

  actions: {
    signInViaFacebook: function() {
      var route = this;

      this.get('session').open('facebook-oauth2').then(function(){
        alert('success!');
      }, function(error) {
        console.log(error.message);
        route.controller.set('error', 'Could not sign you in: ' + error.message);
      });
    }
  }
});
