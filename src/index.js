// @flow

import Bottle from 'bottlejs';
import services from './services';
import models from './models';
import repositories from './repositories';

export default () => {
  const bottle = new Bottle();
  bottle.factory('repositories', () => {
    const result = Object.keys(repositories).reduce((acc, repoName) =>
      ({ ...acc, [repoName]: new repositories[repoName]() }), {});
    return result;
  });

  bottle.service('models', () => models);

  bottle.factory('services', container => {
    const result = Object.keys(services).reduce((acc, serviceName) =>
      ({ ...acc, [serviceName]: new services[serviceName](container) }), {});
    return result;
  });

  return bottle.container;
};
