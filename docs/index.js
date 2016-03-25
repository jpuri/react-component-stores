import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Component1 } from './components';
import { Component2 } from './components';
import { configureStore } from 'comst';
import normalize from './css/normalize.min.css';

class App extends Component{
  render() {
    return (
      <div style={ styles.root }>
        <div style={ styles.header }>
          <span style={ styles.title }>Comst - </span>
          <span style={ styles.titleText }>Component Stores</span>
        </div>
        <div style={ styles.body }>
          <div>
            Comst is a JavaScript library which I made for application state management in my react projects.
            I am making it an open-source so that more developers can look at my ideas and utilize them and provide valuable feedbacks.
            <div style={ styles.heading }>Thoughts behind Comst</div>
            <p style={ styles.paragraph }>React components are made for a hierarchical world. But every concern of a frontend application is not hierarchical for instance
            the data model for the application is often not hierarchical, more often its graphical with interdependencies between components.
            Thus as applications grow in size they have a state shared between unrelated components. Thus comes the challenge of application
            state management for frontend applications.</p>
            <p style={ styles.paragraph }>Flux is a pattern that significantly simplifies app state management, relay/OM is also another really nice approach which I
            would definitely prefer for bigger projects.</p>
            <p style={ styles.paragraph }>I had a couple of nice thoughts about application state management:</p>

            <p style={ styles.paragraph }>Frontend application state management should be more simplified.</p>
            <ul style={ styles.list }>
              <li>Store should belong to the component, I am not impressed by the idea of store away from components from which components get data.</li>
              <li>Storing events rather than state is better way to manage state, using events we can derive state at any point.</li>
              <li>Thus I wrote this small, simplified yet powerful library Comst and I use it in my React applications for state management.
              Comst derive its name from component-stores its is essentially a flavor of Flux.</li>
            </ul>
          </div>
          <div style={{fontSize: 20,fontWeight: 'bold'}}>
            <p>Example -  change to the app state initiated in any of the component will be reflected across the application.</p>
          </div>
          <p>ROOT COMPONENT</p>
          <div style={{marginBottom:20}}>This is current value of data1: {this.props.store.get('data1')}</div>
          <div style={{marginBottom:20}}>This is current value of data2: {this.props.store.get('data2')}</div>
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
    margin: '25px 0 10px'
  },
  list: {
    listStyleType: 'decimal'
  }
}
const ComposedApp = configureStore(['__all__'])(App);

ReactDOM.render(<ComposedApp/>, document.getElementById('react'));
