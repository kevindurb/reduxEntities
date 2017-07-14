const constants = require('./constants');

const addEntity = (name, entity) => ({
  type: constants.ADD_ENTITY,
  payload: {
    name,
    entity,
  },
});

const removeEntity = (name, entity) => ({
  type: constants.REMOVE_ENTITY,
  payload: {
    name,
    entity,
  },
});

module.exports = {
  addEntity,
  removeEntity,
};
