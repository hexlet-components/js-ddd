// @flow

import uuid from 'uuid-js';

export default class User {
  static constraints = {
    email: {
      presence: true,
      email: true,
    },
  };

  constructor(email) {
    this.id = uuid.create().hex;
    this.email = email;
  }
}
