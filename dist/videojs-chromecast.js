/**
 * videojs-chromecast
 * @version 0.0.0
 * @copyright 2016 Rick Sanchez <ricksancho@users.noreply.github.com>
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsChromecast = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Button = _videoJs2['default'].getComponent('Button');

var ChromecastButton = (function (_Button) {
  _inherits(ChromecastButton, _Button);

  function ChromecastButton(player, options) {
    _classCallCheck(this, ChromecastButton);

    _get(Object.getPrototypeOf(ChromecastButton.prototype), 'constructor', this).call(this, player, options);

    // Get chromecast player and attach to event
    this.chromecast = player.getChild('ChromecastPlayer');
    this.on(this.chromecast, 'castAvailable', this.show);
    this.on(this.chromecast, 'castUnavailable', this.hide);
    this.on(this.chromecast, 'castConnected', this.handleConnected);
    this.on(this.chromecast, 'castDisconnected', this.handleDisconnected);

    // Check chromecast status and hide if not available yet
    if (!this.chromecast.apiInitialized) {
      this.hide();
    }

    // No controls we should maybe disable but method don't exist...
    /*
    if (!player.controls()) {
      this.disable();
    }
    */
  }

  _createClass(ChromecastButton, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-chromecast-button ' + _get(Object.getPrototypeOf(ChromecastButton.prototype), 'buildCSSClass', this).call(this);
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.chromecast.trigger('toggle');
    }
  }, {
    key: 'handleConnected',
    value: function handleConnected() {
      this.addClass('connected');
    }
  }, {
    key: 'handleDisconnected',
    value: function handleDisconnected() {
      this.removeClass('connected');
    }
  }]);

  return ChromecastButton;
})(Button);

ChromecastButton.prototype.controlText_ = 'Chromecast';
_videoJs2['default'].registerComponent('ChromecastButton', ChromecastButton);

exports['default'] = ChromecastButton;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

// eslint trick to not complain about "chrome" is not defined
/* global chrome */

var Component = _videoJs2['default'].getComponent('Component');

