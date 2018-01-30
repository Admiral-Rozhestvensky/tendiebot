const commando = require("discord.js-commando");
const storage = require("node-persist");
const stats = require("../../commandStats");

class PutCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: "put",
			group: "util",
			memberName: "put",
			description: "Puts your thing into memory",
			examples: ["!put <string>"],

			args: [
				{
					key: "data",
					prompt: "What do you want to put in memory?",
					type: "string"
				}
			]
		});
	}

	async run(message, args) {
		// Statistics
        stats.update("put");

		// Get data
		storage.getItem(message.author.id).then((userData) => {
			// Check for undefined
			if (userData === undefined) {
				// Create new object and save data
				userData = {};
				userData.data = args.data;
				storage.setItem(message.author.id, userData);
			} else {
				// Set and save data
				userData.data = args.data;
				storage.setItem(message.author.id, userData);
			}
		});
		// Reply
		message.reply("Saved!");
	}
}

module.exports = PutCommand