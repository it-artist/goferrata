import config from '../config/environment';
import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.$.ajax({url: `http:\/\/${config.apiHost}/points.json`,
                         ifModified: true,
                         dataType: 'json',
                         crossDomain: true});
  }
});
