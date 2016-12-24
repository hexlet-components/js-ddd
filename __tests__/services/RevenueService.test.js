// @flow

import cinemaManager from '../../src/index';

describe('RevenueService', () => {
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
    [user] = services.RevenueService.createTicket(email);
    [film] = services.CinemaService.createFilm('first glance', 100);
    [cinemaHall] = services.CinemaService.createCinemaHall('first', 5, 5);
    [filmScreening] = services.CinemaService
      .createFilmScreening(film.id, cinemaHall.id, new Date());
    services.RevenueService.createPrice(cinemaHall.id, 100);
  });

  it('createPrice', () => {
    const [price] = services.RevenueService.createPrice(cinemaHall.id, 200);
    const expected = {
      value: 200,
    };

    expect(price).toMatchObject(expected);
  });

  it('buyTicket', () => {
    const place = { row: 5, col: 3 };
    const [ticket] = services.RevenueService.buyTicket(user.id, filmScreening.id, place);
    const revenue = repositories.Revenue.findBy({ ticket });
    const ticketExpected = {
      place,
    };

    expect(ticket).toMatchObject(ticketExpected);

    const revenueExpected = {
      ticket,
    };
    expect(revenue).toMatchObject(revenueExpected);
  });

  it('buyTicket (errors)', () => {
    const f = () => services.RevenueService.buyTicket();

    expect(f).toThrow();
  });

  it('buyTicket with double reservation', () => {
    const place = { row: 5, col: 3 };
    services.RevenueService.buyTicket(user.id, filmScreening.id, place);
    const [, errors] = services.RevenueService.buyTicket(user.id, filmScreening.id, place);
    const expected = { fileScreening: [
      'File screening already exists',
    ] };

    expect(errors).toMatchObject(expected);
  });

  it('refundTicket', () => {
    const place = { row: 5, col: 3 };
    const [ticket] = services.RevenueService.buyTicket(user.id, filmScreening.id, place);
    services.RevenueService.refundTicket(ticket.id);
    expect(ticket).toMatchObject({ fsm: { current: 'returned' } });

    const revenues = repositories.Revenue.findAllBy({ ticket });
    expect(revenues).toHaveLength(2);
    expect(revenues.reduce((acc, { cost }) => acc + cost, 0)).toBe(0);

    services.RevenueService.refundTicket(ticket.id);

    const revenues2 = repositories.Revenue.findAllBy({ ticket });
    expect(revenues2).toHaveLength(2);
    expect(revenues2.reduce((acc, { cost }) => acc + cost, 0)).toBe(0);
  });
});
