import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  centerLat: Ember.computed.alias('controllers.application.centerLat'),
  centerLng: Ember.computed.alias('controllers.application.centerLng'),

  actions: {
    createComment: function() {
      const store = this.get('store');

      let comment = store.createRecord("comment", {
        text: this.get("newComment"),
        point: this.get("model")
      });
      comment.save();

      comment.set("user_name", this.get("session").get("currentUser").get("name"))

      this.set("newComment", "");
    }
  }
});
