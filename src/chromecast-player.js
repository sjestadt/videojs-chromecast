import videojs from 'video.js';

// eslint trick to not complain about "chrome" is not defined
/* global chrome */

const Component = videojs.getComponent('Component');

class ChromecastPlayer extends Component {
  constructor(player, option) {
    super(player, option);

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
  handleToggle() {
    if (this.casting) {
      this.trigger('stopCast');
    } else {
      this.trigger('startCast');
    }
  }

  handleCastConnected() {
    videojs.log('handleCastConnected');
    this.player_.textTrackDisplay.hide();
  }

  handleCastDisconnected() {
    videojs.log('handleCastDisconnected');
    this.player_.textTrackDisplay.show();
  }

  handleCastAvailable() {
    videojs.log('handleCastAvailable');
  }

  handleCastUnavailable() {
    videojs.log('handleCastUnavailable');
  }

  handleStopCast() {
    videojs.log('onStopCast');
    this.stopCasting();
  }

  handleStartCast() {
    videojs.log('onStartCast');
    if (this.apiInitialized) {
      if (this.apiSession) {
        this.onSessionSuccess(this.apiSession);
      } else {
        chrome.cast.requestSession(this.onSessionSuccess.bind(this),
            this.castError);
      }
    } else {
      videojs.log('Session not initialized');
    }
  }

  /**
   * Chromecast part
   */
  initializeApi() {
    let sessionRequest;

    if (!videojs.browser.IS_CHROME) {
      return;
    }

    if (!chrome.cast || !chrome.cast.isAvailable) {
      videojs.log('Cast APIs not available. Retrying...');
      setTimeout(this.initializeApi.bind(this), 1000);
      return;
    }

    videojs.log('Cast APIs are available');
    const appId = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;

    sessionRequest = new chrome.cast.SessionRequest(appId);
    this.apiConfig = new chrome.cast.ApiConfig(sessionRequest,
    this.sessionJoinedListener.bind(this),
      this.receiverListener.bind(this));

    chrome.cast.initialize(this.apiConfig,
      this.onInitSuccess.bind(this),
    this.castError.bind(this));
  }

  sessionJoinedListener(session) {
    videojs.log(`Session joined: ${session.sessionId}`);
    this.apiSession = session;
  }

  receiverListener(availability) {
    if (availability === 'available') {
      this.trigger('castAvailable');
    }
  }

  onInitSuccess() {
    this.apiInitialized = true;
  }

  castError(castError) {
    videojs.log('Cast Error: ' + (JSON.stringify(castError)));
  }

  onSessionSuccess(session) {

    videojs.log('Session initialized: ' + session.sessionId);
    this.apiSession = session;
    this.trigger('castConnected');

    let mediaInfo = new chrome.cast.media.MediaInfo(this.player_.currentSrc(),
      this.player_.currentType());

    mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();

    let i = 1;
    let activeTrackIds = [];
    let tracks = [];

    for (let t of this.player_.textTracks().tracks_) {
      videojs.log(`${i} ${t.language} ${t.label} ${t.src} ${t.type}`);
      let t2 = new chrome.cast.media.Track(i, chrome.cast.media.TrackType.TEXT);

      // Case absolute URI start with '/path'
      if (t.src[0] === '/') {
        t2.trackContentId = `${this.baseUrl}/${t.src}`;
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

    mediaInfo.textTrackStyle = new chrome.cast.media.TextTrackStyle();
    mediaInfo.tracks = tracks;

    let loadRequest = new chrome.cast.media.LoadRequest(mediaInfo);

    loadRequest.autoplay = true;
    loadRequest.currentTime = this.player_.currentTime();
    loadRequest.activeTrackIds = activeTrackIds;

    this.apiSession.loadMedia(loadRequest,
       this.onMediaDiscovered.bind(this), this.castError);
    this.apiSession.addUpdateListener(this.onSessionUpdate.bind(this));
  }

  onSessionUpdate(isAlive) {
    if (this.apiSession) {
      if (!isAlive) {
        this.onStopAppSuccess();
      }
    }
  }

  onMediaDiscovered(media) {
    this.apiMedia = media;

    let tracks = this.player_.textTracks().tracks_;

    this.player_.loadTech_('ChromecastTech', this.player_.currentSrc());
    this.player_.textTracks().tracks_ = tracks;

    this.casting = true;

    // Force show of controls all times
    this.inactivityTimeout = this.player_.options_.inactivityTimeout;
    this.player_.options_.inactivityTimeout = 0;
    this.player_.userActive(true);
  }

  stopCasting() {
    this.apiSession.stop(this.onStopAppSuccess.bind(this), this.onError);
  }

  onStopAppSuccess() {
    if (!this.apiSession) {
      return;
    }

    // Save current status
    let src = this.player_.currentSrc();
    let currentTime = this.player_.currentTime();
    let type = this.player_.currentType();
    let paused = this.player_.paused();

    // Restore old status/settings
    this.player_.loadTech_('Html5');
    this.player_.src({ src: src, type: type});

    if (!paused) {
      this.player_.one('seeked', function() {
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

}

videojs.registerComponent('ChromecastPlayer', ChromecastPlayer);

export default ChromecastPlayer.js;
