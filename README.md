# Darsh

Darsh comes out of my search for a perfect answer to state management in React applications. Some of its nice features:

1. The stores now belongs to the components, there is  no different store lying outside components in the application.
2. The store for the component is an immutable map of key-value pairs.
3. Each component declare what all data it needs in its store.
4. Any change to application state is done using method updateAppState(op, key, value).
   Store of all components who have declared to be using this 'key' will get updated. 'op' is the operation that will be done on the key.
5. All the operation ever done on app state are recorded sequentially. Thus its possible to retrieve back the store of any component at any given point.

# Example
The library is extremely simplified and also easy for use. All you need to do is annotate you components with the key for data that they need in the store. And the component will have in its props a store which will be an immutable map of these data.

```
@configureStore(['data1', 'data2'])
export default class Component1 extends Component {
  ...
};
```

Whenever application state is updated using `updateAppState(op, key, value)` and the key is 'data1' or 'data2' you component store will be updated.

### Influences
1. [OM](https://github.com/omcljs/om)
2. [Diatomic databases](http://www.datomic.com/about.html)

### License
MIT
