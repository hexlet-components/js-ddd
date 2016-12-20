// @flow

import _ from 'lodash';
import validate from 'validate.js';

export default container => {
  validate.validators.uniqueness = (value, options, key, attributes) => {
    if (!value) {
      return null;
    }
    const className = attributes.constructor.name;
    const repository = container.repositories[className];
    const scope = options.scope || {};
    const params = { [key]: value, ..._.pick(attributes, scope) };
    const result = repository.findBy(params);
    if (result) {
      return 'already exists';
    }
    return null;
  };

  return entity => validate(entity, entity.constructor.constraints);
};
