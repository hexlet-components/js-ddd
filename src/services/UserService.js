// @flow

import ApplicationService from './ApplicationService';

export default class extends ApplicationService {
  createUser(email) {
    const user = new this.models.User(email);
    const errors = this.validate(user);
    if (!errors) {
      this.repositories.User.save(user);
    }
    return [user, errors];
  }
}
