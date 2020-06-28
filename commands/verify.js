const roblox = require("noblox.js");
const discord = require("discord.js");
const request = require("request");

exports.run = (client, message, args, config) => {
  let user = message.author.id;

  request({ url: `https://verify.eryn.io/api/user/${user}` }, async function (
    err,
    res,
    body
  ) {
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

      if (rover.status === "ok") {
        let rankid = await roblox.getRankInGroup({
          group: groupid,
          userId: RobloxID,
        });

        console.log(rankid);
        let rank = await roblox.getRankNameInGroup({
          group: groupid,
          userId: RobloxID,
        });
        const robloxusername = await roblox.getUsernameFromId(RobloxID);
        var rr = `${robloxusername} [-] ${rank}`;
        let verified = new discord.MessageEmbed()
          .setColor("BLUE")
          .setTitle("You're verifed!")
          .setDescription(
            `Yay :tada:, You have been verifed as **${robloxusername}**! We are adding the verifed role. To verify another account, please reverify [here.](https://verify.eryn.io)`
          )
          .setImage(
            `https://www.roblox.com/Thumbs/Avatar.ashx?x=250&y=250&username=${robloxusername}`
          )
          .setFooter("API Used: https://verify.eryn.io")
          .setTimestamp();
        message.channel
          .send(verified)
          .then(() => message.member.roles.add(config.verifedrole));
        if (config.verifygroupname === "true") {
          console.log("true true");
          message.member.setNickname(`${robloxusername} [-] ${rank}`);

          if (rr.length >= 32) {
            message.member.setNickname(
              `${rover.robloxUsername} [-] ` + config.backupids[rankid]
            );
          }

          if (config.addrankid === "true") {
            let r2add = config.rankids[rankid];

            let roletoadd = message.guild.roles.cache.get(
              config.rankids[rankid]
            );

            message.member.roles.add(roletoadd);
          } else {
            console.log("not vaild");
          }
        } else {
          console.log("not true");
          message.member.setNickname(`${robloxusername}`);
        }
      } else {
        let embed = new discord.MessageEmbed()
          .setColor("GREEN")
          .setTitle("Verification")
          .setDescription(
            `We have found you are **Not** verifed, To verify please go [here.](https://verify.eryn.io)`
          )
          .setFooter("API Used: https://verify.eryn.io");
        message.reply(embed);
      }
    }
  });
};
