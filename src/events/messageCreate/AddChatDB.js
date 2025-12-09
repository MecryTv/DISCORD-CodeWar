const Event = require("../../structures/Events");
const UserNode = require("../../models/user/UserNode");
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
                const [user] = await UserNode.findOrCreate({
                    where: {discordId: userId},
                    defaults: {discordId: userId}
                });

                await user.increment('db', {by: 1});
                this.msgCounts.set(userId, 0);
            } catch (error) {
                Guardian.handleEvent("Failed to Add Chat DB", "messageCreate Event", error.stack);
            }
        }
    }
}

module.exports = AddChatDB;