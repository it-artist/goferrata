import config from '../config/environment';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({

  buildURL: function(type, id, snapshot) {
    return `http:\/\/${config.apiHost}/points/${snapshot.record.get('point').get('id')}/comments/`;
  }

});
