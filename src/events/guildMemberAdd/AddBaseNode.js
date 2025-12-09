const Event = require("../../structures/Events");
const userNodeCache = require("../../cache/UserNodeCache");
const Guardian = require("../../services/Guardian");

class AddBaseNode extends Event {
    constructor(client) {
        super(client, "guildMemberAdd", false);
    }

    async execute(member) {
        try {
            let cachedData = await userNodeCache.get(member.id);

            if (!cachedData) {
                await userNodeCache.set(member.id, {
                    kt: 50,
                    db: 0,
                    shd: 100,
                    atk: 50,
                    eff: 100,
                    level: 1
                });
            }
        } catch (error) {
            Guardian.handleEvent("Fehler beim Hinzufügen des Basis-UserNode Cache.", "guildMemberAdd Event", error.stack);
        }
    }
}

module.exports = AddBaseNode;