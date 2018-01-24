const commando = require("discord.js-commando");
const stats = require("../../commandStats");

class ZoobooCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: "zooboo",
			group: "reactions",
			memberName: "zooboo",
			description: "Zooboo!",
			examples: ["!zooboo"]
		});
	}

	async run(message, args) {
		// Statistics
        stats.update("zooboo");

		message.channel.send("http://i.imgur.com/HrFFv8A.gif");
		message.channel.send("zooboo", { tts: true });
	}
}

module.exports = ZoobooCommand