// @flow

import uuid from 'uuid-js';

export default class Ticket {
  static constraints = {
    fileScreening: {
      presence: true,
    },
    user: {
      presence: true,
      numericality: true,
    },
    place: {
      presence: true,
    },
  };

  constructor(fileScreening, user, place) {
    this.id = uuid.create().hex;
    this.fileScreening = fileScreening;
    this.user = user;
    this.place = place;
  }
}
