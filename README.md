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
