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

describe('single entity manipulation', () => {
  const store = storeFactory();

  it('should be able to add individual entities of a type', () => {
    const fredTheDog = { id: 5, name: 'fred' };
    store.dispatch(actions.addEntity('dog', fredTheDog));
    const state = store.getState();
    assert.strictEqual(state.dog[5], fredTheDog);
  });
});
