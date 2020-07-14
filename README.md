# Shady Button

Easy color shading for your buttons to make pretty hover & click events.

- No dependencies

- < 50kb package

- Dead simple to implement

__[See the DEMO](https://shady.benhonda.dev)__

**Note: This package is designed for use in React compliant projects.**

## TODO

- [ ] Create more effects (other than darken and lighten)

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
<ShadyButton backgroundColor="#FFCDD2">Hello, World</ShadyButton>
```

## Custom Attributes

Along with these you can also use any standard HTML Button element attribute (id, onClick, etc.). See the __[DEMO](https://shady.benhonda.dev)__ for example implementation.

| Attribute        |      Description      |  Type  |  Default |
|---------------|-------------|------|------|
| backgroundColor     |   the initial background color    | 6-character hex or RGB string |  "#DDDDDD" |
| mode     | lighten or darken the background color | String ("lighten" or "darken") | "lighten" |
| hoverShadeStrength |   the strength of shading on mouse over    | Number (scale from 0 to 1.4) |   0.44  |
| clickShadeStrength |   the strength of shading on mouse down    | Number (scale from 0 to 1.4) |   0.50  |

## Error Handling

Shady should never break your app. If an invalid attribute is given, Shady will output a descriptive error message in the console.