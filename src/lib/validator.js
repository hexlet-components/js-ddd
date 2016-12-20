// @flow

import validate from 'validate.js';

export default container => {
  validate.validators.uniqueness = (value, options, key, attributes) => {
    const className = attributes.constructor.name;
    const repository = container.repositories[className];
    // const result = repository.findBy({ [key]: attributes[key].valueOf() });
    if (result) {
      return 'ticket already exists';
    }
    return null;
  };

  return entity => validate(entity, entity.constructor.constraints);
};
