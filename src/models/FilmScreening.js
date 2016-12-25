// @flow

import uuid from 'uuid-js';
import ApplicationEntity from './ApplicationEntity';

export default class FilmScreening extends ApplicationEntity {
  static constraints = {
    film: {
      presence: true,
    },
    cinemaHall: {
      presence: true,
    },
    cost: {
      presence: true,
      numericality: true,
    },
    time: {
      presence: true,
    },
  };

  constructor(film, cinemaHall, time, cost) {
    super();
    this.id = uuid.create().hex;
    this.film = film;
    this.cost = cost;
    this.cinemaHall = cinemaHall;
    this.time = time;
  }

  valueOf() {
    return this.id;
  }
}
