const commando = require("discord.js-commando");
const stats = require("../../commandStats");

class PruneCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: "prune",
			group: "util",
			memberName: "prune",
			description: "Prunes messages",
			examples: ["!prune <amount>"],
			guildOnly: true,
			args: [
				{
					key: "amount",
					prompt: "How many messages are you going to prune? (max of 100)",
					type: "integer",
					max: 100,
					min: 1
				}
			]
		});
	}

	async run(message, args) {
		// Statistics
        stats.update("prune");

		// Checks
		if (!message.member.hasPermission("ADMINISTRATOR")) {
			message.reply("You need administrator priveledges to run this command");
			return;
		}

		// Delete and reply
		message.channel.bulkDelete(args.amount + 1);
		message.reply(`Pruned ${args.amount} messages!`);
	}
}

module.exports = PruneCommand