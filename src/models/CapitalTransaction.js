// @flow

import uuid from 'uuid-js';
import ApplicationEntity from './ApplicationEntity';

export default class Money extends ApplicationEntity {
  static types = ['income', 'loss'];

  static constraints = {
    ticket: {
      presence: true,
    },
    cost: {
      presence: true,
      numericality: true,
    },
    type: {
      presence: true,
      inclusion: Money.types,
    },
  };

  constructor(ticket, type) {
    super();
    this.id = uuid.create().hex;
    this.ticket = ticket;
    this.type = type;
    this.createdAt = new Date();

    switch (type) {
      case 'income':
        this.cost = ticket.cost;
        break;
      case 'loss':
        this.cost = -ticket.cost;
        break;
      default:
        throw new Error(`Unknown type '${type}'`);
    }
  }
}

