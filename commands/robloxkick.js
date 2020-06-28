const roblox = require("noblox.js");
const discord = require("discord.js");

exports.run = async (client, message, args, config) => {
  if (message.member.roles.cache.has(config.rankperm)) {
    let discorduser = message.author.tag;
    let username = args[0];

    console.log(username);

    const rankbed1 = new discord.MessageEmbed()
      .setTitle("Roblox ranking")
      .setColor("GREEN")
      .setDescription(`Checking roblox for ${username}, Please wait...`)
      .setFooter(config.embed.footer + " | Ranking command");

    const rankbed2 = new discord.MessageEmbed()
      .setTitle("Roblox ranking FAILED")
      .setColor("RED")

      .setDescription(
        `Error: There is no username, or the username could not be found`
      )
      .setFooter(config.embed.footer + " | Ranking command");

    const rankbed3 = new discord.MessageEmbed()
      .setTitle("Roblox ranking FAILED")
      .setColor("RED")

      .setDescription(`Error: There is no rank, or the rank could not be found`)
      .setFooter(config.embed.footer + " | Ranking command");

    const rankbigerror = new discord.MessageEmbed()
      .setTitle("Roblox ranking FAILED")
      .setColor("RED")

      .setDescription(
        `Ranking has failed, We are not sure the reason, Tell the owner of the bot to check logs`
      )
      .setFooter(config.embed.footer + " | Ranking command");

    const rankbed4 = new discord.MessageEmbed()
      .setTitle("💡 Roblox ranking.")
      .setColor("GREEN")

      .setDescription(`💡 Working... Please wait.`)
      .setFooter(config.embed.footer + " | Ranking command");

    const canceled = new discord.MessageEmbed()
      .setTitle("Ranking canceled.")
      .setColor("RED")

      .setDescription(`We have cancled the fire command.`)
      .setFooter(config.embed.footer + " | Ranking command");

    const userfinding = new discord.MessageEmbed()
      .setTitle("Roblox ranking")
      .setColor("GREEN")
      .setDescription(`Checking roblox for ${username}, Please wait...`)
      .setFooter(config.embed.footer + " | Ranking command");
    const msg = await message.channel.send(userfinding);

    let robloxusername = await roblox
      .getIdFromUsername({ username: username })
      .catch(function (err) {
        msg.edit(rankbed2);
      });
    console.log(robloxusername);

    let rodopoop = await roblox
      .getUsernameFromId(robloxusername)
      .catch(function (err) {
        msg.edit(rankbed2);
      });

    let playersrank = await roblox
      .getRankInGroup({
        group: config.groupid,
        userId: robloxusername,
      })
      .catch(function (err) {
        console.log(err);
      });
    console.log(playersrank);
    const rankargs = config.firedrank;
    console.log(rankargs);

    let robloxrankinfo = await roblox
      .getRole({
        group: config.groupid,
        rank: rankargs,
      })
      .catch(function (err) {
        msg.edit(userng);
      });
    let robloxrankinfo2 = await roblox
      .getRole({
        group: config.groupid,
        rank: playersrank,
      })
      .catch(function (err) {
        msg.edit(rankbed3);
      });

    const rankdogjfhfk = new discord.MessageEmbed()
      .setTitle("Ranking confermation")
      .setColor("GREEN")
      .setDescription(
        `We have found ${rodopoop}, Would you like to kick ${rodopoop}?`
      )
      .setFooter(config.embed.footer + " | Ranking command");
    const maxrank = new discord.MessageEmbed()
      .setTitle("Ranking error!")
      .setColor("RED")

      .setDescription(
        `Error: We can not kick ${rodopoop} because ${rodopoop} is to high of a rank to kick`
      )
      .setFooter(config.embed.footer + " | Ranking command");
    const userng = new discord.MessageEmbed()
      .setTitle("Ranking error!")
      .setColor("RED")

      .setDescription(`Error: ${rodopoop} is not in group!`)
      .setFooter(config.embed.footer + " | Ranking command");

    if (robloxusername) {
      if (robloxrankinfo2) {
        if (config.minfirerank <= playersrank) {
          msg.edit(maxrank);
        } else {
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
                  .exile({
                    group: config.groupid,
                    target: robloxusername,
                  })
                  .catch(function (err) {
                    msg.edit(rankbigerror);
                  });
                const rankeddrfugsd = new discord.MessageEmbed()
                  .setTitle(":tada: Ranking success!")
                  .setColor("GREEN")
                  .setDescription(`We have kicked ${rodopoop}!`)
                  .addField("New rank:", robloxrankinfo.name, true)
                  .addField("Old rank:", robloxrankinfo2.name, true)
                  .setFooter(config.embed.footer + " | Ranking command");
                msg.edit(rankeddrfugsd);
                if (config.robloxlogchannel === "true") {
                  const ranklog = new discord.MessageEmbed()
                    .setTitle("Ranking action.")
                    .setColor("GREEN")
                    .setDescription(`There has been a ranking action.`)
                    .addField("Action type:", "kick", true)

                    .addField("New rank:", robloxrankinfo.name, true)
                    .addField("Old rank:", robloxrankinfo2.name, true)
                    .addField("User kicked:", rodopoop, true)

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
      } else {
        msg.edit(userng);
      }
    }
  }
};
