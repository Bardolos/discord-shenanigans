//META{"name":"spoiler_codec"}*//

var spoiler_codec = function () {};
var spoiler_codec_enabled = false;
var notice_string = "Get the spoiler_codec plugin to decode this on Discord. Link above."
//use this for reactjs black magick
const getInternalInstance = e => e[Object.keys(e).find(k => k.startsWith("__reactInternalInstance"))];


spoiler_codec.prototype.start = function () {
  spoiler_codec
_enabled = true;
  $('form').on('keypress', (function(e) {
        if(e.which == 13) {
            this.intercept(e);
        }
    }).bind(this));
};

spoiler_codec.prototype.load = function () {
    
};

spoiler_codec.prototype.unload = function () {
    
};

spoiler_codec.prototype.stop = function () {
    $('form').off('keypress');
};

spoiler_codec.prototype.getSettingsPanel = function () {
};

spoiler_codec.prototype.intercept = function (event) {
    
    //see if message is command
    regex = /^\$poiler:(["'])?(.*?)\1 (.*)/;
    texts = regex.exec( $(event.target).val() );

    if(!texts)
    {
        //not command, parse enter key
        return;
    }
    // stop enter key - swap message
    event.preventDefault();
    event.stopPropagation()

    // reactjs black magic to cleanse input
    getInternalInstance($('form')[0]).return.memoizedState.textValue = "";
    window.BDV2.reactDom.findDOMNode(event.target).blur();
    window.BDV2.reactDom.findDOMNode(event.target).focus();


    spoiler = texts[2];
    message = texts[3]

    // get api key from storage
    suc_auth = bdPluginStorage.get("suc_auth", "auth");
    data = this.generateData(spoiler, message);
    
    if(jQuery.isEmptyObject(data))
    {
        //spoiler not found, return failsafe
        return;
    }

    $.ajax({
        method: 'POST',
        url: 'https://discordapp.com/api/v6/channels/' + getInternalInstance( $('.chat')[0] ).return.memoizedState.channelId + '/messages',
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", suc_auth);
        },
        contentType: 'application/json',
        data: data
    })
    

};

//message parser
spoiler_codec.prototype.observer = function (e) {
// onMessage event is broken use react nodes instead
if(!e.addedNodes[0] ||  !(e.addedNodes[0].className && e.addedNodes[0].className.toString().includes("message")))
    return;

this.parse();
};

//replace links with button actions and remove notice
spoiler_codec.prototype.parse = function () {
    var self = this;
    $(".message").each(function() {

        var m = $(this);

        var embed = $('.accessory > div > div[class*="embedInner"]', this);
        var enc = $('div[class*="embedContent"] div[class*="embedDescription"]', embed)[0];
        var notice = $('div[class*="embedFooter"]', embed)[0];       
        var decode_button = $('div[class*="embedFields"] div[class*="embedFieldValue"] > a', embed)[0];


        if( notice && notice.textContent == notice_string){
            notice.remove();

            //we now know we are inside a decoder
            $(decode_button).off('click').on('click', (function(e) {
                e.preventDefault();
                e.stopPropagation(); 
                self.decode(decode_button, enc); 
            }));
            decode_button.href = '';
            decode_button.title = 'Click to show'
            decode_button.innerText = 'Show'
        }
    });
};

spoiler_codec.prototype.decode = function(button, data) {
        $(button).off('click').on('click', (function(e) {
            e.preventDefault();
            e.stopPropagation(); 
            this.encode(button, data); 
        }).bind(this));
        button.title = 'Click to hide'
        button.innerText = 'Hide'
        data.innerText = atob(data.innerText)
}

spoiler_codec.prototype.encode = function(button, data) {
        $(button).off('click').on('click', (function(e) {
            e.preventDefault();
            e.stopPropagation(); 
            this.decode(button, data); 
        }).bind(this));
        button.title = 'Click to hide'
        button.innerText = 'Show'
        data.innerText = btoa(data.innerText)
}

spoiler_codec.prototype.generateData = function (spoiler, message) {
   
   //encrypt message
   enc_m = btoa(message);

    return `{
        "content": "",
        "embed": {
            "type": "rich",
            "color": 4915330,
            "title": "Spoiler for ${spoiler}",
            "description": "${enc_m}",
            "footer": {
                "text": "${notice_string}",
                "icon_url" : "https://cdn.discordapp.com/emojis/259890908546334721.png"
            },
            "fields" : [
                {
                    "name" : "Visibility",
                    "value" : "https://bardolos.github.io/discord-shenanigans/?enc=${enc_m}",
                    "inline" : false
                }
            ]
        }
    }`;
}

spoiler_codec.prototype.getName = function () {
    return "spoiler codec";
};
spoiler_codec.prototype.getDescription = function () {
    return "encodes spoilers in base64 and decodes them at the press of a button";
};
spoiler_codec.prototype.getVersion = function () {
    return "1.0.5";
};
spoiler_codec.prototype.getAuthor = function () {
    return "whisperdraw";
};
