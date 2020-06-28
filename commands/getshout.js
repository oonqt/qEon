const roblox = require("noblox.js");
const discord = require("discord.js");

exports.run = async (client, message, args, config) => {
  if (message.member.roles.cache.has(config.rankperm)) {
    let discorduser = message.author.tag;
    let shout = args[0];

    const rankbed2 = new discord.MessageEmbed()
      .setTitle("Roblox ranking FAILED")
      .setColor("RED")

      .setDescription(
        `Error: There is no shout, or the shout could not be found`
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

      .setDescription(`💡 Clearing... Please wait.`)
      .setFooter(config.embed.footer + " | Ranking command");

    const canceled = new discord.MessageEmbed()
      .setTitle("Ranking canceled.")
      .setColor("RED")

      .setDescription(`We have canceled the clear shout command.`)
      .setFooter(config.embed.footer + " | Ranking command");

    const origshout = await roblox.getShout(config.groupid);
    console.log(origshout);

    const rankdogjfhfk = new discord.MessageEmbed()
      .setTitle("Ranking confermation")
      .setColor("GREEN")
      .setDescription(`We have connected to the roblox group service,`)
      .addField("Current shout message:", origshout.body, true);

    const msg = await message.channel.send(rankdogjfhfk);
  }
};
