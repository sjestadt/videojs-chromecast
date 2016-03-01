# videojs-chromecast

Add chromecast support into last videojs version (v5.6.0) with support for subtitle in WebVTT format.

Based on old videojs-chromecast plugin:
* <https://github.com/kim-company/videojs-chromecast>
* <https://github.com/Afrostream/videojs-chromecast>

[![Build Status](https://travis-ci.org/ricksancho/videojs-chromecast.svg?branch=master)](https://travis-ci.org/ricksancho/videojs-chromecast)

## Warning early version

This is an early version, currently working but definitly need some improvement (review and pull request welcome, I'm not a JS developper).

## Todo

* Handling of changing source while we are already casting

## Dist version

Build js/css files are available directly into [dist/](dist/)

## Installation

```sh
npm install --save videojs-chromecast
```

## Usage

To include videojs-chromecast on your website or web application, use any of the following methods.

Demo into [index.html](index.html)

### Local run

```sh
npm run start
```

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-chromecast.min.js"></script>
<script src="//www.gstatic.com/cv/js/sender/v1/cast_sender.js"></script>
<script>
  var player = videojs('my-video');

  player.chromecast();
</script>
```

### Browserify (not available, not online on npm)

When using with Browserify, install videojs-chromecast via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-chromecast');

var player = videojs('my-video');

player.chromecast();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-chromecast'], function(videojs) {
  var player = videojs('my-video');

  player.chromecast();
});
```

## License

MIT. Copyright (c) Rick Sanchez &lt;ricksancho@users.noreply.github.com&gt;


[videojs]: http://videojs.com/
