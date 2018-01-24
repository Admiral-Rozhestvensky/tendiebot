const commando = require("discord.js-commando");
const stats = require("../../commandStats");

class STFUCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: "stfu",
			group: "reactions",
			memberName: "stfu",
			description: "Papa Franku wants you to shut up",
			examples: ["!stfu"]
		});
	}

	async run(message, args) {
		// Statistics
        stats.update("stfu");

		message.channel.send("https://www.youtube.com/watch?v=OLpeX4RRo28");
	}
}

module.exports = STFUCommand