import React, { Component } from 'react';
import { configureStore } from 'comst';
import { updateComponentStores } from 'comst';

export default class Component2 extends Component {
  setData1 = function(event) {
    updateComponentStores('NEW', 'data1', event.target.value);
  }
  render() {
    return (
      <div style={{padding: 30, border: '1px solid gray'}}>
        <p>CHILD COMPONENT-2</p>
        <div style={{marginBottom: 20}}>Enter some value for data1: <input onChange={ ::this.setData1 }/></div>
        <div>This is current value of data2: {this.props.store.get('data2')}</div>
      </div>
    );
  }
};
