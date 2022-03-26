# PostCSS Class Name Shortener

[![CI](https://github.com/mbrandau/postcss-class-name-shortener/actions/workflows/main.yml/badge.svg)](https://github.com/mbrandau/postcss-class-name-shortener/actions/workflows/main.yml) [![npm](https://img.shields.io/npm/v/postcss-class-name-shortener.svg)](https://www.npmjs.com/package/postcss-class-name-shortener) [![npm](https://img.shields.io/npm/dt/postcss-class-name-shortener.svg)](https://www.npmjs.com/package/postcss-class-name-shortener) [![GitHub issues](https://img.shields.io/github/issues/mbrandau/postcss-class-name-shortener.svg)](https://github.com/mbrandau/postcss-class-name-shortener/issues)

[PostCSS] plugin that shortens CSS class names to optimize website performance.

The plugin will produce an object with all mapped class names and return it via the callback.

[postcss]: https://github.com/postcss/postcss

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

This plugin uses [css-shortener](https://github.com/mbrandau/css-shortener) under the hood.

## Usage

```bash
npm install --save postcss-class-name-shortener
```

```js
const classNameShortener = require('postcss-class-name-shortener');
const fs = require('fs');

postcss([
  [
    'postcss-class-name-shortener',
    {
      outputMapCallback: map => {
        console.log(JSON.stringify(map));
        // You can return a promise
        return new Promise((resolve, reject) => {
          fs.writeFile('cssMap.json', JSON.stringify(map), err => {
            if(err) reject(err);
            else resolve();
          });
        })
      }
      // Optionally disable shorting of class names in dev environment
      disable: process.env.NODE_ENV === 'development'
    }
  ]
])
```

The `map` object will look like this:

```json
{
  "long-class-name-that-just-sets-the-text-color-to-black": "a"
}
```

## Options

See [PostCSS] docs for examples for your environment.
