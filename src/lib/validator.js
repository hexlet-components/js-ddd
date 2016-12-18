// @flow

import validate from 'validate.js';

export default entity => validate(entity, entity.constructor.constraints);
