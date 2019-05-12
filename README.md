# PageSpin

Spins your page (yeah, really).

![PageSpin](pagespin.gif)

## Usage

Instanciate the `PageSpin` object passing it the content to be replaced and then call the `loadPage()` method. It takes two arguments:

1. one of the `PREVIOUS` or `NEXT` constant
2. the new content

## Example

```javascript
import './pagespin/pagespin.scss';

const
    PageSpin = require('./pagespin/pagespin'),
    pageSpin = new PageSpin(currentElement)
;

pageSpin.loadPage(
    pageSpin.PREVIOUS || pageSpin.NEXT,
    nextElement
);
```

## Reference

This work is based on the ["Cube"](https://3dtransforms.desandro.com/cube) chapter of [David DeSandro](https://desandro.com/)'s
["Intro to CSS 3D transforms"](https://3dtransforms.desandro.com/).
