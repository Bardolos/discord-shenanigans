//META{"name":"emoji_scaler"}*//

var emoji_scaler = function () {};
var emoji_scaler_enabled = false;

emoji_scaler.prototype.injectCSS = function () {


  var reg_size = "32";
  var jumbo_size = "32";
  var betterdiscord_size = "32";

  ls = JSON.parse(localStorage['hd_custom_res']);

    if( ls != undefined)
    {
      reg_size = ls.regular;
      jumbo_size = ls.jumbo;
      betterdiscord_size = ls.betterdiscord;

      if(reg_size == undefined) reg_size = "32";
      if(jumbo_size == undefined) jumbo_size = "32";
      if(betterdiscord_size == undefined) betterdiscord_size = "32";
    }

  $("<style type='text/css' id='whisper-emote-magic'> \
  .markup .emoji{ \
 width: "+reg_size+"px; \
    height: "+reg_size+"px; \
} \
\
.markup .emoji.jumboable{ \
 width: "+jumbo_size+"px; \
    height: "+jumbo_size+"px; \
} \
 \
.message-group.compact .markup .emoji { \
  \
 width: "+reg_size+"px; \
    height: "+reg_size+"px; \
}    \
 \
.message-group.compact .markup .emoji.jumboable { \
  \
 width: "+jumbo_size+"px; \
    height: "+jumbo_size+"px; \
}  \
 \
.markup .emotewrapper { \
 \
    height:"+betterdiscord_size+"px; \
} \
 \
.markup .emote { \
    max-height: inherit !important; \
     \
    height:100% !important; \
} \
    </style>").appendTo("head");
};

emoji_scaler.prototype.ejectCSS = function () {
  $("#whisper-emote-magic").remove();
};

emoji_scaler.prototype.start = function () {
  this.injectCSS();
  emoji_scaler_enabled = true;
};

emoji_scaler.prototype.load = function () {
  //this.injectCSS();
};
emoji_scaler.prototype.unload = function () {
  //this.ejectCSS();
};

emoji_scaler.prototype.stop = function () {
    this.ejectCSS();
    emoji_scaler_enabled = false;
};

emoji_scaler.prototype.refreshCSS = function() {
  this.ejectCSS();
  this.injectCSS();
}

emoji_scaler.prototype.getSettingsPanel = function () {

  var reg_size = "32";
  var jumbo_size = "32";
  var betterdiscord_size = "32";

  ls = JSON.parse(localStorage['hd_custom_res']);

    if( ls != undefined)
    {
      reg_size = ls.regular;
      jumbo_size = ls.jumbo;
      betterdiscord_size = ls.betterdiscord;

      if(reg_size == undefined) reg_size = "32";
      if(jumbo_size == undefined) jumbo_size = "32";
      if(betterdiscord_size == undefined) betterdiscord_size = "32";
    }

    var doc = '';
    doc += '<h2>Emote scaler</h2>';
    doc += '<h3>Settings</h3>';
    doc += 'Regular emotes: <input type="number" id="reg_size" min="1" max="128" value="' + reg_size +'"><br>';
    doc += 'Jumboable emotes: <input type="number" id="jumbo_size" min="1" max="128" value="' + jumbo_size +'"><br>';
    doc += 'BetterDiscord emotes: <input type="number" id="betterdiscord_size" min="1" max="128" value="' + betterdiscord_size +'""><br>';
    doc += '<button onclick="emoji_scaler.prototype.save()">Save</button>';
    return doc;
};

emoji_scaler.prototype.save = function() {

    obj = { regular : $("#reg_size").val(), jumbo : $("#jumbo_size").val(), betterdiscord: $("#betterdiscord_size").val() };

    localStorage['hd_custom_res'] = JSON.stringify(obj);


    if(emoji_scaler_enabled)
    {
      this.refreshCSS();
    }
};

emoji_scaler.prototype.getName = function () {
    return "Scaled Emotes";
};
emoji_scaler.prototype.getDescription = function () {
    return "Sets custom emote sizes";
};
emoji_scaler.prototype.getVersion = function () {
    return "1.0.5";
};
emoji_scaler.prototype.getAuthor = function () {
    return "whisperdraw";
};
