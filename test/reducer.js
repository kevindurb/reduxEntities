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
  context('#addEntity', () => {
    it('should be able to add individual entities of a type', () => {
      const store = storeFactory();
      const fredTheDog = { id: 5, name: 'fred' };
      store.dispatch(actions.addEntity('dog', fredTheDog));
      const state = store.getState();
      assert.strictEqual(state.dog[5], fredTheDog);
    });

    it('should be able to add a second entity', () => {
      const store = storeFactory();
      const fredTheDog = { id: 5, name: 'fred' };
      const joeTheDog = { id: 6, name: 'joe' };

      store.dispatch(actions.addEntity('dog', fredTheDog));
      store.dispatch(actions.addEntity('dog', joeTheDog));

      const state = store.getState();
      assert.strictEqual(state.dog[6], joeTheDog);
    });

    it('should be able to add a second type of entity and not mess up previous entities', () => {
      const store = storeFactory();
      const joeTheDog = { id: 6, name: 'joe' };
      const georgeTheRabbit = { id: 6, name: 'george' };

      store.dispatch(actions.addEntity('dog', joeTheDog));
      store.dispatch(actions.addEntity('rabbit', georgeTheRabbit));

      const state = store.getState();
      assert.strictEqual(state.dog[6], joeTheDog);
      assert.strictEqual(state.rabbit[6], georgeTheRabbit);
    });
  });

  context('#removeEntity', () => {
    it('should be able to remove an entity', () => {
      const store = storeFactory();
      const fredTheDog = { id: 5, name: 'fred' };

      store.dispatch(actions.addEntity('dog', fredTheDog));
      assert.strictEqual(store.getState().dog[5], fredTheDog);

      store.dispatch(actions.removeEntity('dog', fredTheDog));
      assert.strictEqual(store.getState().dog[5], undefined);
    });
  });

  context('#mergeEntity', () => {
    it('should be able to merge an entity', () => {
      const store = storeFactory();
      const fredTheDog = { id: 5, name: 'fred' };
      const fredTheDogWithAge = { id: 5, name: 'fred', age: 26 };

      store.dispatch(actions.addEntity('dog', fredTheDog));
      assert.strictEqual(store.getState().dog[5], fredTheDog);

      store.dispatch(actions.mergeEntity('dog', fredTheDogWithAge));
      assert.deepEqual(store.getState().dog[5], fredTheDogWithAge);
    });

    it('should create an entity if it doesnt exist', () => {
      const store = storeFactory();
      const fredTheDogWithAge = { id: 5, name: 'fred', age: 26 };

      store.dispatch(actions.mergeEntity('dog', fredTheDogWithAge));
      assert.strictEqual(store.getState().dog[5], fredTheDogWithAge);
    });
  });

  context('#replaceEntity', () => {
    it('should be able to replace an entity', () => {
      const store = storeFactory();
      const fredTheDog = { id: 5, name: 'fred' };
      const fredTheDogWithAge = { id: 5, name: 'fred', age: 26 };

      store.dispatch(actions.addEntity('dog', fredTheDog));
      assert.strictEqual(store.getState().dog[5], fredTheDog);

      store.dispatch(actions.replaceEntity('dog', fredTheDogWithAge));
      assert.strictEqual(store.getState().dog[5], fredTheDogWithAge);
    });

    it('should create an entity if it doesnt exist', () => {
      const store = storeFactory();
      const fredTheDogWithAge = { id: 5, name: 'fred', age: 26 };

      store.dispatch(actions.replaceEntity('dog', fredTheDogWithAge));
      assert.strictEqual(store.getState().dog[5], fredTheDogWithAge);
    });
  });
});
