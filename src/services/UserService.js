// @flow

import BaseService from './BaseService';
import validate from '../lib/validator';

export default class UserService extends BaseService {
  buyTicket(userId, filmScreeningId, place) {
    const user = this.repositories.User.find(userId);
    const screening = this.repositories.FilmScreening.find(filmScreeningId);
    const ticket = new this.models.FilmScreeningTicket(screening, user, place);
    const errors = validate(ticket);
    if (!errors) {
      this.repositories.FilmScreeningTicket.save(ticket);
    }
    return [ticket, errors];
  }
}
