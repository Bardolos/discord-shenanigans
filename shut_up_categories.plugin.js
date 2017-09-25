//META{"name":"shut_up_categories"}*//

var shut_up_categories = function () {};
var shut_up_categories_enabled = false;

shut_up_categories.prototype.start = function () {
  shut_up_categories_enabled = true;
};

shut_up_categories.prototype.load = function () {
};

shut_up_categories.prototype.unload = function () {
};

shut_up_categories.prototype.stop = function () {
};

shut_up_categories.prototype.getSettingsPanel = function () {
};

shut_up_categories.prototype.SHUTUP = function (event) {
    event.stopPropagation();

    //let sibs = 
    let parentReact = $(event.target.parentNode)[0][Object.keys($(event.target.parentNode)[0]).filter(function (p) {
        return p.indexOf("__reactInternalInstance") === 0;
    })]._currentElement;
    //ack all messages
    siblings = parentReact._owner._hostParent._hostParent._currentElement.props.children;

    suc_auth = bdPluginStorage.get("suc_auth", "auth");

    siblings.forEach(function(channel) {
        if(channel != null && channel.props.channel != null)
        {
            $.ajax({
                method: 'GET',
                url: 'https://discordapp.com/api/v6/channels/' + channel.props.channel.id + '/messages',
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", suc_auth);
                },
                data: {
                    limit: 1
                },
                success: function(data, status, req) {

                    if( status != 'success' || !data[0])
                        return;
                    $.ajax({
                        method: 'POST',
                        url: 'https://discordapp.com/api/v6/channels/' + channel.props.channel.id + '/messages/' + data[0].id + '/ack',
                        contentType: 'application/json',
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader ("Authorization", suc_auth);
                        },
                        success: function() {
                            parentReact.props.onClick();
                            setTimeout(parentReact.props.onClick, 50);
                        }
                    })
                }
            })
        }
    }, this);

    // CHANNEL_ACK
     //shitp GET https://discordapp.com/api/v6/channels/232712843470962688/messages (id)
     //last sp message https://discordapp.com/api/v6/channels/232712843470962688/messages/361660564835139586/ack

    //console.log(parentReact._owner._hostParent._currentElement._owner._currentElement);

};

shut_up_categories.prototype.hoverIn = function (event) {
    event.stopPropagation();
    $(this).fadeTo(200, 1)
};

shut_up_categories.prototype.hoverOut = function (event) {
    event.stopPropagation();
    $(this).fadeTo(200, 0.6)
};

shut_up_categories.prototype.addButtons = function (e) {

    // filter adition of category nodes
    // scry class names for wrapperDefault and wrapperCollapsed
    let isLegitWrapper = e.target.className.split(' ').filter( (cn) => {
        return (/wrapper(Default|Collapsed)-/g.exec(cn)) && (/wrapper(Default|Collapsed)-/g.exec(cn)).length > 0;
    })

    if(!isLegitWrapper || !(isLegitWrapper = isLegitWrapper.length > 0))
        return;

    //react to svg addition only (collapse caret, ignore plus sign)
    if(e.previousSibling !== null)
        return;

    //ignore if voice channel -> check for the underlying channel (eg.: voice general) and confirm with class
    if(e.target.parentNode.nextSibling != null && e.target.parentNode.nextSibling.firstChild != null && e.target.parentNode.nextSibling.firstChild.className.includes('wrapperDefaultVoice'))
        return;

    //since e catches the svg, next sibling is the title to which we append the button
    if(!e.addedNodes[0] || !(nsib = e.addedNodes[0].nextSibling) )
        return;

    //inject button
    $(`<button 
            class="whisper-button bot-tag"
            style="
                margin:0;
                margin-right: 5px;
                padding-left: 3px;
                padding-right: 3px;
                z-index=9999;
                opacity:0.6
            ">Shut Up</button>`)
        .click(this.SHUTUP)
        .hover(this.hoverIn, this.hoverOut)
        .insertAfter( $(nsib) );

};

shut_up_categories.prototype.observer = function (e) {
    this.addButtons(e)
};

shut_up_categories.prototype.getName = function () {
    return "Shut up, Categories";
};
shut_up_categories.prototype.getDescription = function () {
    return "Shut Up button to mark read and collapse categories.";
};
shut_up_categories.prototype.getVersion = function () {
    return "1.0.5";
};
shut_up_categories.prototype.getAuthor = function () {
    return "whisperdraw";
};
