import videojs from 'video.js';

// import but never used probably have a better way
// to load them into the final videojs-chromecast.js
// add eslint-disable-line to pass vjsstandard
import ChromecastPlayer from './chromecast-player.js'; // eslint-disable-line
import ChromecastButton from './chromecast-button.js'; // eslint-disable-line
import ChromecastTech from './chromecast-tech.js'; // eslint-disable-line

// Default options for the plugin.
const defaults = {};

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 * @param    {Object} [options={}]
 */
const onPlayerReady = (player, options) => {
  let btn;

  player.addClass('vjs-chromecast');
  player.addChild('ChromecastPlayer');
  btn = player.controlBar.addChild('ChromecastButton', options);
  player.controlBar.el_.insertBefore(btn.el(),
    player.controlBar.fullscreenToggle.el());
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function chromecast
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const chromecast = function(options) {
  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
videojs.plugin('chromecast', chromecast);

// Include the version number.
chromecast.VERSION = '__VERSION__';

export default chromecast;
