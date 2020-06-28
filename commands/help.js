const roblox = require("noblox.js");
const discord = require("discord.js");

exports.run = (client, message, args, config) => {
  let prefix = config.prefix;
  const rankbed1 = new discord.MessageEmbed()
    .setTitle("Help command")
    .setColor("GREEN")
    .setDescription("**Here are my commands**")
    .addFields(
      { name: prefix + "help", value: "Shows all my commands!" },
      {
        name: prefix + "ban",
        value: "Bans a user from the discord server - <discord ping>",
      },
      { name: prefix + "getshout", value: " Gets the roblox group shout." },

      {
        name: prefix + "shout",
        value: " Shouts in the roblox group - <shout message>",
      },
      {
        name: prefix + "kick",
        value: " Kicks a user from the discord - <discord ping>",
      },
      {
        name: prefix + "rank",
        value:
          " Sets the rank of the desired user - <roblox username> <rankid>",
      },
      {
        name: prefix + "joinreq",
        value: " Accepts or denys a join request - <roblox username>",
      },
      {
        name: prefix + "update",
        value:
          " Updates the desired user on discord (if verify is enabled) - <discord ping>",
      },
      { name: prefix + "verify", value: " Verifes you " },
      {
        name: prefix + "promote",
        value: " Promotes the desired user - <roblox username>",
      },
      {
        name: prefix + "demote",
        value: " Demotes the desired user - <roblox username>",
      },
      {
        name: prefix + "fire",
        value: " Sets the desired user to fired rank - <roblox user>",
      },
      { name: prefix + "clearshout", value: " Clears the roblox shout " },
      {
        name: prefix + "robloxkick",
        value: " Kicks user from the roblox group - <roblox username>",
      },
      {
        name: prefix + "purge",
        value:
          " Purges the desired amount of messages - <amount of messages> <reason>",
      },
      {
        name: prefix + "warn",
        value: " Warns the desired user - <User> <warn reason>",
      }
    )

    .setFooter(config.embed.footer + " | help command");
  message.channel.send("✅ Sent commands in dms");
  message.author.send(rankbed1);
};
