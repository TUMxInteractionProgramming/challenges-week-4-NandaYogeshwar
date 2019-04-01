/* #6 start the #external #action and say hello */
console.log("App is alive");

var currentChannel = sevenContinents;
var currentLocation = {
    longitude: 11.572739,
    latitude: 48.150507,
    what3words: "akzent.balkone.erwachte"
}

/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelName Text which is set
 */
function switchChannel(channel) {
    //Log the channel switch
    console.log("Tuning in to channel", channel);

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = channel.name;

    //#6 change the #channel #location
    document.getElementById('channel-location').innerHTML = 'by <a href="http://w3w.co/' + channel.createdBy + '" target="_blank"><strong>' + channel.createdBy + '</strong></a>';

    channel.starred ? $('#channel-star').removeClass('far').addClass('fas') : $('#channel-star').removeClass('fas').addClass('far');

    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channel.name + ')').addClass('selected');

    currentChannel = channel;
    console.log(currentChannel);
}

/* #6 #liking a channel on #click */
function star() {
    // Toggle star of chat-bar
    $('#channel-star').toggleClass('fas far');
    // Change starred attribute for respective channel object
    currentChannel.starred = !currentChannel.starred;
    // Toggle star in channel list
    $("#channel-list .selected i").toggleClass("fas far");
}

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar i').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}
