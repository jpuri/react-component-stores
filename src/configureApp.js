import React, { Component } from 'react';
import Immutable from 'immutable';
import updateStore from './updateStore';

// The composing component registers in this map a method to update the store.
let updateComponentStoreHooks = new Immutable.List();

// Collection of all actions in the application.
let actionHistory = new Immutable.List();

// The function is used to update stores of the components.
export const updateComponentStores = (action) => {
  actionHistory = actionHistory.push(action);
  updateComponentStoreHooks.forEach((updateComponentStore) => {
    updateComponentStore();
  });
};

// This method creates composed component.
// The higher order component has in its state store which it passes in props to composed component.
export const configureStore = (fields) => (component) => class extends Component {

  constructor(properties) {
    super(properties);
    this.MyComponent = React.createFactory(component);
    this.state = { store: new Immutable.Map({}) };
  }

  // When component is mount, its entry is added to collection updateComponentStoreHooks, actionIndex is reset to 0.
  componentWillMount() {
    this.actionIndex = 0;
    updateComponentStoreHooks = updateComponentStoreHooks.push(this.updateComponentStore);
    this.updateComponentStore();
  }

  // When component is unmount, its entry is removed from collection updateComponentStoreHooks.
  componentWillUnmount() {
    updateComponentStoreHooks = updateComponentStoreHooks.remove(updateComponentStoreHooks.indexOf(this.updateComponentStore));
  }

  // This function will execute all action on actionHistory which are still not executed for this store.
  updateComponentStore = () => {
    let store = this.state.store;
    for (let i = this.actionIndex; i < actionHistory.size; i++) {
      const action = actionHistory.get(i);
      if (fields.indexOf('__all__') >= 0 || fields.indexOf(action.key) >= 0) {
        store = updateStore(store, action);
      }
      this.actionIndex++;
    }
    this.setState({
      store,
    });
  }
  // Rendering component passing store and method updateComponentStores in props.
  render() {
    const self = this;
    return (
      <self.MyComponent {...self.props} {...self.state} />
    );
  }
};
