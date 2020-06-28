const roblox = require("noblox.js");
const discord = require("discord.js");
const request = require("request");

exports.run = (client, message, args, config) => {
  if (message.member.roles.cache.has(config.updateperm)) {
    var user = message.mentions.members.first();
    var DiscordUser = user.user;
    console.log(user);

    request(
      { url: `https://verify.eryn.io/api/user/${user.id}` },
      async function (err, res, body) {
        if (err) {
          console.log(err);
        } else {
          var rover = JSON.parse(body);
          console.log(rover.robloxUsername);
          const groupid = config.groupid;
          console.log(config.groupid);
          var RobloxID = rover.robloxId;
          var rankidsss = config.rankids;
          let tt = config.groupid;
          let rankid = await roblox.getRankInGroup({
            group: groupid,
            userId: RobloxID,
          });

          console.log(rankid);
          let rank = await roblox.getRankNameInGroup({
            group: groupid,
            userId: RobloxID,
          });
          var rr = `${rover.robloxUsername} [-] ${rank}`;
          if (rankid) {
            if (rover.status === "ok") {
              let update = new discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle(rover.robloxUsername)
                .addFields({
                  name: "**New role**",
                  value: rank,
                  inline: true,
                })

                .setFooter("API Used: https://verify.eryn.io")
                .setTimestamp();
              message.channel.send(update);
              if (config.verifygroupname === "true") {
                console.log("true true");
                config.verifyroleids.forEach((element) =>
                  user.roles
                    .remove(message.guild.roles.cache.get(element))
                    .then(() =>
                      user.setNickname(`${rover.robloxUsername} [-] ${rank}`)
                    )
                );

                if (rr.length >= 32) {
                  user.setNickname(
                    `${rover.robloxUsername} [-] ` + config.backupids[rankid]
                  );
                }

                if (config.addrankid === "true") {
                  let r2add = config.rankids[rankid];

                  let roletoadd = message.guild.roles.cache.get(
                    config.rankids[rankid]
                  );

                  user.roles.add(roletoadd);
                } else {
                  console.log("not vaild");
                }
              } else {
                console.log("not true");
                user.setNickname(`${rover.robloxUsername}`);
              }
            }
          } else {
            let updateerror = new discord.MessageEmbed()
              .setColor("GREEN")
              .setTitle("No roles found")
              .setDescription(
                `I have found no new roles, Ib can take up to 10 mins to find new roles or you are not in our group`
              )

              .setFooter("API Used: https://verify.eryn.io")
              .setTimestamp();
            message.reply(updateerror);
          }
        }
      }
    );
  } else {
    console.log("nu");
    var user = message.mentions.members.first();
    var DiscordUser = user.user;
    console.log(user);

    request(
      { url: `https://verify.eryn.io/api/user/${user.id}` },
      async function (err, res, body) {
        if (err) {
          console.log(err);
        } else {
          var rover = JSON.parse(body);
          console.log(rover.robloxUsername);
          const groupid = config.groupid;
          console.log(config.groupid);
          var RobloxID = rover.robloxId;
          var rankidsss = config.rankids;
          let tt = config.groupid;
          let rankid = await roblox.getRankInGroup({
            group: groupid,
            userId: RobloxID,
          });

          console.log(rankid);
          let rank = await roblox.getRankNameInGroup({
            group: groupid,
            userId: RobloxID,
          });
          var rr = `${rover.robloxUsername} [-] ${rank}`;
          if (rankid) {
            if (rover.status === "ok") {
              let update = new discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle(rover.robloxUsername)
                .addFields({ name: "**New role**", value: rank, inline: true })

                .setFooter("API Used: https://verify.eryn.io")
                .setTimestamp();
              message.channel.send(update);
              if (config.verifygroupname === "true") {
                console.log("true true");
                config.verifyroleids.forEach((element) =>
                  user.roles
                    .remove(message.guild.roles.cache.get(element))
                    .then(() =>
                      user.setNickname(`${rover.robloxUsername} [-] ${rank}`)
                    )
                );

                if (rr.length >= 32) {
                  user.setNickname(
                    `${rover.robloxUsername} [-] ` + config.backupids[rankid]
                  );
                }

                if (config.addrankid === "true") {
                  let r2add = config.rankids[rankid];

                  let roletoadd = message.guild.roles.cache.get(
                    config.rankids[rankid]
                  );

                  user.roles.add(roletoadd);
                } else {
                  console.log("not vaild");
                }
              } else {
                console.log("not true");
                user.setNickname(`${rover.robloxUsername}`);
              }
            }
          } else {
            let updateerror = new discord.MessageEmbed()
              .setColor("GREEN")
              .setTitle("No roles found")
              .setDescription(
                `I have found no new roles, Ib can take up to 10 mins to find new roles or you are not in our group`
              )

              .setFooter("API Used: https://verify.eryn.io")
              .setTimestamp();
            message.reply(updateerror);
          }
        }
      }
    );
  }
};
