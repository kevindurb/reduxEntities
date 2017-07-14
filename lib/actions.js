const constants = require('./constants');

const addEntity = (domain, entity) => ({
  type: constants.ADD_ENTITY,
  payload: {
    domain,
    entity,
  },
});

const removeEntity = (domain, entity) => ({
  type: constants.REMOVE_ENTITY,
  payload: {
    domain,
    entity,
  },
});

const mergeEntity = (domain, entity) => ({
  type: constants.MERGE_ENTITY,
  payload: {
    domain,
    entity,
  },
});

const replaceEntity = (domain, entity) => ({
  type: constants.REPLACE_ENTITY,
  payload: {
    domain,
    entity,
  },
});

module.exports = {
  addEntity,
  removeEntity,
  mergeEntity,
  replaceEntity,
};
