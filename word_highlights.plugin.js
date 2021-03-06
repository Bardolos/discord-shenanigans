//META{"name":"word_highlights"}*//

var word_highlights = function () {};
var word_highlights_enabled = false;


word_highlights.prototype.parse = function (list) {
    if( list=== null)
      return;
      
    $(".message").each(function() {

        var m = $(this);

        var markup = $(".markup", this);
        var m_sub_msg = $(".message-content", markup);

        var m_content = "";

        if( m_sub_msg.length != 0 ){
          m_content = m_sub_msg.text();
        }
        else{
          m_content = markup.text();
        }

        var emoji_alts = [];

        $("img", markup).each( function() {
          emoji_alts.push( $(this).attr('alt') );
        })

        bingo = false;
        emoji_bingo = false;

        list.every(function(word) {
          bingo = (new RegExp(word, "i")).test(m_content);

          emoji_alts.forEach( function(alt) {
            emoji_bingo = (new RegExp(word, "i")).test(alt);
            if(emoji_bingo)
              return false;
            return true;
          })

          if(bingo)
            return false;
          return true;
        });

        if ((bingo || emoji_bingo) && !m.hasClass("mentioned"))
          m.addClass("whisperlighted");
        else
          m.removeClass("whisperlighted");

    });
};

word_highlights.prototype.onMessage = function () {

 
  this.parse(hl);
};

word_highlights.prototype.observer = function (e) {
// onMessage event is broken
if(!e.addedNodes[0] ||  !(e.addedNodes[0].className && e.addedNodes[0].className.toString().includes("message")))
    return;

var hl = bdPluginStorage.get("wWordHighlights", "highlight_list");
this.parse(hl);
};



word_highlights.prototype.onSwitch = function () {
  var hl = bdPluginStorage.get("wWordHighlights", "highlight_list");
  this.parse(hl);
};

word_highlights.prototype.injectCSS = function () {
  $(`<style type='text/css' class='whisperstyle'> 
  .message-group .whisperlighted .message-text{ 
    background:rgba(221,50,50,.2); 
    -webkit-border-radius:0 2px 2px 0; 
    border-radius:0 2px 2px 0; 
    position:relative } 
    
  .message-group .whisperlighted .message-text:after{ 
    position:absolute; 
    top:0; 
    left:-6px; 
    bottom:0; 
    content:' '; 
    width:2px; 
    background:rgba(221,50,50,.2); 
    border-left:4px solid #dd3232; 
    -webkit-border-radius:2px 0 0 2px; 
    border-radius:2px 0 0 2px } 
    
  .message-group.compact .message .message-text .markup.whisperlighted .timestamp{ 
    color:#b2bfc8 } 
    
  .theme-dark .message-group.compact .whisperlighted .timestamp{ 
    color:rgba(255,255,255,.3) } 
    
  .theme-dark .message-group .whisperlighted .message-text{ 
    background:rgba(221,50,50,.37) } 
    </style>`).appendTo("head");
};

word_highlights.prototype.ejectCSS = function () {
  $(".whisperstyle").remove();
};

word_highlights.prototype.start = function () {
  var hl = bdPluginStorage.get("wWordHighlights", "highlight_list");
  word_highlights_enabled = true;
  this.parse(hl);
};

word_highlights.prototype.load = function () {
  this.injectCSS();
};
word_highlights.prototype.unload = function () {
  this.ejectCSS();
  word_highlights_enabled = false;
  this.clear_words();
};

word_highlights.prototype.stop = function () {
  word_highlights_enabled = false;
  this.clear_words();
};

word_highlights.prototype.clear_words = function () {
  $(".message").each(function() {
    $(this).removeClass("whisperlighted");
  });
};

word_highlights.prototype.getSettingsPanel = function () {

    var hl = bdPluginStorage.get("wWordHighlights", "highlight_list");

    var doc = '';
    doc += '<h2 class="bda-name">Word highlights</h2>';
    doc += '<h3 style="padding-bottom: 10px; padding-top: 10px; color: #b0b6b9;">Settings</h3>';
    doc += '<textarea id="wordList" style="width:100%; min-height:200px;">';
    if(hl != undefined) {
        hl.forEach(function(word) {
            doc += word + "\n";
        });
    }
    doc += '</textarea>';
    doc += '<button style="' + `
    background: #7289da;
    color: #FFF;
    border-radius: 5px;
    height: 30px;
    display: block;
    width: 70px;
    margin: 5px;` + '" onclick="word_highlights.prototype.save()">Save</button>';
    doc += '<span style="color: #b0b6b9;">Add list of words to watch for here ( one per line );</span>';
    return doc;
};

word_highlights.prototype.save = function() {

    var wl = [];
    $("#wordList").val().split("\n").forEach(function(w) {
        if(w != "")
          wl.push(w);
    });

    bdPluginStorage.set("wWordHighlights", "highlight_list", wl);


    if(word_highlights_enabled)
    {
      this.clear_words();
      this.parse(bdPluginStorage.get("wWordHighlights", "highlight_list"));
    }
};

word_highlights.prototype.getName = function () {
    return "Word Highlighter";
};
word_highlights.prototype.getDescription = function () {
    return "Highlights selected words";
};
word_highlights.prototype.getVersion = function () {
    return "1.0.5.1";
};
word_highlights.prototype.getAuthor = function () {
    return "whisperdraw";
};