var ChromecastPlayer = (function (_Component) {
  _inherits(ChromecastPlayer, _Component);

  function ChromecastPlayer(player, option) {
    _classCallCheck(this, ChromecastPlayer);

    _get(Object.getPrototypeOf(ChromecastPlayer.prototype), 'constructor', this).call(this, player, option);

    // Event settings
    this.on('stopCast', this.handleStopCast);
    this.on('startCast', this.handleStartCast);
    this.on('toggle', this.handleToggle);
    this.on('castAvailable', this.handleCastAvailable);
    this.on('castUnavailable', this.handleCastUnavailable);
    this.on('castConnected', this.handleCastConnected);
    this.on('castDisconnected', this.handleCastDisconnected);

    // Save base URL in case of absolute link to build the full URL
    // for the Chromecast
    this.baseUrl = location.origin;

    // Chromecast variable
    this.casting = false;
    this.apiInitialized = false;
    this.inactivityTimeout = 2000;
    this.apiSession = null;
    this.apiConfig = null;

    this.player_.options_.chromecasttech = {
      chromecast: this
    };

    this.initializeApi();
  }

  /**
   * EventHandler part
   */

  _createClass(ChromecastPlayer, [{
    key: 'handleToggle',
    value: function handleToggle() {
      if (this.casting) {
        this.trigger('stopCast');
      } else {
        this.trigger('startCast');
      }
    }
  }, {
    key: 'handleCastConnected',
    value: function handleCastConnected() {
      _videoJs2['default'].log('handleCastConnected');
      this.player_.textTrackDisplay.hide();
    }
  }, {
    key: 'handleCastDisconnected',
    value: function handleCastDisconnected() {
      _videoJs2['default'].log('handleCastDisconnected');
      this.player_.textTrackDisplay.show();
    }
  }, {
    key: 'handleCastAvailable',
    value: function handleCastAvailable() {
      _videoJs2['default'].log('handleCastAvailable');
    }
  }, {
    key: 'handleCastUnavailable',
    value: function handleCastUnavailable() {
      _videoJs2['default'].log('handleCastUnavailable');
    }
  }, {
    key: 'handleStopCast',
    value: function handleStopCast() {
      _videoJs2['default'].log('onStopCast');
      this.stopCasting();
    }
  }, {
    key: 'handleStartCast',
    value: function handleStartCast() {
      _videoJs2['default'].log('onStartCast');
      if (this.apiInitialized) {
        if (this.apiSession) {
          this.onSessionSuccess(this.apiSession);
        } else {
          chrome.cast.requestSession(this.onSessionSuccess.bind(this), this.castError);
        }
      } else {
        _videoJs2['default'].log('Session not initialized');
      }
    }

    /**
     * Chromecast part
     */
  }, {
    key: 'initializeApi',
    value: function initializeApi() {
      var sessionRequest = undefined;

      if (!_videoJs2['default'].browser.IS_CHROME) {
        return;
      }

      if (!chrome.cast || !chrome.cast.isAvailable) {
        _videoJs2['default'].log('Cast APIs not available. Retrying...');
        setTimeout(this.initializeApi.bind(this), 1000);
        return;
      }

      _videoJs2['default'].log('Cast APIs are available');
      var appId = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;

      sessionRequest = new chrome.cast.SessionRequest(appId);
      this.apiConfig = new chrome.cast.ApiConfig(sessionRequest, this.sessionJoinedListener.bind(this), this.receiverListener.bind(this));

      chrome.cast.initialize(this.apiConfig, this.onInitSuccess.bind(this), this.castError.bind(this));
    }
  }, {
    key: 'sessionJoinedListener',
    value: function sessionJoinedListener(session) {
      _videoJs2['default'].log('Session joined: ' + session.sessionId);
      this.apiSession = session;
    }
  }, {
    key: 'receiverListener',
    value: function receiverListener(availability) {
      if (availability === 'available') {
        this.trigger('castAvailable');
      }
    }
  }, {
    key: 'onInitSuccess',
    value: function onInitSuccess() {
      this.apiInitialized = true;
    }
  }, {
    key: 'castError',
    value: function castError(_castError) {
      _videoJs2['default'].log('Cast Error: ' + JSON.stringify(_castError));
    }
  }, {
    key: 'onSessionSuccess',
    value: function onSessionSuccess(session) {

      _videoJs2['default'].log('Session initialized: ' + session.sessionId);
      this.apiSession = session;
      this.trigger('castConnected');

      var mediaInfo = new chrome.cast.media.MediaInfo(this.player_.currentSrc(), this.player_.currentType());

      mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();

      var i = 1;
      var activeTrackIds = [];
      var tracks = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.player_.textTracks().tracks_[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var t = _step.value;

          _videoJs2['default'].log(i + ' ' + t.language + ' ' + t.label + ' ' + t.src + ' ' + t.type);
          var t2 = new chrome.cast.media.Track(i, chrome.cast.media.TrackType.TEXT);

          // Case absolute URI start with '/path'
          if (t.src[0] === '/') {
            t2.trackContentId = this.baseUrl + '/' + t.src;
          } else {
            t2.trackContentId = t.src;
          }
          // t.type maybe exist but in my test is undefined
          t2.trackContentType = 'text/vtt';
          t2.subtype = chrome.cast.media.TextTrackType.SUBTITLES;
          t2.name = t.label;
          t2.language = t.language;
          t2.customData = null;
          tracks.push(t2);

          if (t2.mode === 'showing') {
            activeTrackIds.push(i);
          }
          i++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      mediaInfo.textTrackStyle = new chrome.cast.media.TextTrackStyle();
      mediaInfo.tracks = tracks;

      var loadRequest = new chrome.cast.media.LoadRequest(mediaInfo);

      loadRequest.autoplay = true;
      loadRequest.currentTime = this.player_.currentTime();
      loadRequest.activeTrackIds = activeTrackIds;

      this.apiSession.loadMedia(loadRequest, this.onMediaDiscovered.bind(this), this.castError);
      this.apiSession.addUpdateListener(this.onSessionUpdate.bind(this));
    }
  }, {
    key: 'onSessionUpdate',
    value: function onSessionUpdate(isAlive) {
      if (this.apiSession) {
        if (!isAlive) {
          this.onStopAppSuccess();
        }
      }
    }
  }, {
    key: 'onMediaDiscovered',
    value: function onMediaDiscovered(media) {
      this.apiMedia = media;

      var tracks = this.player_.textTracks().tracks_;

      this.player_.loadTech_('ChromecastTech', this.player_.currentSrc());
      this.player_.textTracks().tracks_ = tracks;

      this.casting = true;

      // Force show of controls all times
      this.inactivityTimeout = this.player_.options_.inactivityTimeout;
      this.player_.options_.inactivityTimeout = 0;
      this.player_.userActive(true);
    }
  }, {
    key: 'stopCasting',
    value: function stopCasting() {
      this.apiSession.stop(this.onStopAppSuccess.bind(this), this.onError);
    }
  }, {
    key: 'onStopAppSuccess',
    value: function onStopAppSuccess() {
      if (!this.apiSession) {
        return;
      }

      // Save current status
      var src = this.player_.currentSrc();
      var currentTime = this.player_.currentTime();
      var paused = this.player_.paused();

      // Restore old status/settings
      this.player_.loadTech_('Html5');
      this.player_.src({ src: src });

      if (!paused) {
        this.player_.one('seeked', function () {
          this.player_.play();
          return;
        });
      }

      this.player_.currentTime(currentTime);
      this.player_.tech_.setControls(false);
      this.player_.options_.inactivityTimeout = this.inactivityTimeout;

      // Reset variable
      this.casting = false;
      this.apiMedia = null;
      this.apiSession = null;

      this.trigger('castDisconnected');
    }
  }]);

  return ChromecastPlayer;
})(Component);

_videoJs2['default'].registerComponent('ChromecastPlayer', ChromecastPlayer);

exports['default'] = ChromecastPlayer.js;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

// eslint trick to not complain about 'chrome' is not defined
/* global chrome */

var Tech = _videoJs2['default'].getTech('Tech');

var ChromecastTech = (function (_Tech) {
  _inherits(ChromecastTech, _Tech);

  function ChromecastTech(options, ready) {
    _classCallCheck(this, ChromecastTech);

    _get(Object.getPrototypeOf(ChromecastTech.prototype), 'constructor', this).call(this, options, ready);
    this.featuresVolumeControl = true;
    this.movingMediaElementInDOM = false;
    this.featuresFullscreenResize = false;
    this.featuresProgressEvents = true;
    this.source = options.source;
    this.chromecast = options.chromecast;

    // Chromecast player
    this.apiMedia = options.chromecast.apiMedia;
    this._paused = true;
    this._muted = false;
    this.currentVolume = 1;
    this.currentMediaTime = 0;
    this.timer = null;
    this.timerStep = 1000;

    // Start Update listener and progress timer
    this.apiMedia.addUpdateListener(this.onMediaStatusUpdate.bind(this));
    this.startProgressTimer(this.incrementMediaTime.bind(this));
    this.textTracks().on('change', this.onTrackChangeHandler.bind(this));

    this.triggerReady();
  }

  _createClass(ChromecastTech, [{
    key: 'dispose',
    value: function dispose() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.textTracks().removeEventListener('change', this.onTrackChangeHandler);
      _get(Object.getPrototypeOf(ChromecastTech.prototype), 'dispose', this).call(this);
    }
  }, {
    key: 'createEl',
    value: function createEl() {
      // name should be the Chromecast device name but
      // createEL() is call before this.chromecast is define
      // due to call to super in first
      // this.chromecast.apiSession.receiver.friendlyName;
      var chromecast = this.options().chromecast;
      var name = chromecast.apiSession.receiver.friendlyName;
      var el = _videoJs2['default'].createEl('div');

      el.className = 'vjs-tech vjs-tech-chromecast';
      el.innerHTML = '\n<div class=\'casting-image\' style=\'background-image: url(\'\')\'></div>\n<div class=\'casting-overlay\'>\n<div class=\'casting-information\'>\n<div class=\'casting-icon\'>&#58880</div>\n<div class=\'casting-description\'><small>Casting to</small><br>' + name + '</div>\n</div>\n</div>';
      return el;
    }
  }, {
    key: 'play',
    value: function play() {
      if (!this.apiMedia) {
        return;
      }

      if (this._paused) {
        this.apiMedia.play(null, this.onPlaySuccess.bind(this), this.onError);
        this._paused = false;
      }
    }
  }, {
    key: 'onPlaySuccess',
    value: function onPlaySuccess() {
      this._pause = false;
      this.trigger('play');
    }
  }, {
    key: 'paused',
    value: function paused() {
      return this._paused;
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (!this.apiMedia) {
        return;
      }

      if (!this._paused) {
        this.apiMedia.pause(null, this.onPauseSuccess.bind(this), this.onError);
      }
    }
  }, {
    key: 'onPauseSuccess',
    value: function onPauseSuccess() {
      this._paused = true;
      this.trigger('pause');
    }
  }, {
    key: 'currentTime',
    value: function currentTime() {
      return this.currentMediaTime;
    }
  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime(seconds) {
      var request = new chrome.cast.media.SeekRequest();

      request.currentTime = seconds;

      /*
      if (this.player_.controlBar.progressControl.seekBar.videoWasPlaying) {
        request.resumeState = chrome.cast.media.ResumeState.PLAYBACK_START;
      }
      */
      if (!this._paused) {
        request.resumeState = chrome.cast.media.ResumeState.PLAYBACK_START;
      }

      this.apiMedia.seek(request, this.onSetCurrentTimeSuccess.bind(this, seconds), this.onError);
    }
  }, {
    key: 'onSetCurrentTimeSuccess',
    value: function onSetCurrentTimeSuccess(seconds) {
      this.currentMediaTime = seconds;
      this.trigger('seekMedia');
    }
  }, {
    key: 'volume',
    value: function volume() {
      return this.currentVolume;
    }
  }, {
    key: 'setVolume',
    value: function setVolume(volume) {
      return this.setMediaVolume(volume, false);
    }
  }, {
    key: 'muted',
    value: function muted() {
      return this._muted;
    }
  }, {
    key: 'setMuted',
    value: function setMuted() {
      return this.setMediaVolume(this.volume(), !this.muted());
    }
  }, {
    key: 'setMediaVolume',
    value: function setMediaVolume(level, mute) {
      if (!this.apiMedia) {
        return;
      }

      var volume = new chrome.cast.Volume();
      var request = new chrome.cast.media.VolumeRequest();

      volume.level = level;
      volume.muted = mute;
      request.volume = volume;

      this.apiMedia.setVolume(request, this.onSetMediaVolumeSuccess.bind(this, volume.level, mute), this.onError);
    }
  }, {
    key: 'onSetMediaVolumeSuccess',
    value: function onSetMediaVolumeSuccess(level, mute) {
      this.currentVolume = level;
      this._muted = mute;

      this.trigger('volumechange');
    }
  }, {
    key: 'supportsFullScreen',
    value: function supportsFullScreen() {
      return false;
    }
  }, {
    key: 'duration',
    value: function duration() {
      if (this.apiMedia) {
        return this.apiMedia.duration;
      }
      return 0;
    }
  }, {
    key: 'currentSrc',
    value: function currentSrc() {
      return this.source;
    }
  }, {
    key: 'src',
    value: function src(_src) {
      if (typeof _src === 'undefined') {
        return this.source;
      }

      if (_src !== this.source) {
        this.source = _src;

        // Force reload, with new source.
        // bugged not the right way of doing it
        // this.chromecast.onSessionSuccess(this.chromecast.apiSession);
      }
    }
  }, {
    key: 'controls',
    value: function controls() {
      return null;
    }
  }, {
    key: 'onMediaStatusUpdate',
    value: function onMediaStatusUpdate(isAlive) {
      if (!this.apiMedia) {
        return;
      }

      this.currentMediaTime = this.apiMedia.currentTime;

      switch (this.apiMedia.playerState) {
        case chrome.cast.media.PlayerState.IDLE:
          this.currentMediaTime = 0;
          this.trigger('timeupdate');
          // We should probably used a event on this one
          this.chromecast.onStopAppSuccess();
          break;
        case chrome.cast.media.PlayerState.PAUSED:
          if (this._paused) {
            this._paused = true;
            this.trigger('pause');
          }
          break;
        case chrome.cast.media.PlayerState.PLAYING:
          if (this._paused) {
            this._paused = false;
            this.trigger('play');
          }
          break;
      }
    }
  }, {
    key: 'incrementMediaTime',
    value: function incrementMediaTime() {
      if (this.apiMedia.playerState !== chrome.cast.media.PlayerState.PLAYING) {
        return;
      }

      if (this.currentMediaTime < this.apiMedia.media.duration) {
        this.currentMediaTime += 1;
        this.trigger('timeupdate');
      } else {
        this.currentMediaTime = 0;
        clearInterval(this.timer);
      }
    }
  }, {
    key: 'startProgressTimer',
    value: function startProgressTimer(callback) {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.timer = setInterval(callback.bind(this), this.timerStep);
    }
  }, {
    key: 'mediaCommandSuccessCallback',
    value: function mediaCommandSuccessCallback(information, event) {
      _videoJs2['default'].log(information);
    }
  }, {
    key: 'onTrackChangeHandler',
    value: function onTrackChangeHandler() {
      var i = 1;
      var activeTrackIds = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.textTracks().tracks_[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var t = _step.value;

          // videojs.log(`${i} ${t.language} ${t.label} ${t.src} ${t.type}`);
          if (t.mode === 'showing') {
            activeTrackIds.push(i);
          }
          i++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (this.apiMedia) {
        var tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(activeTrackIds);

        this.apiMedia.editTracksInfo(tracksInfoRequest, this.onTrackSuccess.bind(this), this.onTrackError.bind(this));
      }
    }
  }, {
    key: 'onTrackSuccess',
    value: function onTrackSuccess() {
      _videoJs2['default'].log('onTrackSuccess');
    }
  }, {
    key: 'onTrackError',
    value: function onTrackError() {
      _videoJs2['default'].log('onTrackError');
    }
  }, {
    key: 'onError',
    value: function onError() {
      _videoJs2['default'].log('chromecast error');
    }
  }]);

  return ChromecastTech;
})(Tech);

ChromecastTech.isSupported = function () {
  return this.apiInitialized;
};

ChromecastTech.canPlaySource = function (source) {
  return source.type === 'video/mp4' || source.type === 'video/webm' || source.type === 'application/x-mpegURL' || source.type === 'application/vnd.apple.mpegURL';
};

_videoJs2['default'].registerTech('ChromecastTech', ChromecastTech);
exports['default'] = ChromecastTech;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

// import but never used probably have a better way
// to load them into the final videojs-chromecast.js
// add eslint-disable-line to pass vjsstandard

var _chromecastPlayerJs = require('./chromecast-player.js');

var _chromecastPlayerJs2 = _interopRequireDefault(_chromecastPlayerJs);

// eslint-disable-line

var _chromecastButtonJs = require('./chromecast-button.js');

var _chromecastButtonJs2 = _interopRequireDefault(_chromecastButtonJs);

// eslint-disable-line

var _chromecastTechJs = require('./chromecast-tech.js');

var _chromecastTechJs2 = _interopRequireDefault(_chromecastTechJs);

// eslint-disable-line

// Default options for the plugin.
var defaults = {};

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
var onPlayerReady = function onPlayerReady(player, options) {
  var btn = undefined;

  player.addClass('vjs-chromecast');
  player.addChild('ChromecastPlayer');
  btn = player.controlBar.addChild('ChromecastButton', options);
  player.controlBar.el_.insertBefore(btn.el(), player.controlBar.fullscreenToggle.el());
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
var chromecast = function chromecast(options) {
  var _this = this;

  this.ready(function () {
    onPlayerReady(_this, _videoJs2['default'].mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
_videoJs2['default'].plugin('chromecast', chromecast);

// Include the version number.
chromecast.VERSION = '0.0.0';

exports['default'] = chromecast;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./chromecast-button.js":1,"./chromecast-player.js":2,"./chromecast-tech.js":3}]},{},[4])(4)
});