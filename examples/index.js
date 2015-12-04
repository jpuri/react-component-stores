import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Component1 from './components/component1';
import Component2 from './components/component2';
import { configureStore } from 'react-state';

@configureStore(['__all__'])
class App extends Component{
  render() {
    return (
      <div style={{padding: 50, border: '1px solid gray'}}>
        <p>ROOT COMPONENT</p>
        <div style={{marginBottom:20}}>This is current value of data1: {this.props.store.get('data1')}</div>
        <div style={{marginBottom:20}}>This is current value of data2: {this.props.store.get('data2')}</div>
        <Component1 />
        <Component2 />
      </div>
    )
  }
};

ReactDOM.render(<App/>, document.getElementById('react'));
