const postcss = require('postcss'),
    CssShortener = require('css-shortener'),
    plugin = require('./');

function callback(expectedMap) {
    return function (map) {
        expect(map).toEqual(expectedMap);
    };
}

function run(input, expectedOutput, options) {
    return postcss([plugin(options)]).process(input)
        .then(result => {
            expect(result.css).toEqual(expectedOutput);
            expect(result.warnings().length).toBe(0);
            return result;
        });
}

describe('tests', () => {
    it('replaces class name', () => {
        return run('.test{ }', '.a{ }', { callback: callback({ test: 'a' }) });
    });
    it('throws error when callback is not present', () => {
        expect(
            () => postcss([plugin()]).process('.test{}')
        ).toThrowError(
            /^A callback is required to return the mapped class names$/
        );
    });
    it('uses custom CssShortener',
        () => {
            const shortener = new CssShortener();
            return run('.test{ }', '.a{ }', { cssShortener: shortener })
                .then(() => {
                    expect(shortener.getMap()).toEqual({ test: 'a' });
                });
        }
    );
});
