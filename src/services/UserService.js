// @flow

import BaseService from './BaseService';

export default class UserService extends BaseService {
  create(email) {
    const user = new this.models.User(email);
    const errors = this.validate(user);
    if (!errors) {
      this.repositories.User.save(user);
    }
    return [user, errors];
  }

  buyTicket(userId, filmScreeningId, place) {
    const user = this.repositories.User.find(userId);
    const screening = this.repositories.FilmScreening.find(filmScreeningId);
    // console.log(this.repositories.FilmScreening, filmScreeningId, screening);
    const ticket = new this.models.FilmScreeningTicket(screening, user, place);
    const errors = this.validate(ticket);
    if (!errors) {
      this.repositories.FilmScreeningTicket.save(ticket);
    }
    return [ticket, errors];
  }
}
