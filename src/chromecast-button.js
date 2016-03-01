import videojs from 'video.js';

const Button = videojs.getComponent('Button');

class ChromecastButton extends Button {
  constructor(player, options) {
    super(player, options);

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

  buildCSSClass() {
    return `vjs-chromecast-button ${super.buildCSSClass()}`;
  }

  handleClick() {
    this.chromecast.trigger('toggle');
  }

  handleConnected() {
    this.addClass('connected');
  }

  handleDisconnected() {
    this.removeClass('connected');
  }
}

ChromecastButton.prototype.controlText_ = 'Chromecast';
videojs.registerComponent('ChromecastButton', ChromecastButton);

export default ChromecastButton;
