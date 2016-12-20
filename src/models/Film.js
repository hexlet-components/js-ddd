// @flow

import uuid from 'uuid-js';

export default class Film {
  static constraints = {
    name: {
      presence: true,
    },
    duration: {
      presence: true,
      // datetime: {
      //   dateOnly: true,
      // },
    },
  };

  constructor(name, duration) {
    this.id = uuid.create().hex;
    this.name = name;
    this.duration = duration;
  }
}
