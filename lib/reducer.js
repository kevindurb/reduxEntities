const constants = require('./constants');
const helpers = require('./helpers');

const initialState = {};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_ENTITY: {
      const { entity, domain } = action.payload;
      return helpers.setEntityInDomain(domain, entity, state);
    }
    case constants.REMOVE_ENTITY: {
      const { entity, domain } = action.payload;
      return helpers.removeEntityFromDomain(domain, entity, state);
    }
    case constants.MERGE_ENTITY: {
      const { entity, domain } = action.payload;
      return helpers.mergeEntityInDomain(domain, entity, state);
    }
    case constants.REPLACE_ENTITY: {
      const { entity, domain } = action.payload;
      return helpers.setEntityInDomain(domain, entity, state);
    }
    default:
      return state;
  }
};
