# PostCSS Class Name Shortener
[![Build Status](https://img.shields.io/travis/com/mbrandau/postcss-class-name-shortener/master.svg)](https://travis-ci.com/mbrandau/postcss-class-name-shortener) [![Coverage Status](https://img.shields.io/coveralls/github/mbrandau/postcss-class-name-shortener.svg)](https://coveralls.io/github/mbrandau/postcss-class-name-shortener?branch=master) [![npm](https://img.shields.io/npm/v/postcss-class-name-shortener.svg)](https://www.npmjs.com/package/postcss-class-name-shortener) [![npm](https://img.shields.io/npm/dt/postcss-class-name-shortener.svg)](https://www.npmjs.com/package/postcss-class-name-shortener) [![GitHub issues](https://img.shields.io/github/issues/mbrandau/postcss-class-name-shortener.svg)](https://github.com/mbrandau/postcss-class-name-shortener/issues)

[PostCSS] plugin that shortens CSS class names to optimize website performance.

The plugin will produce an object with all mapped class names and return it via the callback.

[PostCSS]: https://github.com/postcss/postcss

```css
// INPUT
.long-class-name-that-just-sets-the-text-color-to-black {
    color: black;
}
```

```css
// OUTPUT
.a {
    color: black;
}
```

## Usage

```bash
npm install --save postcss-class-name-shortener
```

```js
const classNameShortener = require('postcss-class-name-shortener');
const fs = require('fs');

postcss([ classNameShortener({
    // Setting the callback option is mandatory
    callback: map => {
        console.log(JSON.stringify(map));
        
        // You can return a promise
        return new Promise(((resolve, reject) => {
            fs.writeFile('map.json', JSON.stringify(map), err => {
                if(err) reject(err);
                else resolve();
            });
        }))
    }
}) ])
```

The `map` object will look like this:
```json
{
  "long-class-name-that-just-sets-the-text-color-to-black": "a",
}
```

[css-shortener](https://github.com/mbrandau/css-shortener) lets you import the `map` object and replace the classes in HTML code.  
See [PostCSS] docs for examples for your environment.
