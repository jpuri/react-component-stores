export default function updateStore(store, action) {
    if(action.actionType === 'NEW') {
      store = store.set(action.key, action.value);
    } else if(action.actionType === 'REMOVE') {
      store = store.remove(action.key);
    } else if(action.actionType === 'APPEND') {
      let list = store.get(action.key);
      list = list.append(action.value);
      store = store.set(action.key, list);
    } else if(action.actionType === 'DELETE') {
      let list = store.get(action.key);
      list = list.remove(action.value);
      store = store.set(action.key, list);
    }
  return store;
}
