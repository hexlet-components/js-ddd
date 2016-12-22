// @flow

import uuid from 'uuid-js';
import ApplicationEntity from './ApplicationEntity';

export default class User extends ApplicationEntity {
  static constraints = {
    email: {
      presence: true,
      email: true,
    },
  };

  constructor(email) {
    super();
    this.id = uuid.create().hex;
    this.email = email;
  }
}
