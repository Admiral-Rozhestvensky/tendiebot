const commando = require("discord.js-commando");
const stats = require("../../commandStats");

class ColorCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: "color",
			group: "util",
			memberName: "color",
			description: "Sets your role color",
            examples: ["!color <hex>"],
            guildOnly: true,

			args: [
				{
					key: "color",
					prompt: "What do you want your color set to? (3 character or 6 character hex code, no hashtag)",
					type: "string"
				}
			]
		});
	}

	async run(message, args) {
		// Statistics
        stats.update("color");

        // Set color variable
        var color = args.color;

        // Check for valid hex
        const regex = /[0-9a-fA-F]*/;
        if (!regex.test(color)) {
            message.reply("Your color isn't a valid hexadecimal number or has a hashtag preceeding it");
            return;
        }

        // Check for length and set color
        if (color.length == 3 || color.length == 6) {
            message.member.highestRole.setColor(color)
              .then( () => {
                message.reply(`Your role color has been set to ${color}`);
              }).catch( (e) => { // Unhandled promise rejections are bad even though this will only happen when I run the command
                console.log("the color command failed with error:\n " + e);
                message.reply("The command has failed for reason: `"  + e + "`");
                return;
              });
        } else {
            message.reply("Your color doesn't have a correct length (3 or 6 digit hex)");
            return;
        }
	}
}

module.exports = ColorCommand