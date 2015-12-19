/// <reference path="dom/VideoElement.ts" />
/// <reference path="ui/VideoMockUI.ts" />
/// <reference path="model/ISourceData.ts" />
/// <reference path="constant/Source.ts" />
/// <reference path="event/MediaEvent.ts" />

namespace videomock {
  /**
   * Mocked HTMLVideoElement
   *
   * a working implementation of the HTMLVideoElement, to test Video tag without video codec
   *
   * USAGE :
   *    var Custom = Object.create(HTMLDivElement.prototype)
   *    Custom.createdCallback = function() {
   *      videomock.VideoMock.call(this)
   *    }
   *    videomock.VideoMock.implement(Custom)
   *
   *    var HTMLCustomElement = document.registerElement('video-mock', {
   *      prototype: Custom,
   *      extends: 'div'
   *    })
   *
   * based on typescript interface :
   *   https://github.com/Microsoft/TypeScript/blob/master/lib/lib.dom.d.ts
   *
   * keep NON HTMLVideoElement attributes/methods start with _, to prevent extends conflict
   */
  export class VideoMock extends dom.VideoElement {

    protected _playbackTimerId: number;
    protected _hasStarted: boolean;
    protected _hasLoadStarted: boolean;

    protected _sourceData: model.ISourceData = {
      width: 640,
      height: 360,
      duration: 30
    };

    static implement(classObject: Function): void {
      // super call
      dom.VideoElement.implement(classObject)

      // public exposed method
      classObject.prototype.play = function(): void {
        VideoMock.prototype.play.call(this)
      }

      classObject.prototype.pause = function(): void {
        VideoMock.prototype.pause.call(this)
      }

      classObject.prototype.load = function(): void {
        VideoMock.prototype.load.call(this)
      }

      // Protected methods
      classObject.prototype._startPlaybackTimer = function(): void {
        VideoMock.prototype._startPlaybackTimer.call(this)
      }

      classObject.prototype._stopPlaybackTimer = function(): void {
        VideoMock.prototype._stopPlaybackTimer.call(this)
      }

      classObject.prototype._replay = function(): void {
        VideoMock.prototype._replay.call(this)
      }

      classObject.prototype._handleEvent = function(evt: Event): void {
        VideoMock.prototype._handleEvent.call(this, evt)
      }

      classObject.prototype._updateDimensions = function(): void {
        VideoMock.prototype._updateDimensions.call(this)
      }
      classObject.prototype._set_src = function(value): void {
        VideoMock.prototype._set_src.call(this, value)
      }
      classObject.prototype._set_width = function(value): void {
        VideoMock.prototype._set_width.call(this, value)
      }
      classObject.prototype._set_height = function(value): void {
        VideoMock.prototype._set_height.call(this, value)
      }
    }

    public play(): void {

      // a simple way to simulate async play after load have started
      // as load will dispatch all event
      if (!this._hasLoadStarted) {
        this.load()
        setTimeout(() => {
          this.play()
        }, 100)
        return
      }

      if (!this._hasStarted) {
        this._hasStarted = true
        this._dispatchEvent(event.MediaEvent.play)
        this._dispatchEvent(event.MediaEvent.playing)

        // And now simulate playback !
        this._startPlaybackTimer()
      } else if (this._paused) {
        this._paused = false
        this._dispatchEvent(event.MediaEvent.playing)
      }
    }

    public pause(): void {
      if (!this._paused) {
        this._paused = true
        this._dispatchEvent(event.MediaEvent.pause)
      }
    }

