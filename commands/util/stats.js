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
        
        // TODO: make this print an ordered list
        storage.getItem("commandStats").then(statsList => {
            /*var statsPrintable = ``;
            Object.keys(statsList).forEach(command => {
                statsPrintable += `${command} : ${statsList[command]}\n`;
            }).then( () => {
                message.channel.send(statsPrintable);
            });*/
            var max = -1, maxKey, statsPrintable;
            Object.keys(statsList).forEach((key) => {
                if (statsList[key] > max) {
                    maxKey = key;
                    max = statsList[key];
                }
            });
            statsPrintable += `${maxKey} : ${statsList[maxKey]}`
        });
	}
}

module.exports = StatsCommand