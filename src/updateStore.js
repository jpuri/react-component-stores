import Immutable from 'immutable';

// Function below has logic to be executed for various actions.
export default function updateStore(store, action) {
  let newStore;
  if (action.action === 'NEW') {
    // NEW: action has: key, value. key->value pair is added to store.
    newStore = store.set(action.key, action.value);
  } else if (action.action === 'DELETE') {
    // DELETE: action has only a key that is needed to be deleted from store.
    newStore = store.remove(action.key);
  } else if (action.action === 'LIST_ADD') {
    // LIST_ADD: action has key (key of list) and value to be added to the list.
    let list = store.get(action.key);
    if (!list) {
      list = new Immutable.List();
    }
    list = list.push(action.value);
    newStore = store.set(action.key, list);
  } else if (action.action === 'LIST_REMOVE') {
    // LIST_REMOVE: action has key (key of list) and value to be removed from the list.
    let list = store.get(action.key);
    const index = list.indexOf(action.value);
    list = list.remove(index);
    newStore = store.set(action.key, list);
  } else if (action.action === 'MAP_ADD') {
    // MAP_ADD: action has key (key of map) and value to be added to the map.
    // Value is in turn key->value pair.
    let map = store.get(action.key);
    if (!map) {
      map = new Immutable.Map({});
    }
    map = map.set(action.value.key, action.value.value);
    newStore = store.set(action.key, map);
  } else if (action.action === 'MAP_REMOVE') {
    // MAP_ADD: action has key (key of map) and value to be added to the map.
    // Value is in turn has a key.
    let map = store.get(action.key);
    map = map.remove(action.value);
    newStore = store.set(action.key, map);
  } else if (action.action === 'FLUSH') {
    // FLUSH: this action will flush app state to blank slate.
    newStore = new Immutable.Map({});
  }
  return newStore;
}
