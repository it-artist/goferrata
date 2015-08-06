import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr("string"),
  point: DS.belongsTo("point"),
  user_name: DS.attr("string"),
  created_at: DS.attr("string"),

  formattedDate: function(){
    if (Ember.isEmpty(this.get("created_at"))) return "Now.";
    return this.get("created_at").substring(0, 10);
  }.property("created_at")

});
