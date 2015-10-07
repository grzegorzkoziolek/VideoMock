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
   */
  export class VideoMock extends dom.VideoElement {

    protected _playbackTimerId: number
    protected _hasStarted: boolean;

    static implement(classObject: Function): void {
      // super call
      dom.VideoElement.implement(classObject)

      // override src setter
      Object.defineProperty(classObject.prototype, 'src', {
        get: function (): string {
            return this._src;
        },
        set: function (value: string) {
          this._set_src(value)
        },
        enumerable: true,
        configurable: true
      });
      
      /**
       * We don't need controls here for the moment !
       */
      Object.defineProperty(classObject.prototype, 'controls', {
        get: function (): boolean {
            return false;
        },
        set: function (value: boolean) {
            this._controls = value;
        },
        enumerable: true,
        configurable: true
      });

      classObject.prototype._set_src = function(value: string): void {
        VideoMock.prototype._set_src.call(this, value)
      }

      classObject.prototype.play = function(): void {
        VideoMock.prototype.play.call(this)
      }

      classObject.prototype.pause = function(): void {
        VideoMock.prototype.pause.call(this)
      }

      classObject.prototype.load = function(): void {
        VideoMock.prototype.load.call(this)
      }

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
    }

    /**
     * src setter !
     * @param {string} value [description]
     */
    protected _set_src(value: string): void {
      this._src = value
      this._currentSrc = this._src

      // try to parse src, or use default value
      var data: model.ISourceData 

      try {
        data = constant.Source.getDataFromSource(value)
      } catch (e) {
        data = constant.Source.getDataFromSource(constant.Source.VIDEO_640x360_30S)
      }
      
      // as we don't handle video load, we can dispatch events right now !
      this._dispatchEvent(event.MediaEvent.loadstart)

      // When set src, video will always load 1Mo per second !
      var intervalId: number 
      var virtualSize: number = 3000 // size of the mediafile in Ko
      var prevLoaded = 0
      var loaded = 0 
      var step = 100
      var first: boolean = true
      intervalId = setInterval((): void => {
        prevLoaded = loaded
        loaded += step * 1000

        if (loaded >= virtualSize) {
          loaded = virtualSize * 1000
        }

        if (loaded === virtualSize) {
          clearInterval(intervalId)
        }

        // add a buffered timeRange
        this._buffered.addRange(prevLoaded, loaded) 

        // Handle first load, and dispatch all metadate events
        if (first) {
          first = false
          this._dispatchEvent(event.MediaEvent.loadeddata)

          // set metadata before dispatch loadedmetadata event
          this._duration = data.duration 
          this._videoWidth = data.width 
          this._videoHeight = data.height

          this._dispatchEvent(event.MediaEvent.loadedmetadata)
          this._dispatchEvent(event.MediaEvent.durationchange)
          this._dispatchEvent(event.MediaEvent.canplay)
          this._dispatchEvent(event.MediaEvent.canplaythrough)

          if (this._autoplay) {
            this.play()
          }
        }

        this._handleEvent(new ProgressEvent(event.MediaEvent.progress, {
          'lengthComputable': true, 
          'loaded': loaded, 
          'total': virtualSize * 1000
        }))
      }, step)
    }

    public play(): void {
      this._paused = false

      if (!this._hasStarted) {
        this._hasStarted = true
        this._dispatchEvent(event.MediaEvent.play)
        
        // And now simulate playback !
        this._startPlaybackTimer()
      } else {
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
      this._set_src(this._src)
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
      this.play()
    }

    /**
     * Override Handle event ! 
     * @param {Event} evt [description]
     */
    protected _handleEvent(evt: Event): void {
      switch (evt.type) {
        case event.MediaEvent.ended: 
          if (this._loop) {
            this._replay()
          }
          break
      }

      super._handleEvent(evt)
    }
  }
}