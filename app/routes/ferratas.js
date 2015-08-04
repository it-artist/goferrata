import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('point');
  },

  actions: {
    signInViaFacebook: function() {
      var route = this;

      this.get('session').open('facebook-oauth2').then(function(){
      }, function(error) {
        console.log(error.message);
        route.controller.set('error', 'Could not sign you in: ' + error.message);
      });
    },

    logout: function() {
      let self = this;
      let currentUser = self.get('session').get('currentUser');

      // Before session will be closed, we need to delete user from store
      // so the same user could be added again after login (no duplicate id)
      self.store.find("user", currentUser.get('id')).
          then(function(user) {
            user.deleteRecord();
            self.get('session').close();
          });
    }
  }
});
