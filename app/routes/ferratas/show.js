import Ember from 'ember';

export default Ember.Route.extend({
  slug: null,
  model: function(ferrata) {
    this.set('slug', ferrata.slug);

    var ferratas = this.modelFor('ferratas');
    return ferratas.findBy('slug', this.get('slug'));
  },
  setupController: function(controller, model) {
    if(model) {
      model.set('active', true);

      controller.set('model', model);
      controller.set('centerLat', model.get('lat'));
      controller.set('centerLng', model.get('lng'));
    } else {
      this.transitionTo('ferratas');
    }
  }
});
