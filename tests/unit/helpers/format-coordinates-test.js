import {
  formatCoordinates
} from '../../../helpers/format-coordinates';
import { module, test } from 'qunit';

module('FormatCoordinatesHelper');

test('it works', function(assert) {
  var result;

  result = formatCoordinates("44.2683131159999999");
  assert.equal(result, "44.268313115");

});
