/* global expect */
import { languages } from '../../utils/languages';

describe('utils/languages', () => {
  it('contains correct number of languages', () => {
    expect(Array.isArray(languages)).toBe(true);
    expect(languages).toHaveLength(119);
  });

  it('English (US) and German should appear only once', () => {
    expect(languages.filter(language => language.id === 'en-US')).toHaveLength(1);
    expect(languages.filter(language => language.id === 'de-DE')).toHaveLength(1);
  });

  it('All languages should have id and name', () => {
    languages.forEach((language) => {
      expect(language).toHaveProperty('id');
      expect(language).toHaveProperty('name');
    });
  });
});
