# PostCSS Class Name Shortener
[![Build Status](https://img.shields.io/travis/mbrandau/postcss-class-name-shortener.svg)](https://travis-ci.org/mbrandau/postcss-class-name-shortener) [![Coverage Status](https://img.shields.io/coveralls/github/mbrandau/postcss-class-name-shortener.svg)](https://coveralls.io/github/mbrandau/postcss-class-name-shortener?branch=master) [![npm](https://img.shields.io/npm/v/postcss-class-name-shortener.svg)](https://www.npmjs.com/package/postcss-class-name-shortener) [![npm](https://img.shields.io/npm/dt/postcss-class-name-shortener.svg)](https://www.npmjs.com/package/postcss-class-name-shortener) [![GitHub issues](https://img.shields.io/github/issues/mbrandau/postcss-class-name-shortener.svg)](https://github.com/mbrandau/postcss-class-name-shortener/issues)

[PostCSS] plugin that shortens CSS class names to optimize website performance.

The plugin will produce an object with all mapped class names and return it via the callback.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/mbrandau/postcss-class-name-shortener.svg
[ci]:      https://travis-ci.org/mbrandau/postcss-class-name-shortener

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
postcss([ require('postcss-class-name-shortener', {
    // Setting the callback option is mandatory
    callback: map => {
        console.log(JSON.stringify(map));
    }
}) ])
```
```json
{
  "long-class-name-that-just-sets-the-text-color-to-black": "a",
}
```

See [PostCSS] docs for examples for your environment.
