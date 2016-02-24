import Immutable from 'immutable';

export default function updateStore(store, action) {
  let newStore;
  if (action.actionType === 'NEW') {
    newStore = store.set(action.key, action.value);
  } else if (action.actionType === 'DELETE') {
    newStore = store.remove(action.key);
  } else if (action.actionType === 'LIST_NEW') {
    let list = store.get(action.key);
    if (!list) {
      list = new Immutable.List();
    }
    list = list.push(action.value);
    newStore = store.set(action.key, list);
  } else if (action.actionType === 'LIST_DELETE') {
    let list = store.get(action.key);
    const index = list.indexOf(action.value);
    list = list.remove(index);
    newStore = store.set(action.key, list);
  } else if (action.actionType === 'MAP_NEW') {
    let map = store.get(action.key);
    if (!map) {
      map = new Immutable.Map({});
    }
    map = map.set(action.value.key, action.value.value);
    newStore = store.set(action.key, map);
  } else if (action.actionType === 'MAP_DELETE') {
    let map = store.get(action.key);
    map = map.remove(action.value);
    newStore = store.set(action.key, map);
  } else if (action.actionType === 'CLEAR') {
    newStore = new Immutable.Map({});
  }
  return newStore;
}
