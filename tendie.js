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

// General things to happen after the client turns on
client.on("ready", () => {
    // Color fun?
    var steps = 0, frequency = 0.2, phase1 = 0, phase2 = 2, phase3 = 4, center = 220, width = 35;

    function makeColors() {
        if (steps > 30) {
            steps = 1;
        } else {
            steps++;
        }

        for (var i = 0; i < steps; ++i) {
            var red = Math.sin(frequency * i + phase1) * width + center;
            var grn = Math.sin(frequency * i + phase2) * width + center;
            var blu = Math.sin(frequency * i + phase3) * width + center;
            var innerColor = [Math.round(red), Math.round(grn), Math.round(blu)];
        }
        return innerColor;
    }

    client.setInterval(() => {
        var rainbow = storage.getItem(settings.owner)
          .then((ownerData) => {
            if (ownerData.rainbow) {
                client.guilds.get("309166471135756321").roles.get("309166547748782080").setColor(makeColors());
            }
          });
    }, 1000);

    // Literal Game Changer
    var gameAmount = settings.games.length;
    var index = 0;
    client.setInterval(() => {
        client.user.setGame(settings.games[index]);
        if (index > settings.games.length - 1) {
            index = 0;
        } else {
            index++;
        }
    }, 30000);
});