    public load(): void {
      this._hasLoadStarted = true

      this._currentSrc = this._src

      // as we don't handle video load, we can dispatch events right now !
      this._dispatchEvent(event.MediaEvent.loadstart)

      // When set src, video will always load 1Mo per second !
      var intervalId: number
      var virtualSize: number = 3000 // size of the mediafile in Ko
      var prevLoaded = 0
      var loaded = 0
      var step = 100
      var first: boolean = true
      var ko: number = 1024 // One Ko
      var enoughData: number = 200 // enough data in ko to start video playback
      var pos: number = 0

      intervalId = setInterval((): void => {
        prevLoaded = loaded
        loaded += step * ko

        if (loaded >= virtualSize) {
          loaded = virtualSize * ko
        }

        if (loaded === virtualSize) {
          clearInterval(intervalId)
        }

        // add a buffered timeRange
        this._buffered.addRange(prevLoaded, loaded)

        // simulate the load progress with readyState and events
        if (pos === 0) {
          first = false
          this._dispatchEvent(event.MediaEvent.loadeddata)

          // set metadata before dispatch loadedmetadata event
          this._duration = this._sourceData.duration

          this._dispatchEvent(event.MediaEvent.loadedmetadata)
          this._dispatchEvent(event.MediaEvent.durationchange)
          this._dispatchEvent(event.MediaEvent.canplay)
          this._dispatchEvent(event.MediaEvent.canplaythrough)

          this._readyState = dom.MediaElement.HAVE_METADATA

        } else if (pos === 1) {
          this._readyState = dom.MediaElement.HAVE_CURRENT_DATA
        } else if (pos === 2) {
          this._readyState = dom.MediaElement.HAVE_FUTURE_DATA
        }

        if (this._readyState === dom.MediaElement.HAVE_FUTURE_DATA && loaded > enoughData) {
          this._readyState = dom.MediaElement.HAVE_ENOUGH_DATA
        }

        this._handleEvent(new ProgressEvent(event.MediaEvent.progress, {
          'lengthComputable': true,
          'loaded': loaded,
          'total': virtualSize * 1000
        }))

        pos++
      }, step)
    }

    /**
     * This setters will be called when access to .width attribute
     */
    public _set_width(value: number): void {
      this._width = value
      this._updateDimensions()
    }
    public _set_height(value: number): void {
      this._height = value
      this._updateDimensions()
    }

    /**
     * Override Handle event !
     * @param {Event} evt [description]
     */
    public _handleEvent(evt: Event): void {
      super._handleEvent(evt)

      // Event here will be executed after user callback !
      switch (evt.type) {
        case event.MediaEvent.ended:
          this._stopPlaybackTimer()
          if (this._loop) {
            this._replay()
          }
          break
      }
    }

    public _updateDimensions(): void {
      // calculate base video size !
      var videoRatio: number = this._sourceData.width / this._sourceData.height
      var ratio: number = this._width / this._sourceData.width
      // no pillarbox, only letter box for the moment, we'll see later to choose between pillar/letterbox
      this._videoWidth = this._width
      this._videoHeight = this._width / videoRatio
    }

    /**
     * Override src setter
     */
    public _set_src(value: string): void {
      if (this._src === value || this._currentSrc === value) {
        return
      }

      this._src = value
      this._hasStarted = false
      this._hasLoadStarted = false

      try {
        this._sourceData = constant.Source.getDataFromSource(value)
      } catch (e) {
        this._sourceData = constant.Source.getDataFromSource(constant.Source.VIDEO_640x360_30S)
      }

      if (this._preload) {
        this.load()
      }
    }

    protected _startPlaybackTimer(): void {
      if (!this._playbackTimerId) {
        var step: number = 100
        this._playbackTimerId = setInterval((): void => {

          if (!this._paused) {
            // currentTime is in seconds !
            // and must use set_currentTime insteads of propertie due to property inheritance problem in ES5
            this._currentTime =  this._currentTime + (step / 1000)

            if (this._currentTime >= this._duration) {
              this._currentTime = this._duration
              this._dispatchEvent(event.MediaEvent.ended)
              this._stopPlaybackTimer()
            } else {
              this._dispatchEvent(event.MediaEvent.timeupdate)
            }
          }
        }, step)
      }
    }

    protected _stopPlaybackTimer(): void {
      if (this._playbackTimerId) {
        clearInterval(this._playbackTimerId)
      }
    }

    protected _replay(): void {
      this._stopPlaybackTimer()
      this._currentTime = 0
      this._hasStarted = false
      this.play()
    }
  }
}