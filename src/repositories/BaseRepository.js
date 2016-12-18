// @flow

export default class {
  data = [];

  find(id) {
    return this.data.find(entity => entity.id === id);
  }

  save(entity) {
    this.data.push(entity);
  }
}
