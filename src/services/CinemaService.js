// @flow

import ApplicationService from './ApplicationService';

export default class extends ApplicationService {
  createCinemaHall(name, rows, cols) {
    const cinemaHall = new this.models.CinemaHall(name, rows, cols);
    const errors = this.validate(cinemaHall);
    if (!errors) {
      this.repositories.CinemaHall.save(cinemaHall);
    }
    return [cinemaHall, errors];
  }

  createFilm(name, duration) {
    const film = new this.models.Film(name, duration);
    const errors = this.validate(film);
    if (!errors) {
      this.repositories.Film.save(film);
    }
    return [film, errors];
  }
}
