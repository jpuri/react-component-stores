# Comst

React components are made for a hierarchical world. But every concern of a frontend application is not hierarchical for instance the data model for the application is often not hierarchical, more often its graphical with interdependencies between components. Thus as applications grow in size they have a state shared between unrelated components. Thus comes the challenge of application state management for frontend applications.

Flux is a pattern that significantly simplifies app state management, relay/OM is also another really nice approach which I would definitely prefer for bigger projects.

I had a couple of nice thoughts about application state management:

1. Frontend application state management should be more simplified.
2. Store should belong to the component, I am not impressed by the idea of store away from components from which components get data.
3. Storing events rather than state is better way to manage state, using events we can derive state at any point.

Thus I wrote this small, simplified yet powerful library Comst and I use it in my React applications for state management. Comst derive its name from component-stores its is essentially a flavor of Flux.

## Features of Comst

1. Stores belongs to the components :)
2. The store for the component is an immutable map of key-value pairs.
3. Each component declare what all data it needs in its store.
4. Stores of all the components in the application can be updated using the method call `updateComponentStores(actionType, key, value)`. This can be called from any component and will update the store of all component which have declared to be using data with the given 'key'.
5. All the actions ever done are recorded sequentially.

## How Comst Works

Comst is a much simplified Library and its functioning can be explained as:

1. Components can declare to have its own store which is an immutable map. The store will be passed to the component in its props. They can access store like `props.store.get('data_key')`.
2. If there is an change in application state initiated in a component which is required to be know to an unrelated components in application the component can call the method of Comst library `updateComponentStores`, and it will update the stores of all the components which have declared to be using that data.
Method `updateComponentStores` supports following operations:
    1. NEW
    2. DELETE
    3. LIST_ADD
    4. LIST_REMOVE
    5. MAP_ADD
    6. MAP_REMOVE
    7. FLUSH
3. It may happen that a component come into picture much later in the life cycle of the application, thus we need to be able to construct the store for that component. For this purpose Comst maintains the log of all the calls ever made to `updateComponentStores`. Thus the store for any component can be reconstructed at any point in time.

## Example
The library is extremely simplified and also easy for use.

```
@configureStore(['data1', 'data2'])
export default class Component1 extends Component {
  ...
};
```

Any change to data should be done using api method `updateComponentStores(actionType, key, value)`. In given example if `updateComponentStores` is called using key as `data1` or `data2` the component store will get updated.

### Influences
1. [OM](https://github.com/omcljs/om)
2. [Datomic databases](http://www.datomic.com/about.html)
3. [Flux](https://facebook.github.io/flux/docs/overview.html)
4. [Relay](https://facebook.github.io/relay/)

### License
MIT
