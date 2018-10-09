const postcss = require('postcss'),
    CssShortener = require('css-shortener'),
    parser = require('postcss-selector-parser');

const CLASS_NAME_REGEX = /\.([a-zA-Z_-][\w-_]*)/g;

module.exports = postcss.plugin(
    'postcss-class-name-shortener',
    function (opts) {
        // Check if callback is present in options object
        if (typeof opts.callback !== 'function')
            throw new Error(
                'A callback is required to return the mapped class names'
            );

        const shortener = new CssShortener();
        const processor = parser(selectors => {
            selectors.walkClasses(classNode => {
                classNode.value = shortener.getNewClassName(classNode.value);
            });
        });

        return function (root, result) {
            root.walkRules(ruleNode => {
                return processor.process(ruleNode);
            });

            // Return mapped class names to callback
            return opts.callback(shortener.getMap());
        };
    });
