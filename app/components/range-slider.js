import RangeSlider from 'ember-cli-nouislider/components/range-slider';

export default RangeSlider.extend({
  kind: null,
  snap: true,
  connect: true,

  didInsertElement: function() {
    this._super();
    let pips_settings = { mode: 'range' };

    if (this.kind === "height") {
      pips_settings.format = {
        to: function ( value ) {
          return value + 'm';
        }
      };
    }
    else if (this.kind === "duration") {
      pips_settings.format = {
        to: function ( value ) {
          return parseInt(value / 60) + 'h';
        }
      };
      pips_settings.density = 6;
    }

    this.$().noUiSlider_pips(pips_settings);
  }
});
