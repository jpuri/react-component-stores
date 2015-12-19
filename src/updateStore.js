export default function updateStore(store, action) {
  let newStore;
  if (action.actionType === 'NEW') {
    newStore = store.set(action.key, action.value);
  } else if (action.actionType === 'DELETE') {
    newStore = store.remove(action.key);
  } else if (action.actionType === 'APPEND') {
    let list = store.get(action.key);
    list = list.push(action.value);
    newStore = store.set(action.key, list);
  } else if (action.actionType === 'REMOVE') {
    let list = store.get(action.key);
    const index = list.indexOf(action.value);
    list = list.remove(index);
    newStore = store.set(action.key, list);
  }
  return newStore;
}
