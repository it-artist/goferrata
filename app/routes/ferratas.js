import config from '../config/environment';
import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.find('point');
  },

  actions: {
    facebookLogin: function() {
      var _this = this;
      this.get('session').authenticate('simple-auth-authenticator:torii', 'facebook-oauth2').then(function (data) {
        let authorization_code = _this.get('session.content.secure.authorizationCode');
        Ember.$.ajax({type: 'post',
                      url: `http:\/\/${ config.apiHost }/users/login.json`,
                      data: {
                        authorization_code: authorization_code
                      },
                      dataType: 'json'}).
        done(function(data) {
          _this.store.find('user', data.user.id).then(function(){
            // How to store user_id?
            // And where is the best place to initialize currentUser?
            // ANd is the above code ok?
          });
        });
      });
    },

  }
});
