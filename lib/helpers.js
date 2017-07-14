const update = require('immutability-helper');

const getId = entity => entity.id;

const getDomain = (domain, state) => state[domain];

const domainExists = (domain, state) => !!getDomain(domain, state);

const entityExists = (domain, entity, state) => (
  domainExists(domain, state) && getDomain(domain, state)[getId(entity)]
);

const createDomainWithEntity = (domain, entity, state) => {
  const id = getId(entity);
  return update(state, {
    [domain]: {
      $set: {
        [id]: entity,
      },
    },
  });
}

const setEntityInDomain = (domain, entity, state) => {
  const id = getId(entity);
  if (domainExists(domain, state)) {
    return update(state, {
      [domain]: {
        [id]: {
          $set: entity,
        },
      },
    });
  }
  return createDomainWithEntity(domain, entity, state);
};

const removeEntityFromDomain = (domain, entity, state) => {
  const id = getId(entity);

  if (domainExists(domain, state)) {
    return update(state, {
      [domain]: {
        $unset: [id],
      },
    });
  }
  return state;
};

const mergeEntityInDomain = (domain, entity, state) => {
  if (entityExists(domain, entity, state)) {
    return update(state, {
      [domain]: {
        [getId(entity)]: { $merge: entity },
      },
    });
  }
  return setEntityInDomain(domain, entity, state);
};

module.exports = {
  setEntityInDomain,
  removeEntityFromDomain,
  mergeEntityInDomain,
};
