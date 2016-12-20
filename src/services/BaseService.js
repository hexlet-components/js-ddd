// @flow

export default class {
  constructor(container) {
    this.repositories = container.repositories;
    this.models = container.models;
    this.validate = container.validate;
  }
}
