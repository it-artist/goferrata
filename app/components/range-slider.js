import RangeSlider from 'ember-cli-nouislider/components/range-slider';

export default RangeSlider.extend({
  orientation: "horizontal",
  formatting: null,

  didInsertElement: function() {
    this._super();
    this.$().noUiSlider_pips({
      mode: 'range'
    });
  }

});
