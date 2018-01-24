const commando = require("discord.js-commando");
const storage = require("node-persist");
const stats = require("../../commandStats");

class StatsCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: "stats",
			group: "util",
			memberName: "stats",
			description: "Prints out command usage statistics",
			examples: ["!stats"]
		});
	}

	async run(message, args) {
		// Statistics
        stats.update("stats");
        
        storage.getItem("commandStats").then(statsList => {
            var statsPrintable = ``;
            Object.keys(statsList).forEach(command => {
                statsPrintable += `${command} : ${statsList[command]}\n`;
            });
            message.channel.send(statsPrintable);
        });
	}
}

module.exports = StatsCommand