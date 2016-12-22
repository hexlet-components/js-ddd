// @flow

import uuid from 'uuid-js';
import dataFns from 'date-fns';
import ApplicationEntity from './ApplicationEntity';

export default class Price extends ApplicationEntity {
  static weekendMultiplier = 1.3;

  static constraints = {
    cinemaHall: {
      presence: true,
      uniqueness: true,
    },
    value: {
      presence: true,
      numericality: true,
    },
  };

  constructor(cinemaHall, value) {
    super();
    this.id = uuid.create().hex;
    this.cinemaHall = cinemaHall;
    this.value = value;
  }

  calculateFor({ createdAt }) {
    return dataFns.isWeekend(createdAt) ?
      this.value * this.constructor.weekendMultiplier : this.value;
  }
}
