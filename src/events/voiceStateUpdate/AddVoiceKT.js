const Event = require("../../structures/Events");
const userNodeCache = require("../../cache/UserNodeCache");
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

            if (finalKTCounter > 0) {
                try {
                    await userNodeCache.increment(userId, 'kt', finalKTCounter);
                } catch (error) {
                    Guardian.handleEvent("Failed to Add Voice KT to Cache", "voiceStateUpdate Event", error.stack);
                }
            }
        }
    }
}

module.exports = AddVoiceKT;