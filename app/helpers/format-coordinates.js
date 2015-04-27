import Ember from 'ember';

export function formatCoordinates(string) {
  return string.toString().substr(0, 12);
}

export default Ember.HTMLBars.makeBoundHelper(formatCoordinates);
