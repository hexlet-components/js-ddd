// @flow

import uuid from 'uuid-js';
import ApplicationEntity from './ApplicationEntity';

export default class Film extends ApplicationEntity {
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
    super();
    this.id = uuid.create().hex;
    this.name = name;
    this.duration = duration;
  }
}
