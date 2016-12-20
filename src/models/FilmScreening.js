// @flow

import uuid from 'uuid-js';

export default class FilmScreening {
  static constraints = {
    film: {
      presence: true,
    },
    cinemaHall: {
      presence: true,
    },
    time: {
      presence: true,
    },
  };

  constructor(film, cinemaHall, time) {
    this.id = uuid.create().hex;
    this.film = film;
    this.cinemaHall = cinemaHall;
    this.time = time;
  }

  valueOf() {
    return this.id;
  }
}
