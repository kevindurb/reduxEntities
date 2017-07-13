const constants = require('./constants');

const initialState = {};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_ENTITY: {
      const { entity, name } = action.payload;
    }
    default:
      return state;
  }
};
