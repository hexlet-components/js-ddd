// @flow

import uuid from 'uuid-js';
import ApplicationEntity from './ApplicationEntity';

export default class Revenue extends ApplicationEntity {
  static constraints = {
    ticket: {
      presence: true,
      association: true,
    },
    cost: {
      presence: true,
      numericality: true,
    },
  };

  constructor(ticket, cost) {
    super();
    this.id = uuid.create().hex;
    this.ticket = ticket;
    this.cost = cost;
    this.createdAt = new Date();
  }
}

