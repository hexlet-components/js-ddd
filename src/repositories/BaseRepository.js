// @flow

import _ from 'lodash';

export default class {
  data = [];

  all() {
    return this.data;
  }

  find(id) {
    return this.data.find(entity => entity.id === id);
  }

  findAllBy(params) {
    return _.filter(this.data, params);
  }

  findBy(params) {
    const result = this.findAllBy(params);
    return result.length > 0 ? result[0] : null;
  }

  save(entity) {
    this.data.push(entity);
  }
}
