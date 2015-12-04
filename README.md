# react-state

react-state comes out of my search for a perfect answer to state management in React applications. Some nice features of react-state:

1. The stores now belongs to the components, there is  no different store lying outside components in the application.
2. Each component declare what all data it needs in its store.
3. Any change to application state is done using method updateAppState.
4. All updates to application state are recorded and store for any component can be reconstructed at any point using these updates.

### Influences
1. [OM](https://github.com/omcljs/om)
2. [Diatomic databases](http://www.datomic.com/about.html)

### License
MIT
