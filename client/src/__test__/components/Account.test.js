/* global expect, beforeAll, afterAll */
import React from 'react';
import { shallow } from 'enzyme';
import Account from '../../components/Account';
import Modal from '../../components/Modal';

describe('<Account />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Account />);
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('renders successfully', () => {
    expect(wrapper.find('div.Account')).toHaveLength(1);
  });

  it('renders correct default page title', () => {
    expect(wrapper.find('div.page-title h3').text()).toEqual('Account');
  });

  it('renders correct signout link', () => {
    expect(wrapper.find('.sign-out').text()).toEqual('Sign out');
  });

  it('renders correct username', () => {
    expect(wrapper.find('.username').text()).toMatch(/^Hello.*/);
  });

  it('renders correct number of tabs', () => {
    expect(wrapper.find('.tabs-wrapper').children()).toHaveLength(2);
  });

  it('renders correct record icon', () => {
    expect(wrapper.find('.record-icon').hasClass('recording')).toBeFalsy();
    wrapper.setState({ recording: true });
    expect(wrapper.find('.record-icon').hasClass('recording')).toBeTruthy();
  });

  it('renders list of transcripts correctly after state changed', () => {
    expect(wrapper.find('.previous-transcripts')).toHaveLength(0);
    wrapper.setState({ transcripts: [{ _id: 'text', date: 416634494179 }] });
    expect(wrapper.find('.previous-transcripts')).toHaveLength(1);
  });

  it('Modal existence before and after state changed', () => {
    expect(wrapper.find(Modal)).toHaveLength(0);
    wrapper.setState({
      showModal: true,
      modalTitle: '',
      modalText: '',
    });
    expect(wrapper.find(Modal)).toHaveLength(1);
  });

  it('Punctuation changes after switcher clicked', () => {
    const switcher = wrapper.find('.switcher');
    expect(wrapper.state().punctuation).toBeTruthy();
    switcher.simulate('click', {
      target: {
        classList: {
          toggle: () => null,
          contains: () => null,
        }
      },
      preventDefault: () => null, // Mock ev.preventDefault()
    });
    expect(wrapper.state().punctuation).toBeFalsy();
  });
});
