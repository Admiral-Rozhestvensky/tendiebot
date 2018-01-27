const commando = require("discord.js-commando");
const storage = require("node-persist");
const stats = require("../../commandStats");

class GetCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: "get",
			group: "util",
			memberName: "get",
			description: "Gets your thing from memory",
			examples: ["!get"]
		});
	}

	async run(message, args) {
		// Statistics
		stats.update("get");

		// Get data
		storage.getItem(message.author.id).then((userData) => {
			// Check for undefined
			if (userData === undefined) {
				message.reply("Your data is undefined. Please run !put with something to store");
			} else {
				// Check for undefined
				if (userData.data === undefined) {
					message.reply("Your data is undefined. Please run !put with something to store");
				} else {
					// Send data
					message.reply(userData.data);
				}
			}
        });
	}
}

module.exports = GetCommand