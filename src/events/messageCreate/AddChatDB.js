const Event = require("../../structures/Events");
const userNodeCache = require("../../cache/UserNodeCache");
const Guardian = require("../../services/Guardian");

class AddChatDB extends Event {
    constructor(client) {
        super(client, "messageCreate", false);
        this.msgCounts = new Map();
    }

    async execute(message) {
        if (!message.inGuild() || message.author.bot) return;

        const userId = message.author.id;
        const currentCount = this.msgCounts.get(userId) || 0;

        const newCount = currentCount + 1;
        this.msgCounts.set(userId, newCount);

        if (newCount >= 20) {
            try {
                await userNodeCache.increment(userId, 'db', 1);
                this.msgCounts.set(userId, 0);
            } catch (error) {
                Guardian.handleEvent("Failed to Add Chat DB to Cache", "messageCreate Event", error.stack);
            }
        }
    }
}

module.exports = AddChatDB;