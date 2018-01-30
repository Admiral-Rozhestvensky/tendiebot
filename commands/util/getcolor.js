const commando = require("discord.js-commando");
const storage = require("node-persist");
const stats = require("../../commandStats");

class CommandCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: "getcolor",
			group: "util",
			memberName: "getcolor",
			description: "Returns the color of someone's role",
            examples: ["!getcolor @t1mmu#8349"],

			args: [
				{
					key: "boi",
					prompt: "gib boi",
					type: "member"
				}
			]
		});
	}

	async run(message, args) {
		// Statistics
        stats.update("command");
      
      return boi.displayHexColor;

	}
}

module.exports = CommandCommand
