# PostCSS Class Name Shortener [![Build Status][ci-img]][ci]

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
