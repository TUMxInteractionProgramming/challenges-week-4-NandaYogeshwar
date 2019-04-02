function Channel(name, createdBy){
    this.name = name;
    this.createdOn = new Date();
    this.createdBy = createdBy;
    this.starred = false;
    this.expiresIn = 100;
    this.messageCount = 999;
}

// Create some dummy channels
var yummy = new Channel("#Yummy", "minus.plus.yummy");
var sevenContinents = new Channel("#SevenContinents", "minus.plus.yummy");
var killerApp = new Channel("#KillerApp", "minus.plus.yummy");
var firstPersonOnMars = new Channel("#FirstPersonOnMars", "minus.plus.yummy");
var octoberfest = new Channel("#Octoberfest", "minus.plus.yummy");