/* global expect */
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'enzyme';
import App from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Snapshot testing', () => {
  const component = render(<App />);
  expect(component).toMatchSnapshot();
});
