// @flow

import cinemaManager from '../../src/index';

describe('MoneyService', () => {
  let services;
  let film;
  let cinemaHall;
  let filmScreening;
  let user;
  let repositories;

  beforeEach(() => {
    const app = cinemaManager();
    services = app.services;
    repositories = app.repositories;
    const email = 'etst@email.com';
    [user] = services.MoneyService.createTicket(email);
    [film] = services.CinemaService.createFilm('first glance', 100);
    [cinemaHall] = services.CinemaService.createCinemaHall('first', 5, 5);
    services.MoneyService.createPrice(cinemaHall.id, 100);
    [filmScreening] = services.MoneyService
      .createFilmScreening(film.id, cinemaHall.id, new Date());
  });

  it('createPrice', () => {
    const [localPrice] = services.MoneyService.createPrice(cinemaHall.id, 200);
    const expected = {
      value: 200,
    };

    expect(localPrice).toMatchObject(expected);
  });

  it('createFilmScreening', () => {
    const time = new Date();
    const [localFilmScreening] = services.MoneyService
      .createFilmScreening(film.id, cinemaHall.id, time);

    const expected = {
      // film,
      // cinemaHall,
      time,
    };
    expect(localFilmScreening).toMatchObject(expected);
  });

  it('buyTicket', () => {
    const place = { row: 5, col: 3 };
    const [ticket] = services.MoneyService.buyTicket(user.id, filmScreening.id, place);
    const capitalTransaction = repositories.CapitalTransaction.findBy({ ticket });
    const ticketExpected = {
      place,
    };

    expect(ticket).toMatchObject(ticketExpected);

    const capitalTransactionExpected = {
      ticket,
      type: 'income',
    };
    expect(capitalTransaction).toMatchObject(capitalTransactionExpected);
  });

  it('buyTicket (errors)', () => {
    const f = () => services.MoneyService.buyTicket();

    expect(f).toThrow();
  });

  it('buyTicket with double reservation', () => {
    const place = { row: 5, col: 3 };
    services.MoneyService.buyTicket(user.id, filmScreening.id, place);
    const [, errors] = services.MoneyService.buyTicket(user.id, filmScreening.id, place);
    const expected = { fileScreening: [
      'File screening already exists',
    ] };

    expect(errors).toMatchObject(expected);
  });

  it('refundTicket', () => {
    const place = { row: 5, col: 3 };
    const [ticket] = services.MoneyService.buyTicket(user.id, filmScreening.id, place);
    services.MoneyService.refundTicket(ticket.id);
    expect(ticket).toMatchObject({ fsm: { current: 'returned' } });

    const capitalTransactions = repositories.CapitalTransaction.findAllBy({ ticket });
    expect(capitalTransactions).toHaveLength(2);
    expect(capitalTransactions.reduce((acc, { cost }) => acc + cost, 0)).toBe(0);

    services.MoneyService.refundTicket(ticket.id);

    const capitalTransactions2 = repositories.CapitalTransaction.findAllBy({ ticket });
    expect(capitalTransactions2).toHaveLength(2);
    expect(capitalTransactions2.reduce((acc, { cost }) => acc + cost, 0)).toBe(0);
  });
});
