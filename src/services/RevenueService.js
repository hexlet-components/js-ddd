// @flow

import ApplicationService from './ApplicationService';

export default class extends ApplicationService {
  createTicket(email) {
    const user = new this.models.User(email);
    const errors = this.validate(user);
    if (!errors) {
      this.repositories.User.save(user);
    }
    return [user, errors];
  }

  createPrice(cinemaHallId, value) {
    const cinemaHall = this.repositories.CinemaHall.find(cinemaHallId);
    const price = new this.models.Price(cinemaHall, value);
    const errors = this.validate(price);
    if (!errors) {
      this.repositories.Price.save(price);
    }
    return [price, errors];
  }

  buyTicket(userId, filmScreeningId, place) {
    const user = this.repositories.User.find(userId);
    const screening = this.repositories.FilmScreening.find(filmScreeningId);
    const price = this.repositories.Price.findBy({ cinemaHall: screening.cinemaHall });

    const ticket = new this.models.FilmScreeningTicket(screening, user, place);
    const errors = this.validate(ticket);
    if (errors) {
      return [ticket, errors];
    }

    const cost = price.calculateFor(ticket);
    const revenue = new this.models.Revenue(ticket, cost);
    this.validate(revenue, { exception: true });

    this.repositories.FilmScreeningTicket.save(ticket);
    this.repositories.Revenue.save(revenue);

    return [ticket, errors];
  }

  refundTicket(ticketId) {
    const ticket = this.repositories.FilmScreeningTicket.find(ticketId);
    if (ticket.fsm.is('returned')) {
      return false;
    }
    ticket.fsm.refund();
    const revenue1 = this.repositories.Revenue.findBy({ ticket });
    const revenue2 = new this.models.Revenue(ticket, -revenue1.cost);
    const errors = this.validate(revenue2);
    if (errors) {
      // throw error
    }

    return this.repositories.Revenue.save(revenue2);
  }
}
