// @flow

import uuid from 'uuid-js';

export default class FilmScreeningTicket {
  static constraints = {
    fileScreening: {
      presence: true,
      uniqueness: {
        scope: ['row', 'col'],
      },
    },
    user: {
      presence: true,
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
