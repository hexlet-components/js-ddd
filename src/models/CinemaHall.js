// @flow

import uuid from 'uuid-js';

export default class CinemaHall {
  static constraints = {
    name: {
      presence: true,
    },
    rows: {
      presence: true,
      numericality: true,
    },
    cols: {
      presence: true,
      numericality: true,
    },
  };

  constructor(name, rows, cols) {
    this.id = uuid.create().hex;
    this.name = name;
    this.rows = rows;
    this.cols = cols;
  }
}
