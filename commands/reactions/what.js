const commando = require("discord.js-commando");
const stats = require("../../commandStats");

class WhatCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: "what",
			group: "reactions",
			memberName: "what",
			description: "W H A T",
			examples: ["!what"]
		});
	}

	async run(message, args) {
		// Statistics
        stats.update("what");

		message.channel.send("http://i.imgur.com/Je3BxEQ.gif");
	}
}

module.exports = WhatCommand