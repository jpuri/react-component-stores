import Component1 from './component1';
import Component2 from './component2';
import Component10 from './component10';
import { configureStore } from 'comst';

module.exports = {
  Component1: configureStore(['data1'])(Component1),
  Component2: configureStore(['data2'])(Component2),
  Component10,
};
