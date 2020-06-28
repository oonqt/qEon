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
    let user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        let banner = message.author;
        let reason = args.slice(1).join(" ") || "N/A";
        const baninfo = new discord.MessageEmbed()
          .setTitle("Ban conf.")
          .setColor("GREEN")
          .setDescription(`Are you sure you would like to ban <@${user.id}>? `)
          .addField("Ban reason:", reason, true)
          .addField("User to be banned:", `<@${user.id}>`, true);
        const uhavebeenbaned = new discord.MessageEmbed()
          .setTitle("You have been banned!")
          .setColor("GREEN")
          .setDescription(
            `Hello <@${user.id}>, You have banned banned read this embed for more info! `
          )
          .addField("Ban reason:", reason, true)
          .addField("Banner:", `<@${banner.id}>`, true);

        const Ihavebanned = new discord.MessageEmbed()
          .setTitle("I have banned!")
          .setColor("GREEN")
          .setDescription(`I have banned <@${user.id}>. `)
          .addField("Ban reason:", reason, true)
          .addField("User banned:", `<@${user.id}>`, true);
        const error = new discord.MessageEmbed()
          .setTitle("There has been a error.")
          .setColor("GREEN")
          .setDescription(
            `There has been a un known error, Please check the bot owner to check logs..`
          );
        const cancel = new discord.MessageEmbed()
          .setTitle("Canceled ban.")
          .setColor("GREEN")
          .setDescription(`I have canceled banning`);
        const banlog = new discord.MessageEmbed()
          .setTitle("Discord action!")
          .setColor("GREEN")
          .setDescription(`A discord action has been taken!`)
          .addField("Action type:", "ban", true)

          .addField("Ban reason:", reason, true)
          .addField("User banned:", `<@${user.id}>`, true)
          .addField("Banner:", `<@${user.id}>`, true);

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
              user
                .send(uhavebeenbaned)
                .then(() =>
                  member.ban({
                    reason: reason,
                  })
                )
                .catch(function (err) {
                  msg.edit(error);
                  console.log(err);
                });
              msg.edit(Ihavebanned);
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
    }
  } else {
    message.channel.send(Imcoreectperms);
  }
};
