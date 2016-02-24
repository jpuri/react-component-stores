jest.dontMock('../updateStore');
jest.dontMock('immutable');

const updateStore = require('../updateStore').default;
const Immutable = require('immutable');

describe('updateStore', () => {
  it('should add (key,value) to store when action_type is NEW', () => {
    let store = new Immutable.Map({});
    store = updateStore(store, { actionType: 'NEW', key: 'test_key', value: 'test_value' });
    expect(store.size).toBe(1);
    expect(store.get('test_key')).toBe('test_value');
  });
  it('should delete key from store when action_type is DELETE', () => {
    let store = new Immutable.Map({});
    store = store.set('test_key', 'test_value');
    store = updateStore(store, { actionType: 'DELETE', key: 'test_key' });
    expect(store.size).toBe(0);
    expect(store.get('test_key')).toBe(undefined);
  });
  it('should append value to list in store when action_type is LIST_NEW', () => {
    let store = new Immutable.Map({});
    store = store.set('test_list_key', new Immutable.List());
    store = updateStore(store,
      { actionType: 'LIST_NEW', key: 'test_list_key', value: 'test_list_value' });
    expect(store.size).toBe(1);
    expect(store.get('test_list_key').size).toBe(1);
    expect(store.get('test_list_key').get(0)).toBe('test_list_value');
  });
  it('should remove value from list in store when action_type is LIST_DELETE', () => {
    let store = new Immutable.Map({});
    let storeList = new Immutable.List();
    storeList = storeList.push('test_list_value');
    store = store.set('test_list_key', storeList);
    expect(store.size).toBe(1);
    expect(store.get('test_list_key').size).toBe(1);
    store = updateStore(store,
      { actionType: 'LIST_DELETE', key: 'test_list_key', value: 'test_list_value' });
    expect(store.size).toBe(1);
    expect(store.get('test_list_key').size).toBe(0);
  });
  it('should add value to map in store when action_type is MAP_NEW', () => {
    let store = new Immutable.Map({});
    store = store.set('test_map_key', new Immutable.Map({}));
    store = updateStore(store, {
      actionType: 'MAP_NEW',
      key: 'test_map_key',
      value: { key: 'test_key', value: 'test_value' },
    });
    expect(store.size).toBe(1);
    expect(store.get('test_map_key').size).toBe(1);
    expect(store.get('test_map_key').get('test_key')).toBe('test_value');
  });
  it('should remove value from map when action_type is MAP_DELETE', () => {
    let store = new Immutable.Map({});
    let storeMap = new Immutable.Map({});
    storeMap = storeMap.set('test_key', 'test_value');
    store = store.set('test_map_key', storeMap);
    expect(store.size).toBe(1);
    expect(store.get('test_map_key').size).toBe(1);
    store = updateStore(store,
      { actionType: 'MAP_DELETE', key: 'test_map_key', value: 'test_key' });
    expect(store.size).toBe(1);
    expect(store.get('test_map_key').size).toBe(0);
  });
});
