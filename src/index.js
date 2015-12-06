import React, {Component} from 'react';
import Immutable from 'immutable';

// Collection of methods to update state of composing classes, and a counter to make unique keys in the collection.
let componentUpdateHooks = new Immutable.Map({});
let componentUpdateHookCounter=0;

// Collection of history of all actions in the application.
let actionHistory = new Immutable.List();

// The function is used to update app state of composing components.
export const updateAppState = function(actionType, key, value) {
  const action = {
    actionType: actionType,
    key: key,
    value: value
  };
  actionHistory = actionHistory.push(action)
  componentUpdateHooks.forEach(function(updateComponent) {
    updateComponent(action);
  })
}

// This method creates composed component.
// The higher order component has in its state store which it passes in props to composed component.
export var configureStore = (fields) => {
  return (component) => {
    class newComponent extends Component  {
      constructor(properties) {
        super(properties);
        this.hookIndex = componentUpdateHookCounter;
        componentUpdateHookCounter++;
        this.MyComponent = React.createFactory(component);
        this.state = {store: new Immutable.Map({})};
      }
      // When component is mount, its entry is added to collection componentUpdateHooks, actionIndex is reset to 0.
      componentWillMount() {
        this.actionIndex = 0;
        componentUpdateHooks = componentUpdateHooks.set(this.hookIndex, this.updateComponentStore.bind(this));
        this.initializeComponentStore();
      }
      // When component is unmount, its entry is removed from collection componentUpdateHooks.
      componentWillUnmount() {
        componentUpdateHooks = componentUpdateHooks.remove(this.hookIndex);
      }
      // The function will update the store, with the action instanec passed.
      updateComponentStore(action) {
        let store = this.state.store;
        store = this.executeAction(store, action);
        this.setState({
          store: store
        });
      }
      // This function will execute all action on actionHistory which are still not executed for this store.
      initializeComponentStore() {
        let store = this.state.store;
        for(let i = this.actionIndex;i < actionHistory.size;i++) {
          store = this.executeAction(store, actionHistory[i]);
          this.actionIndex++;
        }
        this.setState({
          store: store
        });
      }
      // Execute single action
      executeAction(store, action) {
        if(fields.indexOf('__all__') >= 0 || fields.indexOf(action.key) >= 0) {
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
        }
        return store;
      }
      // rendering component
      render() {
        return (
          <this.MyComponent {...this.props} store={this.state.store} updateAppState={updateAppState}/>
        );
      }
    };
    return newComponent;
  };
};
