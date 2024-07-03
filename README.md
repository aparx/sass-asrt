**aparx's sass-asrt**

A simple error, assertion and type utility library for Sass.

![license](https://badgen.net/badge/license/MIT/blue) ![release](https://badgen.net/github/release/zvint/sass-asrt)

## Introduction
Sass is a relatively small but really powerful CSS preprocessor that 
allows us to create complex styling using reusable code. At a certain
point projects get bigger and bigger, where we need to assure that we
use correct types and parameters.

**sass-asrt** provides you a bunch of, mostly type, utilities and assertions that 
you can use to validate parameters and the environment. It also adds custom error 
handling, so you can define how your errors should be handled.

The entire library is done using this guide:
https://aparx.github.io/sass-style-guide/


You can find the sassdocs here: https://aparx.github.io/sass-asrt/


## Installation
```bash
npm install sass-asrt
```

## Examples
Very basic example:
```scss
// _some_mixins.scss
@use "../node-modules/sass-asrt" as asrt;

@mixin style-background($background, $foreground) {
  // we can assert a certain type
  background: asrt.check-is-color($background);
  @if (asrt.get-is-color($foreground)) {
    // $foreground is ensured to be a color
    color: $foreground; 
  }
}
```

We can also add custom handlers to assertions, that are functions
associated to a certain name in a global register.
```scss
@use "sass:meta";
@use "../node-modules/sass-asrt" as asrt;

// _handlers.scss
@function foo-bar-handler($errorMessage) {
  @error "Do custom logic with #{$errorMessage}";
}

@at-root {
  // we add a custom handler that we can reference in any assertion
  $_: asrt.throw-handler-add('foo-bar', meta.get-function(foo-bar-handler));
}

// _some_mixins.scss
@mixin style-background($bg, $fg) {
  background: asrt.check-is-color($bg, "not a color", 'foo-bar');
  //                                   ^ message      ^ handler
}

// page.scss
.background {
  @include style-background("notAColor", rgba(255, 200, 164));
  // ^ Error: "Do custom logic with not a color"
}
```

There is a ton more, just have a look into the docs!
