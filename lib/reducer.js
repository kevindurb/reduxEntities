const update = require('immutability-helper');
const constants = require('./constants');

const getId = entity => entity.id;

const initialState = {};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_ENTITY: {
      const { entity, name } = action.payload;
      if (state[name]) {
        return update(state, {
          [name]: { [getId(entity)]: { $set: entity } }
        });
      }
      return update(state, {
        [name]: { $set: { [getId(entity)]: entity } }
      });
    }
    default:
      return state;
  }
};
