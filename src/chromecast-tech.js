import videojs from 'video.js';

// eslint trick to not complain about 'chrome' is not defined
/* global chrome */

const Tech = videojs.getTech('Tech');

class ChromecastTech extends Tech {
  constructor(options, ready) {
    super(options, ready);
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

  dispose() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.textTracks().removeEventListener('change', this.onTrackChangeHandler);
    super.dispose();
  }

  createEl() {
    // name should be the Chromecast device name but
    // createEL() is call before this.chromecast is define
    // due to call to super in first
    // this.chromecast.apiSession.receiver.friendlyName;
    const chromecast = this.options().chromecast;
    const name = chromecast.apiSession.receiver.friendlyName;
    const el = videojs.createEl('div');

    el.className = 'vjs-tech vjs-tech-chromecast';
    el.innerHTML = `
<div class=\'casting-image\' style=\'background-image: url('')\'></div>
<div class=\'casting-overlay\'>
<div class=\'casting-information\'>
<div class=\'casting-icon\'>&#58880</div>
<div class=\'casting-description\'><small>Casting to</small><br>${name}</div>
</div>
</div>`;
    return el;
  }

  play() {
    if (!this.apiMedia) {
      return;
    }

    if (this._paused) {
      this.apiMedia.play(null,
          this.onPlaySuccess.bind(this),
          this.onError);
      this._paused = false;
    }
  }

  onPlaySuccess() {
    this._pause = false;
    this.trigger('play');
  }

  paused() {
    return this._paused;
  }

  pause() {
    if (!this.apiMedia) {
      return;
    }

    if (!this._paused) {
      this.apiMedia.pause(null,
          this.onPauseSuccess.bind(this),
          this.onError);
    }
  }

  onPauseSuccess() {
    this._paused = true;
    this.trigger('pause');
  }

  currentTime() {
    return this.currentMediaTime;
  }

  setCurrentTime(seconds) {
    const request = new chrome.cast.media.SeekRequest();

    request.currentTime = seconds;

    /*
    if (this.player_.controlBar.progressControl.seekBar.videoWasPlaying) {
      request.resumeState = chrome.cast.media.ResumeState.PLAYBACK_START;
    }
    */
    if (!this._paused) {
      request.resumeState = chrome.cast.media.ResumeState.PLAYBACK_START;
    }

    this.apiMedia.seek(request,
        this.onSetCurrentTimeSuccess.bind(this, seconds),
        this.onError);
  }

  onSetCurrentTimeSuccess(seconds) {
    this.currentMediaTime = seconds;
    this.trigger('seekMedia');
  }

  volume() {
    return this.currentVolume;
  }

  setVolume(volume) {
    return this.setMediaVolume(volume, false);
  }

  muted() {
    return this._muted;
  }

  setMuted() {
    return this.setMediaVolume(this.volume(), !this.muted());
  }

  setMediaVolume(level, mute) {
    if (!this.apiMedia) {
      return;
    }

    let volume = new chrome.cast.Volume();
    let request = new chrome.cast.media.VolumeRequest();

    volume.level = level;
    volume.muted = mute;
    request.volume = volume;

    this.apiMedia.setVolume(request,
        this.onSetMediaVolumeSuccess.bind(this, volume.level, mute),
        this.onError);
  }

  onSetMediaVolumeSuccess(level, mute) {
    this.currentVolume = level;
    this._muted = mute;

    this.trigger('volumechange');
  }

  supportsFullScreen() {
    return false;
  }

  duration() {
    if (this.apiMedia) {
      return this.apiMedia.duration;
    }
    return 0;
  }

  currentSrc() {
    return this.source;
  }

  src(src) {
    if (typeof src === 'undefined') {
      return this.source;
    }

    if (src !== this.source) {
      this.source = src;

      // Force reload, with new source.
      // bugged not the right way of doing it
      // this.chromecast.onSessionSuccess(this.chromecast.apiSession);
    }
  }

  controls() {
    return null;
  }

  onMediaStatusUpdate(isAlive) {
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

  incrementMediaTime() {
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

  startProgressTimer(callback) {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.timer = setInterval(callback.bind(this), this.timerStep);
  }

  mediaCommandSuccessCallback(information, event) {
    videojs.log(information);
  }

  onTrackChangeHandler() {
    let i = 1;
    let activeTrackIds = [];

    for (let t of this.textTracks().tracks_) {
      // videojs.log(`${i} ${t.language} ${t.label} ${t.src} ${t.type}`);
      if (t.mode === 'showing') {
        activeTrackIds.push(i);
      }
      i++;
    }

    if (this.apiMedia) {
      const tracksInfoRequest =
        new chrome.cast.media.EditTracksInfoRequest(activeTrackIds);

      this.apiMedia.editTracksInfo(tracksInfoRequest,
        this.onTrackSuccess.bind(this), this.onTrackError.bind(this));
    }
  }

  onTrackSuccess() {
    videojs.log('onTrackSuccess');
  }

  onTrackError() {
    videojs.log('onTrackError');
  }

  onError() {
    videojs.log('chromecast error');
  }
}

ChromecastTech.isSupported = function() {
  return this.apiInitialized;
};

ChromecastTech.canPlaySource = function(source) {
  return source.type === 'video/mp4' ||
         source.type === 'video/webm' ||
         source.type === 'application/x-mpegURL' ||
         source.type === 'application/vnd.apple.mpegURL';
};

videojs.registerTech('ChromecastTech', ChromecastTech);
export default ChromecastTech;
