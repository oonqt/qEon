const roblox = require("noblox.js");
const discord = require("discord.js");

exports.run = async (client, message, args, config) => {
  if (message.member.roles.cache.has(config.rankperm)) {
    let discorduser = message.author.tag;
    let shout = args.join(" ");

    const rankbed2 = new discord.MessageEmbed()
      .setTitle("Roblox ranking FAILED")
      .setColor("RED")

      .setDescription(
        `Error: There is no username, or the username could not be found`
      )
      .setFooter(config.embed.footer + " | Ranking command");

    const rankbed3 = new discord.MessageEmbed()
      .setTitle("Roblox ranking.")
      .setColor("RED")

      .setDescription(`Conecting to roblox group...`)
      .setFooter(config.embed.footer + " | Ranking command");

    const rankbigerror = new discord.MessageEmbed()
      .setTitle("Roblox ranking FAILED")
      .setColor("RED")

      .setDescription(
        `Shouting has failed, We are not sure the reason, Tell the owner of the bot to check logs`
      )
      .setFooter(config.embed.footer + " | Ranking command");

    const rankbed4 = new discord.MessageEmbed()
      .setTitle("💡 Roblox shouting.")
      .setColor("GREEN")

      .setDescription(`💡 Shouting... Please wait.`)
      .setFooter(config.embed.footer + " | Ranking command");

    const canceled = new discord.MessageEmbed()
      .setTitle("Ranking canceled.")
      .setColor("RED")

      .setDescription(`We have canceled the shout command.`)
      .setFooter(config.embed.footer + " | Ranking command");

    const origshout = await roblox.getShout(config.groupid);

    const rankdogjfhfk = new discord.MessageEmbed()
      .setTitle("Shout")
      .setColor("GREEN")
      .setDescription(
        `We have connected to the roblox group service, Wold you like to shout (part might be tagged out)?`
      )
      .addField("New Shout message:", shout, true)
      .addField("Current shout message:", origshout.body, true);

    const msg = await message.channel.send(rankbed3);

    if (shout) {
      msg.edit(rankdogjfhfk);
      msg.react("✅").then(() => msg.react("❌"));

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
            msg.reactions
              .removeAll()
              .catch((error) =>
                console.error("Failed to clear reactions: ", error)
              );
            msg.edit(rankbed4);
            roblox
              .shout({
                group: config.groupid,
                message: shout,
              })
              .catch(function (err) {
                msg.edit(rankbigerror);
                console.log(err);
              });
            const rankeddrfugsd = new discord.MessageEmbed()
              .setTitle(":tada: Shout success!")
              .setColor("GREEN")
              .setDescription(`We have shouted on your group!`)
              .addField("New Shout message:", shout, true)
              .addField("Old shout message:", origshout.body, true)
              .setFooter(config.embed.footer + " | Ranking command");
            msg.edit(rankeddrfugsd);
            if (config.robloxlogchannel === "true") {
              const ranklog = new discord.MessageEmbed()
                .setTitle("Ranking action.")
                .setColor("GREEN")
                .setDescription(`There has been a ranking action.`)
                .addField("Action type:", "Promote", true)

                .addField("Old shout:", origshout.body, true)
                .addField("New shout:", shout, true)

                .addField("Ranker:", discorduser, true)
                .setFooter(config.embed.footer + " | Ranking command");
              message.guild.channels.cache
                .get(config.robloxlogchannelid)
                .send(ranklog);
            }
          } else {
            msg.edit(canceled);
          }
        });
    }
  }
};
