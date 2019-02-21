/* global expect, jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Modal from '../../components/Modal';

describe('<Modal />', () => {
  it('renders successfully', () => {
    const wrapper = shallow(<Modal
      onClose={() => null}
      title=""
      text=""
    />);
    expect(wrapper.find('h3')).toHaveLength(1);
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('renders correct title and text', () => {
    const wrapper = mount(<Modal
      onClose={() => null}
      title="Test title"
      text="Test text"
    />);
    expect(wrapper.find('h3').text()).toEqual('Test title');
    expect(wrapper.find('p').text()).toEqual('Test text');
    expect(wrapper.find('button').text()).toEqual('Close');
  });

  it('Prop onClose is called when close button is clicked', () => {
    const onCloseClicked = jest.fn();
    const wrapper = shallow(<Modal
      onClose={onCloseClicked}
      title=""
      text=""
    />);
    expect(wrapper.find('button')).toHaveLength(1);
    wrapper.find('button').simulate('click');
    expect(onCloseClicked.mock.calls.length).toBe(1);
  });
});
