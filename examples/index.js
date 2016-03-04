import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Component1 } from './components';
import { Component2 } from './components';
import { configureStore } from 'comst';

class App extends Component{
  render() {
    return (
      <div style={{padding: 30, border: '1px solid gray'}}>
        <div style={{fontSize: 20,fontWeight: 'bold'}}>
          <p>Example -  change to the app state initiated in any of the component will be reflected across the application.</p>
        </div>
        <p>ROOT COMPONENT</p>
        <div style={{marginBottom:20}}>This is current value of data1: {this.props.store.get('data1')}</div>
        <div style={{marginBottom:20}}>This is current value of data2: {this.props.store.get('data2')}</div>
        <Component2 />
      </div>
    )
  }
};

const ComposedApp = configureStore(['__all__'])(App);

ReactDOM.render(<ComposedApp/>, document.getElementById('react'));
