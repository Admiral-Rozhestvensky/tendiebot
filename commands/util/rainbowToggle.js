const commando = require("discord.js-commando");
const storage = require("node-persist");
const stats = require("../../commandStats");

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
        if (message.author.id != "240268796173090819") {
            message.reply("This command can only be run by the bot owner");
            return;
        }

        // Get data
        storage.getItem("240268796173090819")
          .then((userData) => {
			if (userData.rainbow) {
                userData.rainbow = false;
                message.member.highestRole.setColor("206694");
            } else {
                userData.rainbow = true;
            }
            storage.setItem("240268796173090819", userData);
		  });
	}
}

module.exports = RainbowToggleCommand