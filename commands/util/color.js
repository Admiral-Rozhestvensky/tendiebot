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
        const regex = /^[A-Fa-f0-9]{6}$/;
        if (!regex.test(color)) {
            message.reply("Your color isn't a valid hexadecimal color, has a hashtag preceeding it, or is 3 characters long");
            return;
        }

        // Check for length and set color
        message.member.highestRole.setColor(color)
            .then(() => {
              message.reply(`Your role color has been set to ${color}`);
            }).catch((e) => { // Unhandled promise rejections are bad even though this will only happen when I run the command
              console.log("the color command failed with error:\n " + e);
              message.reply("The command has failed for reason: `" + e + "`");
              return;
            });
    }
}

module.exports = ColorCommand