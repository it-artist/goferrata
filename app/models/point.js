import DS from 'ember-data';

export default DS.Model.extend({
  link: DS.attr("string"),
  name: DS.attr("string"),
  region: DS.attr("string"),
  locality: DS.attr("string"),
  lat: DS.attr("string"),
  lng: DS.attr("string"),
  start: DS.attr("string"),
  target: DS.attr("string"),
  duration: DS.attr("number"),
  elevationdiff: DS.attr("number"),
  height: DS.attr("number"),
  slug: DS.attr("string"),
  difficulty: DS.attr("string")
});
