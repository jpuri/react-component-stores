import React, { Component } from 'react';
import { configureStore } from 'react-component-store';

export default class Component10 extends Component {
  render() {
    return (
      <div style={{padding: 30, border: '1px solid gray'}}>
        <p>CHILD OF CHILD COMPONENT-1 (Dumb component)</p>
        <div>This is current value of data1: {this.props.data1}</div>
      </div>
    );
  }
};
