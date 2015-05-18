import config from '../config/environment';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  host: "http://" + config.apiHost
});
