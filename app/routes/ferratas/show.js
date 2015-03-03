import Ember from 'ember';

export default Ember.Route.extend({
  slug: null,
  model: function(params) {
    this.set('slug', params.slug);

    return this.modelFor('ferratas');
  },

  setupController: function(controller, model) {
    var ferrata = model.findBy('slug', this.get('slug'));

    if(ferrata) {
      model[model.indexOf(ferrata)]["active"] = true;

      controller.set('centerLat', ferrata.lat);
      controller.set('centerLng', ferrata.lng);
    } else {
      this.transitionTo('ferratas');
    }
  }
});
