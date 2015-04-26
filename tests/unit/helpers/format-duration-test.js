import {
  formatDuration
} from '../../../helpers/format-duration';
import { module, test } from 'qunit';

module('FormatDurationHelper');

test('it works', function(assert) {
  var result;

  result = formatDuration(130);
  assert.equal(result, '2:10');

  result = formatDuration(120);
  assert.equal(result, '2:00');
});
