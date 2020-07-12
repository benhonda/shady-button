# Shady Button

Easy color shading for your buttons to make pretty hover & click events.

__[See the DEMO](https://shady.benhonda.dev)__

**Note: This package is designed for use in React compliant projects.**

## Install

Install with `npm` :

``` bash
npm install shady-button
```

Or with `yarn` :

``` bash
yarn add shady-button
```

## Usage

After installing, import `shady-button` into your project

``` js
// ES modules
import ShadyButton from 'shady-button';

// CommonJS
var ShadyButton = require('shady-button');
```

Then use `ShadyButton` like you would a normal `<button>` element. For example:

``` js
<ShadyButton defaultBackgroundColor = "#ffcdd2">Hello, World</ShadyButton>
```

### Custom Attributes

Along with these you can also use any standard HTML Button element attribute (id, onClick, etc.). See the __[DEMO](https://shady.benhonda.dev)__ for example implementation.

| Attribute        |      Description      |  Type  |  Default |
|---------------|-------------|------|------|
| backgroundColor     |   the initial background color    | hex or RGB string |  "#DDDDDD" |
| mode     | lighten or darken | String ("lighten" or "darken") | "lighten" |
| hoverShadeStrength |   the strength of shading on mouse over    | Number (scale from 0 to 100) |   4.0  |
| clickShadeStrength |   the strength of shading on mouse down    | Number (scale from 0 to 100) |   4.0  |
