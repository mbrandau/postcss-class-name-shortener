import postcss from 'postcss';
import { CssShortener } from 'css-shortener';
import plugin from '../src';
import { ClassNameMap } from 'css-shortener';

function buildExpectMapCallback(expectedMap: ClassNameMap) {
  return function(map: ClassNameMap) {
    expect(map).toEqual(expectedMap);
  };
}

function run(input: string, expectedOutput: string, options: any) {
  return postcss([plugin(options)])
    .process(input, { from: undefined })
    .then(result => {
      expect(result.css).toEqual(expectedOutput);
      expect(result.warnings().length).toBe(0);
      return result;
    });
}

describe('tests', () => {
  it('replaces class name', () => {
    return run('.test{ }', '.a{ }', {
      outputMapCallback: buildExpectMapCallback({ test: 'a' }),
    });
  });
  it('does nothing when disabled', () => {
    return run('.test{ }', '.test{ }', {
      disable: true,
      outputMapCallback: buildExpectMapCallback({}),
    });
  });
  it('uses custom CssShortener', () => {
    const shortener = new CssShortener();
    shortener.importMap({ test: 'b' });
    return run('.test{ } .test2{ } .test3{ }', '.b{ } .a{ } .c{ }', {
      cssShortener: shortener,
    }).then(() => {
      expect(shortener.map).toEqual({ test: 'b', test2: 'a', test3: 'c' });
    });
  });
  it('does not replace class names in except option via string', () => {
    return run('.test{ }', '.test{ }', { expect: ['test'] });
  });
  it('does not replace class names in except option via RegExp', () => {
    return run('.test{ }', '.test{ }', { expect: [/test/] });
  });
});
