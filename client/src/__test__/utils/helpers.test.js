/* global expect */
import { toTime } from '../../utils/helpers';

describe('utils/helpers', () => {
  it('toTime(0)', () => {
    expect(toTime(0)).toEqual('00:00');
  });

  it('toTime(3600)', () => {
    expect(toTime(3600)).toEqual('60:00');
  });

  it('toTime(60)', () => {
    expect(toTime(60)).toEqual('01:00');
  });

  it('toTime(59)', () => {
    expect(toTime(59)).toEqual('00:59');
  });

  it('invalid seconds', () => {
    expect(toTime(-1)).toEqual('--:--');
    expect(toTime(3601)).toEqual('--:--');
  });
});
