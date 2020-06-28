const roblox = require("noblox.js");
const discord = require("discord.js");

exports.run = async (client, message, args, config) => {
  const Imcoreectperms = new discord.MessageEmbed()
    .setTitle("Incorrect perms")
    .setColor("GREEN")
    .setDescription(
      `You are the same or lower rank then the user you want to ban, Or you have no perms!`
    );
  if (message.member.roles.cache.has(config.discordbotcmdsrole)) {
    let user = parseInt(args[0]);
    if (user) {
      let banner = message.author;
      let reason = args.slice(1).join(" ") || "N/A";
      const baninfo = new discord.MessageEmbed()
        .setTitle("Purge conf.")
        .setColor("GREEN")
        .setDescription(`Are you sure you would like to purge? `)
        .addField("Purge reason:", reason, true)
        .addField("Messages to be purged:", `${user}`, true);

      const Ihavebanned = new discord.MessageEmbed()
        .setTitle("I have purged!")
        .setColor("GREEN")
        .setDescription(`I have purged`)
        .addField("Purge reason:", reason, true)
        .addField("Purge number:", `${user}`, true);
      const error = new discord.MessageEmbed()
        .setTitle("There has been a error.")
        .setColor("GREEN")
        .setDescription(
          `There has been a un known error, Please check the bot owner to check logs..`
        );
      const cancel = new discord.MessageEmbed()
        .setTitle("Canceled purge.")
        .setColor("GREEN")
        .setDescription(`I have canceled banning`);
      const banlog = new discord.MessageEmbed()
        .setTitle("Discord action!")
        .setColor("GREEN")
        .setDescription(`A discord action has been taken!`)
        .addField("Action type:", "purge", true)

        .addField("purge reason:", reason, true)
        .addField("Messages purgeed:", `${user}`, true)
        .addField("Purger:", `<@${banner.id}>`, true);

      const msg = await message.channel.send(baninfo);
      msg.react("✅");
      msg.react("❌");

      const filter = (reaction, user) => {
        return (
          ["✅", "❌"].includes(reaction.emoji.name) &&
          user.id === message.author.id
        );
      };

      msg
        .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
        .then((collected) => {
          const reaction = collected.first();
          if (reaction.emoji.name === "✅") {
            msg.edit(Ihavebanned).then((msg) => {
              msg.delete({ timeout: 1001 });
            });
            message.channel.bulkDelete(user).catch(function (err) {
              msg.edit(error);
              console.log(err);
            });
            if (config.discordmodlogs === "true") {
              message.guild.channels.cache
                .get(config.discordmodlogschannel)
                .send(banlog);
            }
          } else {
            msg.edit(cancel);
          }
        });
    }
  } else {
    message.channel.send(Imcoreectperms);
  }
};
