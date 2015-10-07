var videomock;
(function (videomock) {
    var event;
    (function (event) {
        var EventHandler = (function () {
            function EventHandler() {
                this.listeners = {};
            }
            EventHandler.prototype.addEventListener = function (type, listener, useCapture) {
                this.listeners[type] = this.listeners[type] || [];
                this.listeners[type].push(listener);
            };
            EventHandler.prototype.removeEventListener = function (type, listener, useCapture) {
                var index = this.listeners[type].indexOf(listener);
                if (index >= 0) {
                    listener[index] = function () { };
                }
            };
            EventHandler.prototype.clearListeners = function () {
                this.listeners = {};
            };
            EventHandler.prototype.handleEvent = function (evt) {
                var listeners = this.listeners[evt.type] || [];
                for (var i = 0, l = listeners.length; i < l; i++) {
                    try {
                        listeners[i](evt);
                    }
                    catch (err) {
                    }
                }
            };
            return EventHandler;
        })();
        event.EventHandler = EventHandler;
    })(event = videomock.event || (videomock.event = {}));
})(videomock || (videomock = {}));
var videomock;
(function (videomock) {
    var event;
    (function (event) {
        var MediaEvent = (function () {
            function MediaEvent() {
            }
            MediaEvent.abort = 'abort';
            MediaEvent.canplay = 'canplay';
            MediaEvent.canplaythrough = 'canplaythrough';
            MediaEvent.durationchange = 'durationchange';
            MediaEvent.emptied = 'emptied';
            MediaEvent.encrypted = 'encrypted';
            MediaEvent.ended = 'ended';
            MediaEvent.error = 'error';
            MediaEvent.interruptbegin = 'interruptbegin';
            MediaEvent.interruptend = 'interruptend';
            MediaEvent.loadeddata = 'loadeddata';
            MediaEvent.loadedmetadata = 'loadedmetadata';
            MediaEvent.loadstart = 'loadstart';
            MediaEvent.pause = 'pause';
            MediaEvent.play = 'play';
            MediaEvent.playing = 'playing';
            MediaEvent.progress = 'progress';
            MediaEvent.ratechange = 'ratechange';
            MediaEvent.seeked = 'seeked';
            MediaEvent.seeking = 'seeking';
            MediaEvent.stalled = 'stalled';
            MediaEvent.suspend = 'suspend';
            MediaEvent.timeupdate = 'timeupdate';
            MediaEvent.volumechange = 'volumechange';
            MediaEvent.waiting = 'waiting';
            return MediaEvent;
        })();
        event.MediaEvent = MediaEvent;
    })(event = videomock.event || (videomock.event = {}));
})(videomock || (videomock = {}));
var videomock;
(function (videomock) {
    var dom;
    (function (dom) {
        var TimeRanges = (function () {
            function TimeRanges() {
                this.ranges = [];
            }
            Object.defineProperty(TimeRanges.prototype, "length", {
                get: function () {
                    return this.ranges.length;
                },
                enumerable: true,
                configurable: true
            });
            TimeRanges.prototype.addRange = function (start, end) {
                this.ranges.push({ 'start': start, 'end': end });
            };
            TimeRanges.prototype.start = function (index) {
                return this.ranges[index].start;
            };
            TimeRanges.prototype.end = function (index) {
                return this.ranges[index].end;
            };
            return TimeRanges;
        })();
        dom.TimeRanges = TimeRanges;
    })(dom = videomock.dom || (videomock.dom = {}));
})(videomock || (videomock = {}));
/// <reference path="../event/EventHandler.ts" /> 
/// <reference path="../event/MediaEvent.ts" /> 
/// <reference path="TimeRanges.ts" /> 
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var videomock;
(function (videomock) {
    var dom;
    (function (dom) {
        var HTMLMediaElement = (function (_super) {
            __extends(HTMLMediaElement, _super);
            function HTMLMediaElement() {
                _super.apply(this, arguments);
                this._buffered = new dom.TimeRanges();
                this._played = new dom.TimeRanges();
                this._preload = 'none';
                this._seekable = new dom.TimeRanges();
                this._textTracks = new TextTrackList();
                this._videoTracks = new VideoTrackList();
                this._eventHandler = new videomock.event.EventHandler();
                this._handledEvents = [];
            }
            Object.defineProperty(HTMLMediaElement.prototype, "audioTracks", {
                get: function () {
                    return this._audioTracks;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "autoplay", {
                get: function () {
                    return this._autoplay;
                },
                set: function (value) {
                    this._autoplay = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "buffered", {
                get: function () {
                    return this._buffered;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "controls", {
                get: function () {
                    return this._controls;
                },
                set: function (value) {
                    this._controls = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "currentSrc", {
                get: function () {
                    return this._currentSrc;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "currentTime", {
                get: function () {
                    return this._currentTime;
                },
                set: function (value) {
                    this._currentTime = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "defaultMuted", {
                get: function () {
                    return this._defaultMuted;
                },
                set: function (value) {
                    this._defaultMuted = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "defaultPlaybackRate", {
                get: function () {
                    return this._defaultPlaybackRate;
                },
                set: function (value) {
                    this._defaultPlaybackRate = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "duration", {
                get: function () {
                    return this._duration;
                },
                set: function (value) {
                    this._duration = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "ended", {
                get: function () {
                    return this._ended;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "error", {
                get: function () {
                    return this._error;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "loop", {
                get: function () {
                    return this._loop;
                },
                set: function (value) {
                    this._loop = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "muted", {
                get: function () {
                    return this._muted;
                },
                set: function (value) {
                    this._muted = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "networkState", {
                get: function () {
                    return this._networkState;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "paused", {
                get: function () {
                    return this._paused;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "playbackRate", {
                get: function () {
                    return this._playbackRate;
                },
                set: function (value) {
                    this._playbackRate = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "played", {
                get: function () {
                    return this._played;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "preload", {
                get: function () {
                    return this._preload;
                },
                set: function (value) {
                    if (['auto', 'metadata', 'none'].indexOf(value) > -1) {
                        this._preload = value;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "readyState", {
                get: function () {
                    return this._readyState;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "seekable", {
                get: function () {
                    return this._seekable;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "seeking", {
                get: function () {
                    return this._seeking;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "src", {
                get: function () {
                    return this._src;
                },
                set: function (value) {
                    this._src = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "textTracks", {
                get: function () {
                    return this._textTracks;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "videoTracks", {
                get: function () {
                    return this._videoTracks;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLMediaElement.prototype, "volume", {
                get: function () {
                    return this._volume;
                },
                set: function (value) {
                    this._volume = value;
                },
                enumerable: true,
                configurable: true
            });
            HTMLMediaElement.prototype.addTextTrack = function (kind, label, language) {
                var textTrack = new TextTrack();
                textTrack.kind = kind;
                textTrack.label = label;
                textTrack.language = language;
                this._textTracks[this._textTracks.length] = textTrack;
                return textTrack;
            };
            HTMLMediaElement.prototype.canPlayType = function (type) {
                return 'probably';
            };
            HTMLMediaElement.prototype.load = function () {
                throw 'to be implemented !';
            };
            HTMLMediaElement.prototype.pause = function () {
                throw 'to be implemented !';
            };
            HTMLMediaElement.prototype.play = function () {
                throw 'to be implemented !';
            };
            HTMLMediaElement.prototype.addEventListener = function (type, listener, useCapture) {
                if (this._getHandledEvents().indexOf(type) > -1) {
                    this._eventHandler.addEventListener(type, listener, useCapture);
                }
                else {
                    _super.prototype.addEventListener.call(this, type, listener, useCapture);
                }
            };
            HTMLMediaElement.prototype._dispatchEvent = function (eventName, eventData) {
                this._handleEvent(new CustomEvent(eventName, eventData));
            };
            HTMLMediaElement.prototype._handleEvent = function (evt) {
                this._eventHandler.handleEvent(evt);
            };
            HTMLMediaElement.prototype._getHandledEvents = function () {
                if (!this._handledEvents) {
                    for (var evt in videomock.event.MediaEvent) {
                        this._handledEvents.push(videomock.event.MediaEvent[evt]);
                    }
                }
                return this._handledEvents;
            };
            HTMLMediaElement.HAVE_NOTHING = 0;
            HTMLMediaElement.HAVE_METADATA = 1;
            HTMLMediaElement.HAVE_CURRENT_DATA = 2;
            HTMLMediaElement.HAVE_FUTURE_DATA = 3;
            HTMLMediaElement.HAVE_ENOUGH_DATA = 4;
            return HTMLMediaElement;
        })(HTMLDivElement);
        dom.HTMLMediaElement = HTMLMediaElement;
    })(dom = videomock.dom || (videomock.dom = {}));
})(videomock || (videomock = {}));
/// <reference path="HTMLMediaElement.ts" />
var videomock;
(function (videomock) {
    var dom;
    (function (dom) {
        var HTMLVideoElement = (function (_super) {
            __extends(HTMLVideoElement, _super);
            function HTMLVideoElement() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(HTMLVideoElement.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLVideoElement.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLVideoElement.prototype, "videoHeight", {
                get: function () {
                    return this._videoHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLVideoElement.prototype, "videoWidth", {
                get: function () {
                    return this._videoWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTMLVideoElement.prototype, "poster", {
                get: function () {
                    return this._poster;
                },
                set: function (value) {
                    this._poster = value;
                },
                enumerable: true,
                configurable: true
            });
            HTMLVideoElement.prototype.getVideoPlaybackQuality = function () {
                throw 'not implemented';
            };
            HTMLVideoElement.prototype.webkitEnterFullScreen = function () {
                this.webkitEnterFullscreen();
            };
            HTMLVideoElement.prototype.webkitEnterFullscreen = function () {
                throw 'not implemented';
            };
            HTMLVideoElement.prototype.webkitExitFullScreen = function () {
                this.webkitExitFullscreen();
            };
            HTMLVideoElement.prototype.webkitExitFullscreen = function () {
                throw 'not implemented';
            };
            return HTMLVideoElement;
        })(dom.HTMLMediaElement);
        dom.HTMLVideoElement = HTMLVideoElement;
    })(dom = videomock.dom || (videomock.dom = {}));
})(videomock || (videomock = {}));
var videomock;
(function (videomock) {
    var helper;
    (function (helper) {
        var HTMLHelper = (function () {
            function HTMLHelper() {
            }
            HTMLHelper.applyStyle = function (element, style) {
                for (var att in style) {
                    if (element.style.hasOwnProperty(att)) {
                        element.style[att] = style[att];
                    }
                }
            };
            return HTMLHelper;
        })();
        helper.HTMLHelper = HTMLHelper;
    })(helper = videomock.helper || (videomock.helper = {}));
})(videomock || (videomock = {}));
/// <reference path="../helper/HTMLHelper.ts" />
var videomock;
(function (videomock) {
    var dom;
    (function (dom) {
        var VideoContainer = (function () {
            function VideoContainer() {
                this.mainContainer = document.createElement('div');
                videomock.helper.HTMLHelper.applyStyle(this.mainContainer, {
                    'position': 'relative',
                    'backgroundColor': '#000000',
                });
                this.videoContainer = document.createElement('div');
                videomock.helper.HTMLHelper.applyStyle(this.videoContainer, {
                    'position': 'absolute',
                    'backgroundColor': '#CCCCCC',
                    'top': '0',
                    'left': '0',
                });
                this.mainContainer.appendChild(this.videoContainer);
                this.countdownContainer = document.createElement('div');
                videomock.helper.HTMLHelper.applyStyle(this.countdownContainer, {
                    'textAlign': 'center',
                    'color': '#FFFFFF',
                    'marginTop': (this.height - this.countdownContainer.offsetHeight) / 2
                });
                this.mainContainer.appendChild(this.videoContainer);
            }
            VideoContainer.prototype.getContainer = function () {
                return this.mainContainer;
            };
            Object.defineProperty(VideoContainer.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                    this.updateDisplay();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VideoContainer.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                    this.updateDisplay();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VideoContainer.prototype, "videoWidth", {
                get: function () {
                    return this._videoWidth;
                },
                set: function (value) {
                    this._videoWidth = value;
                    this.updateDisplay();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VideoContainer.prototype, "videoHeight", {
                get: function () {
                    return this._videoHeight;
                },
                set: function (value) {
                    this._videoHeight = value;
                    this.updateDisplay();
                },
                enumerable: true,
                configurable: true
            });
            VideoContainer.prototype.setCurrentTime = function (time) {
                this.currentTime = time;
                this.updateDisplay();
            };
            VideoContainer.prototype.updateDisplay = function () {
                videomock.helper.HTMLHelper.applyStyle(this.mainContainer, {
                    'width': this.width + 'px',
                    'height': this.height + 'px'
                });
                if (this.videoWidth > this.width || this.videoHeight > this.height) {
                }
                videomock.helper.HTMLHelper.applyStyle(this.videoContainer, {
                    'width': this.videoWidth + 'px',
                    'height': this.videoHeight + 'px',
                    'overflow': 'hidden',
                    'top': (this.width - this.videoWidth) / 2,
                    'left': (this.height - this.videoHeight) / 2
                });
                this.countdownContainer.innerHTML = String(this.currentTime);
            };
            return VideoContainer;
        })();
        dom.VideoContainer = VideoContainer;
    })(dom = videomock.dom || (videomock.dom = {}));
})(videomock || (videomock = {}));
/// <reference path="../model/ISourceData.ts" />
var videomock;
(function (videomock) {
    var constant;
    (function (constant) {
        var Source = (function () {
            function Source() {
            }
            Source.getDataFromSource = function (id) {
                var constName;
                for (var str in Source) {
                    if (typeof Source[str] === 'string') {
                        constName = str;
                    }
                }
                if (!constName) {
                    throw 'data with id ' + id + ' doesn\'t exists';
                }
                var exploded = str.split('-');
                var size = exploded[0].split('x');
                return {
                    'width': size[0],
                    'height': size[1],
                    'duration': exploded[1]
                };
            };
            Source.VIDEO_640x360_30S = '640x360-30s';
            return Source;
        })();
        constant.Source = Source;
    })(constant = videomock.constant || (videomock.constant = {}));
})(videomock || (videomock = {}));
/// <reference path="dom/HTMLVideoElement.ts" /> 
/// <reference path="dom/VideoContainer.ts" /> 
/// <reference path="model/ISourceData.ts" /> 
/// <reference path="constant/Source.ts" /> 
/// <reference path="event/MediaEvent.ts" /> 
var videomock;
(function (videomock) {
    var VideoMock = (function (_super) {
        __extends(VideoMock, _super);
        function VideoMock() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(VideoMock.prototype, "src", {
            set: function (value) {
                var _this = this;
                this._src = value;
                this._currentSrc = this.src;
                var data;
                try {
                    data = videomock.constant.Source.getDataFromSource(value);
                }
                catch (e) {
                    data = videomock.constant.Source.getDataFromSource(videomock.constant.Source.VIDEO_640x360_30S);
                }
                this._dispatchEvent(videomock.event.MediaEvent.loadstart);
                var intervalId;
                var virtualSize = 3000;
                var prevLoaded = 0;
                var loaded = 0;
                var step = 100;
                var first = true;
                intervalId = setInterval(function () {
                    prevLoaded = loaded;
                    loaded += step * 1000;
                    if (loaded >= virtualSize) {
                        loaded = virtualSize * 1000;
                    }
                    if (loaded === virtualSize) {
                        clearInterval(intervalId);
                    }
                    if (first) {
                        first = false;
                        _this._dispatchEvent(videomock.event.MediaEvent.loadeddata);
                        _this._duration = data.duration;
                        _this._videoWidth = data.width;
                        _this._videoHeight = data.height;
                        _this._dispatchEvent(videomock.event.MediaEvent.loadedmetadata);
                        _this._dispatchEvent(videomock.event.MediaEvent.durationchange);
                        _this._dispatchEvent(videomock.event.MediaEvent.canplay);
                        _this._dispatchEvent(videomock.event.MediaEvent.canplaythrough);
                    }
                    _this._buffered.addRange(prevLoaded, loaded);
                    _this._handleEvent(new ProgressEvent(videomock.event.MediaEvent.progress, {
                        'lengthComputable': true,
                        'loaded': loaded,
                        'total': virtualSize * 1000
                    }));
                }, step);
                if (this.autoplay) {
                    this.play();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VideoMock.prototype, "controls", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VideoMock.prototype, "videoWidth", {
            set: function (value) {
                this._videoWidth = value;
                this._videoDisplay.width = this.videoWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VideoMock.prototype, "videoHeight", {
            set: function (value) {
                this._videoHeight = value;
                this._videoDisplay.height = this.videoHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VideoMock.prototype, "currentTime", {
            set: function (value) {
                this._currentTime = value;
            },
            enumerable: true,
            configurable: true
        });
        VideoMock.prototype.play = function () {
            this.paused = false;
            if (!this._hasStarted) {
                this._hasStarted = true;
                this._dispatchEvent(videomock.event.MediaEvent.play);
                this._startPlaybackTimer();
            }
            else {
                this._dispatchEvent(videomock.event.MediaEvent.playing);
            }
            this._createDisplay();
        };
        VideoMock.prototype.pause = function () {
            if (!this.paused) {
                this.paused = true;
            }
        };
        VideoMock.prototype.load = function () {
            this.src = this._src;
        };
        VideoMock.prototype._createDisplay = function () {
            this._videoDisplay = new videomock.dom.VideoContainer();
            this.appendChild(this._videoDisplay.getContainer());
        };
        VideoMock.prototype._startPlaybackTimer = function () {
            var _this = this;
            if (!this._playbackTimerId) {
                var step = 100;
                this._playbackTimerId = setInterval(function () {
                    if (!_this.paused) {
                        _this.currentTime += step / 1000;
                        if (_this.currentTime >= _this.duration) {
                            _this._currentTime = _this.duration;
                            _this._dispatchEvent(videomock.event.MediaEvent.ended);
                            _this._stopPlaybackTimer();
                        }
                        else {
                            _this._dispatchEvent(videomock.event.MediaEvent.timeupdate);
                        }
                        _this._videoDisplay.updateDisplay();
                    }
                }, step);
            }
        };
        VideoMock.prototype._stopPlaybackTimer = function () {
            if (this._playbackTimerId) {
                clearInterval(this._playbackTimerId);
            }
        };
        VideoMock.prototype._replay = function () {
            this._stopPlaybackTimer();
            this.currentTime = 0;
            this.play();
        };
        VideoMock.prototype._handleEvent = function (evt) {
            switch (evt.type) {
                case videomock.event.MediaEvent.ended:
                    if (this.loop) {
                        this._replay();
                    }
                    break;
                case videomock.event.MediaEvent.timeupdate:
                    this._videoDisplay.setCurrentTime(this.currentTime);
                    break;
            }
            _super.prototype._handleEvent.call(this, evt);
        };
        return VideoMock;
    })(videomock.dom.HTMLVideoElement);
    videomock.VideoMock = VideoMock;
})(videomock || (videomock = {}));
