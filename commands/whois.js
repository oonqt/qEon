const roblox = require("noblox.js");
const discord = require("discord.js");

exports.run = async (client, message, args, config) => {
  console.log("xx")
  const username = args[0];
  const isid = parseInt(args[0]);
  console.log(isid)
  const userid = await roblox.getIdFromUsername(username).catch(function (err) {
    if (!isid) {
      message.channel.send("Hmm, It seems like there has been an error! Make sure to check that the user exist's or you typed in a username/userid")
    }
    }); 



  if (userid) {
    
    console.log(userid);
    if (userid) {
      const userinfo = await roblox.getPlayerInfo(userid);
      const embed = new discord.MessageEmbed()
        .setTitle(`${userinfo.username}'s userinfo`)
        .addField("Username:", userinfo.username || "N/A", true)
        .addField("Status:", userinfo.status || "N/A", true)
        .addField("Age:", userinfo.age || "N/A", true)
        .addField("Joindate", userinfo.joinDate || "N/A", true)
        .addField("Id: ", userid || "N/A", true)
        .setTimestamp()

        .addField("Profile link:", `https://roblox.com/users/${userid}/profile`, true)
        .setURL(`https://roblox.com/users/${userid}/profile`)
        .setColor("BLUE")

        .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${userid}&width=420&height=420&format=png`)
      message.channel.send(embed)
    } else {
      message.channel.send("Hmm, It seems like there has been an error! Make sure to check that the user exist's or you typed in a username/userid")
    }

    } else if (isid) {
      console.log("xxxxxx")
      const getitright = await roblox.getUsernameFromId(isid).catch(function (err) {
        message.channel.send("Hmm, It seems like there has been an error! Make sure to check that the user exist's or you typed in a username/userid")
      });
      const userxid = await roblox.getIdFromUsername(getitright).catch(function (err) {
        message.channel.send("Hmm, It seems like there has been an error! Make sure to check that the user exist's or you typed in a username/userid")
      });
      if (userxid) {
        const userinfo = await roblox.getPlayerInfo(userxid);
        console.log(userinfo)
        const embed = new discord.MessageEmbed()
          .setTitle(`${userinfo.username}'s userinfo`)
          .addField("Username:", userinfo.username || "N/A", true)
          .addField("Status:", userinfo.status || "N/A", true)
          .addField("Age:", userinfo.age || "N/A", true)
          .addField("Joindate", userinfo.joinDate || "N/A", true)
          .addField("Id: ", userxid || "N/A", true)
          .setTimestamp()

          .addField("Profile link:", `https://roblox.com/users/${userxid}/profile`, true)
          .setURL(`https://roblox.com/users/${userxid}/profile`)
          .setColor("BLUE")
          .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${userxid}&width=420&height=420&format=png`)
        message.channel.send(embed)


      } else {
        message.channel.send("Hmm, It seems like there has been an error! Make sure to check that the user exist's or you typed in a username/userid")
      }
    }
}
