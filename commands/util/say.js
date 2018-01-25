const commando = require("discord.js-commando");
const stats = require("../../commandStats");

class SayCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: "say",
			group: "util",
			memberName: "say",
			description: "Make Tendie say something (auto deletes command message)",
            examples: ["!say"]
		});
	}

	async run(message, args) {
		// Statistics
        stats.update("say");
		
        // Check for empty strings/whitespace
        if (args == "" || args.search(/^ +/) != -1) {
            message.delete().catch(() => {});
            return;
        }
        // Say args
        message.channel.send(args);
		message.delete().catch(() => {});
		
		// Log user and message to console
		console.log(`say called by ${message.author.username} with message: ${args}`);
	}
}

module.exports = SayCommand