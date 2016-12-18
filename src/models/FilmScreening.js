// @flow

export default class {
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
    this.film = film;
    this.cinmeaHall = cinemaHall;
    this.time = time;
  }
}
