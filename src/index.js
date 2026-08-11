//

import Bottle from "bottlejs";
import makeValidator from "./lib/validator";
import models from "./models";
import repositories from "./repositories";
import services from "./services";

export default () => {
  const bottle = new Bottle();
  bottle.factory("repositories", () => {
    const result = Object.keys(repositories).reduce(
      (acc, repoName) => ({ ...acc, [repoName]: new repositories[repoName]() }),
      {},
    );
    return result;
  });

  bottle.factory("models", () => models);

  bottle.factory("services", (container) => {
    const result = Object.keys(services).reduce(
      (acc, serviceName) => ({
        ...acc,
        [serviceName]: new services[serviceName](container),
      }),
      {},
    );
    return result;
  });

  bottle.factory("validate", (container) => makeValidator(container));

  return bottle.container;
};
