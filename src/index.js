import React, {Component} from 'react';
import Immutable from 'immutable';

// Collection of methods to update state of composing classes, and a counter to make unique keys in the collection.
let componentUpdateHooks = new Immutable.Map({});
let componentUpdateHookCounter=0;

// Collection of history of all operations in the app.
let opHistory = new Immutable.List();

// The function is used to update app state of composing components.
export const updateAppState = function(op, key, value) {
  opHistory = opHistory.push({
    op: op,
    key: key,
    value: value
  })
  componentUpdateHooks.forEach(function(updateHook) {
    updateHook();
  })
}

// This method creates composed component.
// The higher order component has in its state store which it passes in props to composed component.
export var configureStore = (fields) => {
  return (component) => {
    class newComponent extends Component  {
      // initialize state with an empty store
      constructor(properties) {
        super(properties);
        this.hookIndex = componentUpdateHookCounter;
        componentUpdateHookCounter++;
        this.state = { store: new Immutable.Map({}) };
        // I am not sure how can I get rid of this line :(
        this.MyComponent = React.createFactory(component);
      }
      // When component is mount, the opCounter is reset to 0 and update method is added to collection componentUpdateHooks.
      componentDidMount() {
        this.opCounter = 0;
        componentUpdateHooks = componentUpdateHooks.set(this.hookIndex, this.updateComponentStore.bind(this));
        this.updateComponentStore();
      }
      // When component is unmount, its entry is removed from collection componentUpdateHooks.
      componentWillUnmount() {
        componentUpdateHooks = componentUpdateHooks.remove(this.hookIndex);
      }
      // The function will update the store.
      // It will execute all operation on opHistory which are still not executed for this store.
      updateComponentStore() {
        let store = this.state.store;
        for(let i = this.opCounter;i < opHistory.size;i++) {
          const op = opHistory.get(i);
          this.opCounter++;
          if(fields.indexOf('__all__') >= 0 || fields.indexOf(op.key) >= 0) {
            if(op.op === 'NEW') {
              // NEW is for new field added to app state
              store = store.set(op.key, op.value);
            } else if(op.op === 'REMOVE') {
              // REMOVE is for field removed from app state
              store = store.remove(op.key);
            } else if(op.op === 'APPEND') {
              // APPEND is for new value added to existing list
              let list = store.get(op.key);
              list = list.append(op.value);
              store = store.set(op.key, list);
            } else if(op.op === 'DELETE') {
              // DELETE_KEY is for value to be removed from existing list
              let list = store.get(op.key);
              list = list.remove(op.value);
              store = store.set(op.key, list);
            }
          }
        };
        this.setState({
          store: store
        });
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
