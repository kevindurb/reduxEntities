const constants = require('./constants');

const addEntity = (schema, entity) => ({
  type: constants.ADD_ENTITY,
  payload: {
    schema,
    entity,
  },
});

module.exports = {
  addEntity,
};
