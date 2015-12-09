import React, { Component } from 'react';
import { configureStore } from 'react-state';
import Component10 from './component10';

@configureStore(['data1'])
export default class Component1 extends Component {
  setData2 = function(event) {
    this.props.updateAppState('NEW', 'data2', event.target.value);
  }
  render() {
    return (
      <div style={{padding: 30, border: '1px solid gray'}}>
        <p>CHILD COMPONENT-1</p>
        <div style={{marginBottom: 20}}>Enter some value for data2: <input onChange={ ::this.setData2 }/></div>
        <div>This is current value of data1: {this.props.store.get('data1')}</div>
        <Component10 data1={this.props.store.get('data1')}/>
      </div>
    );
  }
};
