const postcss = require('postcss'),
    CssShortener = require('css-shortener'),
    parser = require('postcss-selector-parser');

module.exports = postcss.plugin(
    'postcss-class-name-shortener',
    function (opts) {
        opts = opts || {};
        // Check if callback is present in options object
        if (typeof opts.callback !== 'function' && !opts.cssShortener)
            throw new Error(
                'A callback is required to return the mapped class names'
            );

        const shortener = opts.cssShortener || new CssShortener();
        const processor = parser(selectors => {
            selectors.walkClasses(classNode => {
                classNode.value = shortener.getNewClassName(classNode.value);
            });
        });

        return function (root) {
            root.walkRules(ruleNode => {
                return processor.process(ruleNode);
            });

            // Return mapped class names to callback if present
            if (opts.callback) return opts.callback(shortener.getMap());
            return undefined;
        };
    });
