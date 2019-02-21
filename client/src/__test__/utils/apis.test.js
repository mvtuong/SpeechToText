/* eslint-disable compat/compat */
/* global jest, expect */
import React from 'react';
import { shallow, mount } from 'enzyme';
import LogIn from '../../components/LogIn';
import Account from '../../components/Account';
import Modal from '../../components/Modal';
import { getUserInfo, logoutUser, getTranscript, registerUser, loginUser } from '../../utils/apis';

jest.mock('../../utils/apis', () => ({
  getUserInfo: jest.fn(),
  logoutUser: jest.fn(),
  getTranscript: jest.fn(),
  registerUser: jest.fn(),
  loginUser: jest.fn(),
}));

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe('Account component', () => {
  describe('getUserInfo', () => {
    it('should get user info successfully', async () => {
      const data = {
        name: 'Test',
        transcripts: [
          {
            _id: 1,
            date: 1540700239735,
          },
          {
            _id: 2,
            date: 1540700239736,
          }
        ],
      };
      getUserInfo.mockImplementationOnce(() => Promise.resolve({ data }));
      const wrapper = shallow(<Account />);
      await flushPromises(); // Wait to state to be updated
      expect(wrapper.find('.username span').text()).toEqual('Test');
      expect(wrapper.find('.previous-transcripts')).toHaveLength(1);
      expect(wrapper.find('ul').children()).toHaveLength(2);
      expect(wrapper.find(Modal)).toHaveLength(0); // Expect modal is not showing
    });

    it('should show modal with error', async () => {
      getUserInfo.mockImplementationOnce(() => Promise.reject(new Error('error')));
      const wrapper = shallow(<Account />);
      await flushPromises();
      expect(logoutUser.mock.calls.length).toBe(1); // Expect logoutUser to have been called
      expect(wrapper.find(Modal)).toHaveLength(1); // Expect modal is shown with error
    });
  });

  describe('getTranscript', () => {
    beforeEach(() => {
      const data = {
        name: 'Test',
        transcripts: [
          {
            _id: 1,
            date: 1540700239735,
          },
          {
            _id: 2,
            date: 1540700239736,
          }
        ],
      };

      getUserInfo.mockImplementationOnce(() => Promise.resolve({ data }));
    });

    it('should get transcript info successfully', async () => {
      const data = {
        transcript: {
          date: 1540700239735,
          text: 'Hello. How are you doing ?'
        },
      };
      getTranscript.mockImplementationOnce(() => Promise.resolve({ data }));
      const wrapper = mount(<Account />);
      wrapper.instance().transcriptItemClicked({
        preventDefault: () => null, // Mock ev.preventDefault()
        target: {
          dataset: {
            id: 1,
          }
        }
      });
      await flushPromises(); // Wait to state to be updated
      wrapper.update();
      expect(wrapper.find('.modal-main p').text()).toEqual('Hello. How are you doing ?');
      wrapper.unmount();
    });

    it('should show modal with error', async () => {
      const response = {
        data: ['Failed to authenticate token'],
      };
      // eslint-disable-next-line prefer-promise-reject-errors
      getTranscript.mockImplementationOnce(() => Promise.reject({ response }));
      const wrapper = mount(<Account />);
      wrapper.instance().transcriptItemClicked({
        preventDefault: () => null, // Mock ev.preventDefault()
        target: {
          dataset: {
            id: 1,
          }
        }
      });
      await flushPromises(); // Wait to state to be updated
      wrapper.update();
      expect(wrapper.find('.modal-main p').text()).toEqual('Failed to authenticate token');
      wrapper.unmount();
    });
  });

  describe('loginUser', () => {
    it('should call loginUser with correct params', async () => {
      loginUser.mockImplementationOnce(() => Promise.resolve(true));
      const wrapper = shallow(<LogIn />);
      wrapper.find('input[type="email"]').simulate('change', { target: { value: 'test@example.com' } });
      wrapper.find('input[type="password"]').simulate('change', { target: { value: 'PASSWORD' } });
      wrapper.find('form').simulate('submit', { preventDefault: () => null });
      await flushPromises(); // Wait to state to be updated
      expect(loginUser).toHaveBeenCalledWith({ email: 'test@example.com', password: 'PASSWORD' });
    });
  });

  describe('registerUser', () => {
    it('should call registerUser with correct params', async () => {
      registerUser.mockImplementationOnce(() => Promise.resolve(true));
      const wrapper = shallow(<LogIn />);
      // Switch to register mode
      wrapper.find('.link-button').simulate('click', { preventDefault: () => null });
      wrapper.find('input[type="text"]').simulate('change', { target: { value: 'Test Name' } });
      wrapper.find('input[type="email"]').simulate('change', { target: { value: 'test@example.com' } });
      wrapper.find('input[type="password"]').simulate('change', { target: { value: 'PASSWORD' } });
      wrapper.find('form').simulate('submit', { preventDefault: () => null });
      await flushPromises(); // Wait to state to be updated
      expect(registerUser).toHaveBeenCalledWith({ name: 'Test Name', email: 'test@example.com', password: 'PASSWORD' });
    });
  });
});
