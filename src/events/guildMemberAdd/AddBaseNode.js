const Event = require("../../structures/Events");
const UserNode = require("../../models/user/UserNode");

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
      console.error("Fehler beim Verarbeiten des guildMemberAdd Events:", error);
    }
  }
}

module.exports = AddBaseNode;