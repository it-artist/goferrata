import DS from "ember-data";

export default DS.RESTSerializer.extend({
  attrs: {
    point: { serialize: false }
  }
});
