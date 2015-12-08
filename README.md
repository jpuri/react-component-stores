# Darsh

Darsh comes out of our search for a perfect answer to state management in React applications. Darsh handles application state in much different way than the frameworks like flux/redux. Each component has its own store which is an immutable map of key value pairs. Each component declares what it needs in its store.

An action to change application state can be initiated in any component. An action is like a tuple (actionType, key, value). Initiating an action will result in updating the stores of all the components which have declared to be using 'key'. 'actionType' can be like : NEW, REMOVE, APPEND, DELETE (and more to be added).

In addition a history of all the actions ever executed in application is maintained, so its very easy to reconstruct store for any component or even entire application state any any point in time.

Summarizing features:

1. Stores belongs to the components :)
2. The store for the component is an immutable map of key-value pairs.
3. Each component declare what all data it needs in its store.
4. Any change to application state is done using method updateAppState(actionType, key, value). Its will result in change in store of all component which have declared to be using data with this 'key'.
5. All the actions ever done on application state are recorded sequentially.

# Example
The library is extremely simplified and also easy for use. All you need to do is annotate you components with the key for data that they need in the store. And the component will have in its props a store which will be an immutable map of this data.

```
@configureStore(['data1', 'data2'])
export default class Component1 extends Component {
  ...
};
```

Any change to application state should be done using api method `updateAppState(actionType, key, value)`. In given example if `updateAppState` is called using key as `data1` or `data2` the component store will get updated.

### Influences
1. [OM](https://github.com/omcljs/om)
2. [Datomic databases](http://www.datomic.com/about.html)
3. [Flux](https://facebook.github.io/flux/docs/overview.html)
4. [Redux](http://redux.js.org/)

### License
MIT
