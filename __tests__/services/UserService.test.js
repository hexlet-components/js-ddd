// @flow

import cinemaManager from '../../src/index';

describe('UserService', () => {
  let services;
  let film;
  let cinemaHall;
  let filmScreening;
  // let user;

  beforeEach(() => {
    const app = cinemaManager();
    services = app.services;
    [film] = services.CinemaService.createFilm('first glance', 100);
    [cinemaHall] = services.CinemaService.createCinemaHall('first', 5, 5);
    [filmScreening] = services.CinemaService.createFilmScreening(film.id, cinemaHall.id, new Date());
  });

  it('buyTicket', () => {
    const place = { row: 5, col: 3 };
    const [ticket] = services.UserService.buyTicket(5, filmScreening.id, place);
    const expected = {
      place,
    };

    expect(ticket).toMatchObject(expected);
  });
});
