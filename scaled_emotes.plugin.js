//META{"name":"emoji_scaler"}*//

var emoji_scaler = function () {};
var emoji_scaler_enabled = false;

emoji_scaler.prototype.injectCSS = function () {

  var reg_size = "32";
  var jumbo_size = "32";
  var betterdiscord_size = "32";

  var ls = undefined;
  if(bdPluginStorage.get("wScaledEmotes", "hd_custom_res") !== undefined)
    ls = bdPluginStorage.get("wScaledEmotes", "hd_custom_res");

    if( ls != undefined)
    {
      reg_size = ls.regular;
      jumbo_size = ls.jumbo;
      betterdiscord_size = ls.betterdiscord;

      if(reg_size === undefined) reg_size = "32";
      if(jumbo_size === undefined) jumbo_size = "32";
      if(betterdiscord_size === undefined) betterdiscord_size = "32";
    }

  $(`<style type='text/css' id='whisper-emote-magic'>
  .markup .emoji{
 width: `+reg_size+`px;
    height: `+reg_size+`px;
}

.markup .emoji.jumboable{
 width: `+jumbo_size+`px;
    height: `+jumbo_size+`px;
}

.message-group.compact .markup .emoji {
 
 width: `+reg_size+`px;
    height: `+reg_size+`px;
}   

.message-group.compact .markup .emoji.jumboable {
 
 width: `+jumbo_size+`px;
    height: `+jumbo_size+`px;
} 

.markup .emotewrapper {

    height:`+betterdiscord_size+`px;
}

.markup .emote {
    max-height: inherit !important;
    
    height:100% !important;
}
    </style>`).appendTo("head");
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
  obj = { regular : $("#reg_size").val(), jumbo : $("#jumbo_size").val(), betterdiscord: $("#betterdiscord_size").val() };

  if(bdPluginStorage.get("wScaledEmotes", "hd_custom_res") === undefined)
    bdPluginStorage.set("wScaledEmotes", "hd_custom_res", obj);
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


    var ls = undefined;
    if(bdPluginStorage.get("wScaledEmotes", "hd_custom_res") !== undefined)
      ls = bdPluginStorage.get("wScaledEmotes", "hd_custom_res");


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
    doc += '<h2 class="bda-name">Emote scaler</h2>';
    doc += '<h3 style="padding-bottom: 10px; padding-top: 10px; color: #b0b6b9;">Settings</h3>';
    doc += '<span style="color: #b0b6b9;">Regular emotes: </span><input type="number" id="reg_size" min="1" max="128" value="' + reg_size +'"><br>';
    doc += '<span style="color: #b0b6b9;">Jumboable emotes: </span><input type="number" id="jumbo_size" min="1" max="128" value="' + jumbo_size +'"><br>';
    doc += '<span style="color: #b0b6b9;">BetterDiscord emotes: </span><input type="number" id="betterdiscord_size" min="1" max="128" value="' + betterdiscord_size +'""><br>';
    doc += '<button style="' + `
    background: #7289da;
    color: #FFF;
    border-radius: 5px;
    height: 30px;
    display: block;
    width: 70px;
    margin: 5px;` + '" onclick="emoji_scaler.prototype.save()">Save</button>';
    return doc;
};

emoji_scaler.prototype.save = function() {

    obj = { regular : $("#reg_size").val(), jumbo : $("#jumbo_size").val(), betterdiscord: $("#betterdiscord_size").val() };

    bdPluginStorage.set("wScaledEmotes", "hd_custom_res", obj);


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
    return "1.0.5.1";
};
emoji_scaler.prototype.getAuthor = function () {
    return "whisperdraw";
};
