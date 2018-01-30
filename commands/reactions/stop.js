const commando = require("discord.js-commando");
const stats = require("../../commandStats");

class StopCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: "stop",
			group: "reactions",
			memberName: "stop",
			description: "Get some help",
			examples: ["!stop"]
		});
	}

	async run(message, args) {
		// Statistics
        stats.update("stop");

		message.channel.send("https://www.youtube.com/watch?v=9Deg7VrpHbM");
	}
}

module.exports = StopCommand