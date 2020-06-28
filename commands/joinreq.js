const roblox = require("noblox.js");
const discord = require("discord.js");

exports.run = async (client, message, args, config) => {
  if (message.member.roles.cache.has(config.rankperm)) {
    let discorduser = message.author.tag;
    let username = args[0];

    console.log(username);
    const rankargs = parseInt(message.content.split(" ").slice(2));

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

    const rankbigerror = new discord.MessageEmbed()
      .setTitle("Roblox ranking FAILED")
      .setColor("RED")

      .setDescription(
        `The request has failed, We are not sure the reason, Tell the owner of the bot to check logs`
      )
      .setFooter(config.embed.footer + " | Ranking command");

    const rankbed4 = new discord.MessageEmbed()
      .setTitle("💡 Roblox accepting.")
      .setColor("GREEN")

      .setDescription(`💡 Working... Please wait.`)
      .setFooter(config.embed.footer + " | Ranking command");

    const canceled = new discord.MessageEmbed()
      .setTitle("Ranking canceled.")
      .setColor("RED")

      .setDescription(`We have cancled the request command.`)
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

    const rankdogjfhfk = new discord.MessageEmbed()
      .setTitle("Ranking confermation")
      .setColor("GREEN")
      .setDescription(
        `Do you want to accept ${rodopoop}'s join request? \n \n 1️⃣ = Accept join request \n \n 2️⃣ = Deny join request \n \n ❌ = cancel`
      )
      .setFooter(config.embed.footer + " | Ranking command");
    const maxrank = new discord.MessageEmbed()
      .setTitle("Ranking error!")
      .setColor("RED")

      .setDescription(
        `Error: We can not rank ${rodopoop} because ${config.maxrank} is the max rank, Or you are trying to rank ${rodopoop} to high. `
      )
      .setFooter(config.embed.footer + " | Ranking command");
    const userng = new discord.MessageEmbed()
      .setTitle("Ranking error!")
      .setColor("RED")

      .setDescription(`Error: ${rodopoop} is not in group!`)
      .setFooter(config.embed.footer + " | Ranking command");

    if (rodopoop) {
      msg.edit(rankdogjfhfk);
      msg.react("1️⃣");
      msg.react("2️⃣");
      msg.react("❌");

      const filter = (reaction, user) => {
        return (
          ["1️⃣", "2️⃣", "❌"].includes(reaction.emoji.name) &&
          user.id === message.author.id
        );
      };

      msg
        .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
        .then((collected) => {
          const reaction = collected.first();
          if (reaction.emoji.name === "1️⃣") {
            msg.reactions
              .removeAll()
              .catch((error) =>
                console.error("Failed to clear reactions: ", error)
              );

            msg.edit(rankbed4);
            roblox
              .handleJoinRequest({
                group: config.groupid,
                userId: robloxusername,
                accept: true,
              })
              .catch(function (err) {
                msg.edit(rankbigerror);
              });
            const accepd = new discord.MessageEmbed()
              .setTitle(":tada: Accpet success!")
              .setColor("GREEN")
              .setDescription(`We have accepted ${rodopoop}'s join request'!`)
              .setFooter(config.embed.footer + " | Ranking command");

            msg.edit(accepd);
            if (config.robloxlogchannel === "true") {
              const ranklog = new discord.MessageEmbed()
                .setTitle("Request accept action.")
                .setColor("GREEN")
                .setDescription(`There has been a join request action.`)
                .addField("Action type:", "Join request accept", true)
                .addField("User acepeted:", rodopoop, true)

                .addField("Accepter:", discorduser, true)
                .setFooter(config.embed.footer + " | Ranking command");
              message.guild.channels.cache
                .get(config.robloxlogchannelid)
                .send(ranklog);
            }
          } else if (reaction.emoji.name === "2️⃣") {
            msg.reactions
              .removeAll()
              .catch((error) =>
                console.error("Failed to clear reactions: ", error)
              );
            msg.edit(rankbed4);
            roblox
              .handleJoinRequest({
                group: config.groupid,
                userId: robloxusername,
                accept: false,
              })
              .catch(function (err) {
                msg.edit(rankbigerror);
              });
            const denden = new discord.MessageEmbed()
              .setTitle(":tada: Dent success!")
              .setColor("GREEN")
              .setDescription(`We have denyed ${rodopoop}'s join request'!`)
              .setFooter(config.embed.footer + " | Ranking command");
            msg.edit(denden);

            if (config.robloxlogchannel === "true") {
              const denylog = new discord.MessageEmbed()
                .setTitle("Request deny action.")
                .setColor("GREEN")
                .setDescription(`There has been a join request action.`)
                .addField("Action type:", "Join request deny", true)
                .addField("User denyed:", rodopoop, true)

                .addField("Denyer:", discorduser, true)
                .setFooter(config.embed.footer + " | Ranking command");

              message.guild.channels.cache
                .get(config.robloxlogchannelid)
                .send(denylog);
            }
          } else {
            msg.edit(canceled);
          }
        });
    }
  }
};
