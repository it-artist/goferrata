import Ember from 'ember';

export function formatDuration(time/*, hash*/) {
  var hours = parseInt(time / 60).toString();
  var minutes = parseInt(time % 60).toString();

  if(minutes === '0') {
    minutes = '00';
  }

  return `${hours}:${minutes}`;
}

export default Ember.HTMLBars.makeBoundHelper(formatDuration);
