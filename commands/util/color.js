const commando = require("discord.js-commando");
const stats = require("../../commandStats");

class ColorCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "color",
            group: "util",
            memberName: "color",
            description: "Sets your role color",
            examples: ["!color <hex|random>"],
            guildOnly: true,

            args: [
                {
                    key: "color",
                    prompt: "What do you want your color set to? (6 character hex code, no hashtag)",
                    type: "string",
                    validate: (color) => {
                        const regex = /^[A-Fa-f0-9]{6}$/;
                        if(regex.test(color) || color == "random") {
                            return true;
                        } else {
                            return "The hex number must not start with a hashtag, be 6 characters long, and be valid hexadecimal";
                        }
                    }
                }
            ]
        });
    }

    async run(message, args) {
        // Statistics
        stats.update("color");

        // Set color variable
        var color = args.color;
        if(color == "random"){
            color = (Math.random()*0xFFFFFF<<0).toString(16);
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