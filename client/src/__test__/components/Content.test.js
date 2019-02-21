/* global expect, beforeAll, afterAll, jest */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import Content from '../../components/Content';
import LogIn from '../../components/LogIn';
import Account from '../../components/Account';
import { isDeviceActivated } from '../../utils/apis';

describe('<Content /> before rendering', () => {
  it('renders three <Route />', () => {
    const wrapper = shallow(<Content />);
    expect(wrapper.find(Route)).toHaveLength(3);
    wrapper.unmount();
  });
});

jest.mock('../../utils/apis', () => ({
  isDeviceActivated: jest.fn(),
}));

describe('<Content /> after rendering', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<Content />);
  });

  afterAll(() => {
    jest.unmock('../../utils/apis');
    wrapper.unmount();
  });

  it('renders one <Route /> instead of three', () => {
    expect(wrapper.find(Route)).toHaveLength(1);
  });

  it('Make sure isDeviceActivated gets called when rendering <Content />', () => {
    expect(isDeviceActivated.mock.calls.length).toBe(1);
  });

  it('renders correct default route', () => {
    expect(location.hash).toEqual('#/login');
    expect(wrapper.find(LogIn)).toHaveLength(1);
    expect(wrapper.find(Account)).toHaveLength(0);
  });
});
