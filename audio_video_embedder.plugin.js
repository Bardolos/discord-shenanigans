//META{"name":"audio_video_embedder"}*//

var audio_video_embedder = function () {};
var audio_video_embedder_enabled = false;
var audio_video_embedder_enabled_video_formats = [ "mp4", "webm", "ogv", "ogm", "m4v"];
var audio_video_embedder_enabled_audio_formats = [ "mp3", "wav", "wma", "ogg", "oga", "m4a", "aac"];

audio_video_embedder.prototype.parse = function () {

    $(".message").each(function() {

        var m = $(this);

        var link = $(".markup a, .attachment a", m);

        if(link.hasClass("whisperwrapped") ) return true;

        var url  = link.attr('href');

        if( url == undefined) return true;

        url = encodeURI( decodeURI(url.replace(/^http:/, 'https:')) ); //make link safe

        var acc = $('.accessory', m);

        var filename = /[^.]+$/.exec(url)[0].toLowerCase();

        if( $.inArray(filename, audio_video_embedder_enabled_video_formats) >= 0)
        {
          //videolink
          console.log(filename)
          console.log(acc)
          acc.append(
            '<div class="embed-wrapper"> \
              <div class="embed-color-pill"></div> \
              <div class="embed whisper-video-magic"> \
                <video controls preload="metadata" src=' + url +'> \
                  <source src="' + url +'" type="video/'+filename+'">\
                </video> \
              </div> \
            </div>'
          )
        }
        else if( $.inArray(filename, audio_video_embedder_enabled_audio_formats) >= 0)
        {
          //audio
          acc.append(
            '<div class="embed-wrapper"> \
              <div class="embed-color-pill"></div> \
              <div class="embed whisper-audio-magic"> \
                <audio controls preload="metadata" src='+ url +'></audio> \
              </div> \
            </div>'
          )
        }

        link.addClass("whisperwrapped");

    });
};


audio_video_embedder.prototype.injectCSS = function () {

  $("<style type='text/css' id='whisper-audio-video-magic'> \
      .embed.whisper-video-magic video, .embed.whisper-audio-magic audio { max-width: 100%; }\
    </style>").appendTo("head");
};

audio_video_embedder.prototype.ejectCSS = function () {
  $("#whisper-video-magic").remove();
  $("#whisper-audio-magic").remove();
  $("#whisper-audio-video-magic").remove();
};


audio_video_embedder.prototype.onMessage = function () {
  this.parse();
};
audio_video_embedder.prototype.onSwitch = function () {
  this.parse();
};

audio_video_embedder.prototype.start = function () {
  this.injectCSS();
  audio_video_embedder_enabled = true;
};

audio_video_embedder.prototype.load = function () {
};
audio_video_embedder.prototype.unload = function () {
};

audio_video_embedder.prototype.stop = function () {
    this.ejectCSS();
    audio_video_embedder_enabled = false;
};

audio_video_embedder.prototype.refreshCSS = function() {
  this.ejectCSS();
  this.injectCSS();
}

audio_video_embedder.prototype.getSettingsPanel = function () {
    return '';
};

audio_video_embedder.prototype.getName = function () {
    return "Video and Audio Embeds";
};
audio_video_embedder.prototype.getDescription = function () {
    return "Embeds uploaded video and audio.";
};
audio_video_embedder.prototype.getVersion = function () {
    return "1.0.5";
};
audio_video_embedder.prototype.getAuthor = function () {
    return "whisperdraw";
};
