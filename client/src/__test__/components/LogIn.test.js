/* global expect, beforeAll, afterAll */
import React from 'react';
import { shallow } from 'enzyme';
import LogIn from '../../components/LogIn';

describe('<LogIn />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<LogIn />);
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('renders successfully', () => {
    expect(wrapper.find('div.LogIn')).toHaveLength(1);
  });

  it('renders correct default page title', () => {
    expect(wrapper.find('div.page-title').text()).toEqual('Login');
  });

  it('renders correct default number of inputs (email, password, submit)', () => {
    expect(wrapper.find('input')).toHaveLength(3);
  });

  it('click on the link-button toggle LogIn / Register', () => {
    wrapper.find('.link-button').simulate('click', {
      preventDefault: () => null, // Mock ev.preventDefault()
    });
    expect(wrapper.find('div.page-title').text()).toEqual('Register');
    expect(wrapper.find('input')).toHaveLength(4); // name, email, password, submit
  });
});
