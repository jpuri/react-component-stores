import expect from 'expect';
import updateStore from '../updateStore';
import Immutable from 'immutable';

describe('updateStore', () => {
  it('should add key -> value when action_type is NEW', () => {
    let store = new Immutable.Map({});
    store = updateStore(store, {actionType: 'NEW', key: 'test_key', value: 'test_value'});
    expect(store.size).toBe(1);
    expect(store.get('test_key')).toBe('test_value');
  });
  it('should delete key -> value when action_type is DELETE', () => {
    let store = new Immutable.Map({});
    store = store.set('test_key', 'test_value');
    store = updateStore(store, {actionType: 'DELETE', key: 'test_key'});
    expect(store.size).toBe(0);
    expect(store.get('test_key')).toBe(undefined);
  });
  it('should append value to list -> value when action_type is APPEND', () => {
    let store = new Immutable.Map({});
    store = store.set('test_list_key', new Immutable.List());
    store = updateStore(store, {actionType: 'APPEND', key: 'test_list_key', value: 'test_list_value'});
    expect(store.size).toBe(1);
    expect(store.get('test_list_key').size).toBe(1);
    expect(store.get('test_list_key').get(0)).toBe('test_list_value');
  });
  it('should remove value from list -> value when action_type is REMOVE', () => {
    let store = new Immutable.Map({});
    let storeList = new Immutable.List();
    storeList = storeList.push('test_list_value');
    store = store.set('test_list_key', storeList);
    expect(store.size).toBe(1);
    expect(store.get('test_list_key').size).toBe(1);
    store = updateStore(store, {actionType: 'REMOVE', key: 'test_list_key', value: 'test_list_value'});
    expect(store.size).toBe(1);
    expect(store.get('test_list_key').size).toBe(0);
  });
});
