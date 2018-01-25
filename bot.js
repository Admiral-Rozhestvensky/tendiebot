// Discord Bot Setup
const settings = require("./settings.json");
const discord = require("discord.js");
const commando = require("discord.js-commando");
const client = new commando.Client({
    owner: settings.owner,
    unknownCommandResponse: false
});
const path = require("path");

client.registry
    .registerGroups([
        ["main", "Commands"],
        ["util", "Utility"],
        ["reactions", "Reactions"]
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, "commands"));

// Storage Setup
const storage = require("node-persist");

storage.init({
    dir: "storage"
});

//Spotfiy API Setup
/*const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi({
    // Credentials here
});*/
const urlRegex = /open.spotify.com\/(track|album)\/[A-Za-z0-9\-\=]*/;

// Responses+
client.on("message", (message) => {
    // Create lowercase content variable for .includes() checking
    var content = message.content.toLowerCase();
    if (content.includes("dick") && content.includes("me")) message.channel.send(`-dicks ${message.author.nickname} harder-`);
    if (content.includes("hanzo")) message.channel.send('"CUNT" -Ragtagg');
    if (content.includes("🖕")) {
        message.delete();
        message.reply("This is a good Christian server, please refrain from using vulgar emojis.");
    }
    // Spotify Playlist
    if (urlRegex.test(message.content)) {
        var trackID = message.content.match(urlRegex)[0].slice(23);
        message.reply(`Your song with id ${trackID} would have been added to the spotify playlist`);
    }
});
client.on("messageUpdate", (omessage, nmessage) => {
    // Create lowercase content variable for .includes() checking
    var content = nmessage.content.toLowerCase();
    if (content.includes("🖕")) {
        nmessage.delete();
        nmessage.reply("This is a good Christian server, please refrain from using vulgar emojis.");
    }
});

// Login
client.login(settings.token);