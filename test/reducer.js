const createStore = require('redux').createStore;
const assert = require('assert');
const actions = require('../lib/actions');
const reducer = require('../lib/reducer');

const storeFactory = () => (
  createStore(reducer)
);

describe('store creation', () => {
  it('should be able to create from entity reducer', () => {
    storeFactory();
  });
});

describe('entity manipulation', () => {
  const store = storeFactory();

  it('should be able to add individual entities of a type', () => {
    store.dispatch(actions.addEntity('dog', { name: 'fred' }));
    const state = store.getState();
    assert(state.dog, 'dog entry exists');
  });
});
