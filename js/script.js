/* #6 start the #external #action and say hello */
console.log("App is alive");

var currentChannel;
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
    if(currentChannel.starred){
        document.querySelector("#channel-list .selected i").classList.remove("far");
        document.querySelector("#channel-list .selected i").classList.add("fas");
    } else {
        document.querySelector("#channel-list .selected i").classList.remove("fas");
        document.querySelector("#channel-list .selected i").classList.add("far");
    }
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

/*
* constructor for chat messages
*/
function Message(text) {
    this.createdBy = currentChannel.createdBy;
    this.latitude = currentLocation.latitude;
    this.longitude = currentLocation.longitude;
    this.createdOn = new Date();
    // Expiration: 15 minutes later
    this.expiresOn = new Date(this.createdOn.getTime() + 15*60000);
    this.text = text;
    this.own = true;
}

/**
 * send the entered message (to the server)
 */
function sendMessage() {
    // Get the user's input
    var input = $("#chat-input").val();
    var message = new Message(input);
    
    // Create a new message with that input
    var messageElement = createMessageElement(message);

    // Create a new message element and append it to html
    $("#messages").append(messageElement);
    $("#chat-input").val("");
    // Scroll to bottom of messages div after entering a new message
    $("#messages").scrollTop($('#messages')[0].scrollHeight);
}

/**
 * create a new HTML messag element to be appended to the chat area
 * @param messageObject the message corresponding with the entered input
 */
function createMessageElement(messageObject) {
    var timeNow = new Date();
    // Calculate the minutes, that are left
    var expiresIn = Math.round((((messageObject.expiresOn - timeNow) % 86400000) % 3600000) / 60000);

    // Append the class 'own' if the message's attribute 'own' is true
    var ownClass = "";
    messageObject.own ? ownClass = " own" : ownClass = "";
    // Create a new html message element
    var messageElement = '<div class="message' + ownClass + '">\n    <h3><a href="http://w3w.co/' + messageObject.createdBy + '" target="_blank"><strong>' + messageObject.createdBy + '</strong></a>\n        ' + messageObject.createdOn.toLocaleString() + ' <em>' + expiresIn + ' min. left</em></h3>\n    <p>' + messageObject.text + '</p>\n    <button>+5 min.</button>\n</div>';

    return messageElement;
}


/**
 * List all the available channels and append them to the body
 */
function listChannels() {
    var channel1 = createChannelElement(yummy);
    var channel2 = createChannelElement(sevenContinents);
    var channel3 = createChannelElement(killerApp);
    var channel4 = createChannelElement(firstPersonOnMars);
    var channel5 = createChannelElement(octoberfest);
    $("#channel-list").append(channel1 + '\n' + channel2 + '\n' + channel3 + '\n' + channel4 + '\n' + channel5);
    switchChannel(yummy);
}


/**
 * create a new HTML channel element to be appended to the channel area
 * @param channelObject the channel
 */
function createChannelElement(channelObject) {
    // create the channel object's variable name
    var firstLetter = channelObject.name.substring(1,2).toLowerCase();
    var channelName = firstLetter + channelObject.name.substring(2);

    // Either a filled or an empty star next to the channel, depending on its status
    var starred = channelObject.starred? "fas" : "far";
    
    // Create a new html channel element
    var messageElement = '<li onclick="switchChannel(' + channelName + ')">\n        ' + channelObject.name + '\n        <span class="channel-meta">\n            <i class="' + starred + ' fa-star"></i>\n            <!-- #5 #channels #icons now with chevron -->\n            <small>' + channelObject.expiresIn + ' min</small>\n            <small>' + channelObject.messageCount + ' new</small>\n            <i class="fas fa-chevron-right"></i>\n        </span>\n    </li>';

    return messageElement;

}