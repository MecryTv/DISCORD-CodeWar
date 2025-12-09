const Event = require("../../structures/Events");
const UserNode = require("../../models/user/UserNode")
const Guardian = require("../../services/Guardian");

class AddVoiceKT extends Event {
    constructor(client) {
        super(client, "voiceStateUpdate", false);
        this.counters = new Map();
        this.timers = new Map();
        this.INTERVAL_TIME_MS = 5 * 60 * 1000;
    }

    async execute(oldState, newState) {
        const userId = newState.id;

        if (!oldState.channelId && newState.channelId) {
            this.counters.set(userId, 0);

            const intervalId = setInterval(() => {
                const currentCount = this.counters.get(userId) + 1;
                this.counters.set(userId, currentCount);
            }, this.INTERVAL_TIME_MS);

            this.timers.set(userId, intervalId);
        }

        if (oldState.channelId && !newState.channelId) {
            if (this.timers.has(userId)) {
                clearInterval(this.timers.get(userId));
                this.timers.delete(userId);
            }

            const ktCounter = this.counters.get(userId) || 0;
            this.counters.delete(userId);
            const finalKTCounter = ktCounter * 3;

            try {
                const [user] = await UserNode.findOrCreate({
                    where: { discordId: userId },
                    defaults: { discordId: userId }
                });

                await user.increment('kt', { by: finalKTCounter });
            } catch (error) {
                Guardian.handleEvent("Failed to Add Voice KT", "voiceStateUpdate Event", error.stack);
            }
        }
    }
}

module.exports = AddVoiceKT;