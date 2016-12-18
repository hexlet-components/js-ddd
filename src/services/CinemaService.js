// @flow

import BaseService from './BaseService';
import validate from '../lib/validator';

export default class CinemaService extends BaseService {
  createCinemaHall(name, rows, cols) {
    const cinemaHall = new this.models.CinemaHall(name, rows, cols);
    const errors = validate(cinemaHall);
    if (!errors) {
      this.repositories.CinemaHall.save(cinemaHall);
    }
    return [cinemaHall, errors];
  }

  createFilm(name, duration) {
    const film = new this.models.Film(name, duration);
    const errors = validate(film);
    if (!errors) {
      this.repositories.FilmScreening.save(film);
    }
    return [film, errors];
  }

  createFilmScreening(filmId, cinemaHallId, time) {
    const film = this.repositories.Film.find(filmId);
    const hall = this.repositories.CinemaHall.find(cinemaHallId);
    const filmScreening = new this.models.FilmScreening(film, hall, time);
    const errors = validate(filmScreening);
    if (!errors) {
      this.repositories.FilmScreening.save(filmScreening);
    }
    return [filmScreening, errors];
  }
}
