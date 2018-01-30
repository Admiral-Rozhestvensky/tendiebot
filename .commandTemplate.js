const commando = require("discord.js-commando");
const storage = require("node-persist");
const stats = require("../../commandStats");

class CommandCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: "command",
			group: "group",
			memberName: "command",
			description: "description",
            examples: ["examples"],

			args: [
				{
					key: "key",
					prompt: "prompt",
					type: "type"
				}
			]
		});
	}

	async run(message, args) {
		// Statistics
        stats.update("command");

	}
}

module.exports = CommandCommand