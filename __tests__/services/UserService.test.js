// @flow

import cinemaManager from '../../src/index';

describe('UserService', () => {
  let services;
  let film;
  let cinemaHall;
  let filmScreening;
  let user;

  beforeEach(() => {
    const app = cinemaManager();
    services = app.services;
    const email = 'etst@email.com';
    [user] = services.UserService.create(email);
    [film] = services.CinemaService.createFilm('first glance', 100);
    [cinemaHall] = services.CinemaService.createCinemaHall('first', 5, 5);
    [filmScreening] = services.CinemaService.createFilmScreening(film.id, cinemaHall.id, new Date());
  });

  it('buyTicket', () => {
    const place = { row: 5, col: 3 };
    const [ticket] = services.UserService.buyTicket(user.id, filmScreening.id, place);
    const expected = {
      place,
    };

    expect(ticket).toMatchObject(expected);
  });

  it('buyTicket (errors)', () => {
    const [, errors] = services.UserService.buyTicket();
    const expected = {
      fileScreening: ['File screening can\'t be blank'],
      place: ['Place can\'t be blank'],
      user: ['User can\'t be blank'],
    };

    expect(errors).toMatchObject(expected);
  });

  it('buyTicket with double reservation', () => {
    const place = { row: 5, col: 3 };
    services.UserService.buyTicket(user.id, filmScreening.id, place);
    const [, errors] = services.UserService.buyTicket(user.id, filmScreening.id, place);
    const expected = {
      fileScreening: [
        'File screening already exists',
      ],
    };

    expect(errors).toMatchObject(expected);
  });
});
