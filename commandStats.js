const storage = require("node-persist");

// Update Statistics
exports.update = function(commandName) {
    // Get data
    storage.getItem("commandStats").then((commandStats) => {
        if (commandStats === undefined) {
            commandStats = {};
            commandStats[commandName] = 1;
        } else {
            if (commandStats[commandName] === undefined) {
                commandStats[commandName] = 1;
            } else {
                commandStats[commandName]++;
            }
        }
        storage.setItem("commandStats", commandStats);
    });
};