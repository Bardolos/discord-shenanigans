# whisperdraw's discord shenanigans

This page is a random assortment of japes. Instructions follow.

Feel free to contact me on Discord: _**whisperdraw#5950**_.


#### HOW TO INSTALL BETTER DISCORD PLUGINS


1. **Make sure you have the [BetterDiscord](https://betterdiscord.net/home/) plugin!**
2. Click User Settings
3. Click BetterDiscord (on the bottom left)
4. Go to the Plugins tab
5. Click the *Open Plugin Folder* button and a folder will open
6. Download the _.plugin.js_ file and paste it on that folder
7. **Restart Discord**
8. Go back to the Plugins tab
9. _(Optional) Tweak the plugins' settings_
10. Enable the desired plugins

#### SHUT UP CATEGORIES

This plugin allows you to mark categories as read with a click of a button, and if the category _was collapsed in the first place_ it will remain so.

![succ it zak jk love u](https://cdn.discordapp.com/attachments/261708042553393152/361847009256407041/shutup.gif "stupid simple")

##### SPECIFIC SETTINGS

This is essentially a selfbot, which is illegal, use at your own risk.

You need an authorization key for this to work. Create a file in your plugins directory named **suc_auth.config.json** and paste this inside: 

```
{
    "auth": "your_key"
}
```

Here are the steps to figure out whatever to put there:

1. Open Discord.
2. Press Ctrl+Shift+I to open developer tools.
3. Click the Network tab and make sure XHR is selected.

![just read tbh](https://cdn.discordapp.com/attachments/261708042553393152/361849493731147776/unknown.png "like in greece get it cos it's where ajax lives")

4. Right click some channel and select **Mark as Read**, this will trigger a network request named _ack_. Select this last request and under _Request Headers_ find the **authorization** field and copy the whole thing (marked in green in the picture below).

![just read tbh](https://cdn.discordapp.com/attachments/261708042553393152/361854811634925572/unknown.png "copy the shit in green")
5. Paste it in the **suc_auth.config.json** file under "your_key" (be sure to keep the quoting marks. So it looks something like: 
```
{
    "auth": "dlasjdnsaDAJFASfiasdn9asd987yash8hRANDOM1234897GIBBERISHddkab"
}
```

After it just restart discord and you're good.

Press the "Shut Up" button near a category to mark as read.


#### AUDIO AND VIDEO EMBEDDER PLUGIN

This plugin allows you to embed local audio and video files, as well as links:

![alt text](https://cdn.discordapp.com/attachments/223851348750237699/260576150340894720/unknown.png "videos not mine, song mine")

###### Acknowledgements

* **_Ryuunosuke_** - Plugin original idea.

##### SPECIFIC SETTINGS

No settings. Add the plugin and enable it - embedded audio and video files will be playable. Links to other formats like .webm will work as well.

#### SCALED EMOTES PLUGIN

This plugin allows you to customize emote size, like so:

![alt text](https://cdn.discordapp.com/attachments/247117358814986241/259884973547323398/unknown.png "dodged a bullet there")

###### Acknowledgements

* **_Erika_** - Hunter of the "parse undefined" bug.

##### SPECIFIC SETTINGS

On the Plugins tab of BetterDiscord settings you will see the Scaled Emotes plugin. When you click settings you will see multiple input boxes.

Type the dimension for each type of emote, up to 128:

* **Regular emotes**: Standard Discord emotes as well as Twitch sync'd ones, displayed on normal messages.
* **Jumboable emotes**: Discord and Twitch-sync'd emotes that are displayed at bigger sizes when the message consists solely of emotes.
* **BetterDiscord emotes**: FFZ and BetterDiscord emotes - these are usually lower resolution and might not scale well.

And _**click Save**_.

Make sure the plugin is enabled and you should be good to go.

###### TYPICAL SETTINGS

Regular Discord emotes are size 22, and jumboable emotes are size 32. BetterDiscord emotes vary.

I recommend the 32 - 64 - 32 setting. Regular emotes will be a bit bigger, and jumboable meotes will be doubled in size, which provides quite the improvement.

Feel free to experiment with these values and report if anything breaks.

#### WORD HIGHLIGHTER PLUGIN

This is a plugin that lets you highlight words like this:

![alt text](https://cdn.discordapp.com/attachments/247117358814986241/255462783896911873/plug2.png "Sslarable, official debugger")

###### Acknowledgements

* **_Sslarable_** - Original idea and debugging.
* **_Erika_** - Hunter of the Compact mode bug.
* **_Tech_** - Idea for emote highlighting as well.

##### SPECIFIC SETTINGS

On the Plugins tab of BetterDiscord settings you will see the Word Highlighter plugin. When you click settings you will see a text box.

Type the words you want to highlight, _**one per line**_.

And _**click Save**_.

Make sure the plugin is enabled and you should be good to go.

##### CHANGING THE HIGHLIGHT COLOR

Sadly I cannot be assed to implement a color picker, so here's a CSS hack you can use to customize your highlights:

```css
.message-group .whisperlighted .message-text{
    background:rgba(221,50,50,.2); }

  .message-group .whisperlighted .message-text:after{
    background:rgba(221,50,255,.2);
    border-left:4px solid #dd3232;}

  .theme-dark .message-group .whisperlighted .message-text{
    background:rgba(221,50,50,.37) }
```
Just put it in the custom CSS page and change the values to match your prefered color. Tip: #dd3232 and rgb(221,5050) are the same. The hex value changed the border, the rest changes the highlight - be sure to leave some alpha in there.
