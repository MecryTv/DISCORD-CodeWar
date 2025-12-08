const Event = require("../../structures/Events");
const UserNode = require("../../models/user/UserNode");
const Guardian = require("../../services/Guardian");

class AddBaseNode extends Event {
  constructor(client) {
    super(client, "guildMemberAdd", false);
  }

  async execute(member) {
    try {
        await UserNode.findOrCreate({
            where: {
                discordId: member.id
            },
            defaults: {
                discordId: member.id,
            }
        });
    } catch (error) {
      Guardian.handleEvent("Fehler beim Hinzufügen des Basis-UserNode.", "guildMemberAdd Event", error.stack);
    }
  }
}

module.exports = AddBaseNode;