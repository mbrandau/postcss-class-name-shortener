const postcss = require('postcss'),
    plugin = require('./');

function run(input, expectedOutput, expectedMap) {
    const callback = map => {
        expect(map).toEqual(expectedMap);
    };
    return postcss([plugin({ callback })]).process(input)
        .then(result => {
            expect(result.css).toEqual(expectedOutput);
            expect(result.warnings().length).toBe(0);
        });
}

it('replaces class name', () => {
    return run('.test{ }', '.a{ }', { test: 'a' });
});
it('throws error when callback is not present', () => {
    expect(
        () => postcss([plugin()]).process('.test{}')
    ).toThrowError(/^A callback is required to return the mapped class names$/);
});
