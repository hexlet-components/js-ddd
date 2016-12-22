// @flow

import uuid from 'uuid-js';
import StateMachine from 'javascript-state-machine';
import ApplicationEntity from '../ApplicationEntity';

const fsm = () => StateMachine.create({
  initial: 'active',
  events: [
    { name: 'refund', from: 'active', to: 'returned' },
  ],
});

export default class FilmScreeningTicket extends ApplicationEntity {
  static constraints = {
    fileScreening: {
      presence: true,
      uniqueness: {
        scope: ['place'], conditions: { fsm: { current: 'active' } },
      },
    },
    user: {
      presence: true,
    },
    place: {
      presence: true,
    },
  };

  constructor(fileScreening, user, place) {
    super();
    this.id = uuid.create().hex;
    this.fileScreening = fileScreening;
    this.user = user;
    this.place = place;
    this.createdAt = new Date();
    this.fsm = fsm();
  }
}
