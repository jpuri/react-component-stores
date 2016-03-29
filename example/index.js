import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Component1 } from './components';
import { Component2 } from './components';
import { configureStore } from 'react-component-store';
import normalize from './css/normalize.min.css';

class App extends Component{
  render() {
    return (
      <div style={ styles.root }>
        <div style={ styles.header }>
          <span style={ styles.title }>react-component-store - </span>
          <span style={ styles.titleText }>Component Stores</span>
        </div>
        <div style={ styles.body }>
          <div style={{fontSize: 20,fontWeight: 'bold'}}>
            <p>
              Example -  change to the app state initiated in any of
              the component will be reflected across the application.
            </p>
          </div>
          <p>ROOT COMPONENT</p>
          <div style={{ marginBottom: 20 }}>
            This is current value of data1:
            { this.props.store.get('data1') }
          </div>
          <div style={{ marginBottom: 20 }}>
            This is current value of data2: { this.props.store.get('data2') }
          </div>
          <Component1 />
          <Component2 />
        </div>
      </div>
    )
  }
};

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
  },
  header: {
    height: 75,
    backgroundColor: '#bc436c',
    color: '#e1e1cb',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontStyle: 'italic',
    marginLeft: 20,
  },
  titleText: {
    fontSize: 18,
    fontStyle: 'italic',
    marginLeft: 10,
  },
  body: {
    backgroundColor: '#e1e1cb',
    color: '#bc436c',
    padding: 20,
    lineHeight: '1.2',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    margin: '20px 0 15px',
  },
  paragraph: {
    margin: '25px 0 10px',
  },
  list: {
    listStyleType: 'decimal',
  },
};

const ComposedApp = configureStore(['__all__'])(App);

ReactDOM.render(<ComposedApp/>, document.getElementById('react') );
