const commando = require("discord.js-commando");
const storage = require("node-persist");
const stats = require("../../commandStats");
const settings = require("../../settings.json");

class RainbowToggleCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: "rainbowtoggle",
			group: "util",
			memberName: "rainbowtoggle",
			description: "Toggles rainbow colored role, only useable by bot owner",
            examples: ["!rainbowtoggle"],
		});
	}

	async run(message, args) {
		// Statistics
        stats.update("rainbowtoggle");
        
        // Check user
        if (message.author.id != settings.owner) {
            message.reply("This command can only be run by the bot owner");
            return;
        }

        // Get data
        storage.getItem(settings.owner)
          .then((userData) => {
            userData.rainbow = (userData.rainbow)? false : true;
            storage.setItem(settings.owner, userData);
            if (!userData.rainbow) message.member.highestRole.setColor("206694");
		  });
	}
}

module.exports = RainbowToggleCommand
