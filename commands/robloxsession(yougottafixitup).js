const roblox = require("noblox.js");
const discord = require("discord.js");
const request = require("request");
const channelid2 = "710993625265471488";

exports.run = async (client, message, args, config) => {
  if (message.member.roles.cache.has(config.rankperm)) {
    const user = message.author;
    request(
      { url: `https://verify.eryn.io/api/user/${user.id}` },
      async function (err, res, body) {
        var rover = JSON.parse(body);
        const channelid = message.channel.id;

        const embed1 = new discord.MessageEmbed()
          .setTitle("Session prompt")
          .setColor("GREEN")
          .setDescription(
            `Hello ${rover.robloxUsername}, Would you like to host a session?`
          );

        const embed2 = new discord.MessageEmbed()
          .setTitle("Session prompt")
          .setColor("ORANGE")
          .setDescription(`PLease check <#${channelid}>`);

        const embed3 = new discord.MessageEmbed()
          .setTitle("Prompt done.")
          .setColor("ORANGE")
          .setDescription(`Please read the dm from <@${client.user.id}>`);
        const embed194376 = new discord.MessageEmbed()
          .setTitle("Waiting for session")
          .setColor("ORANGE")
          .setDescription(
            `Waiting for <@${user.id}> to accept or deny the session`
          );

        const embed4 = new discord.MessageEmbed()
          .setTitle("Session")
          .setColor("ORANGE")
          .setDescription(
            `Horray! There is a session come to the place where the session is at!`
          );

        const embed28 = new discord.MessageEmbed()
          .setTitle("Session")
          .setColor("ORANGE")
          .setDescription(`sadsad! You missed session :(`);
        const embedu = new discord.MessageEmbed()
          .setTitle("Session hosting.")
          .setColor("ORANGE")
          .setDescription(
            `Thanks! Thanks for hosting a session, Click the X to end the session`
          );
        const eneddd = new discord.MessageEmbed()
          .setTitle("Session ended")
          .setColor("ORANGE")
          .setDescription(
            `Thanks! Thanks for hosting a session, Click the X to end the session`
          );
        const boop = new discord.MessageEmbed()
          .setTitle("No session")
          .setColor("ORANGE")
          .setDescription(`Sorry, No session`);

        let whohostttitk = await message.author.createDM();
        const cdm = await whohostttitk.send(embed2);
        const adm = await message.channel.send(embed1);

        var chan = await message.guild.channels.cache.get(channelid2);
        const chanc = await chan.send(embed194376);

        adm.react("✅").then(() => adm.react("❌"));

        const filter = (reaction, user) => {
          return (
            ["✅", "❌"].includes(reaction.emoji.name) &&
            user.id === message.author.id
          );
        };

        adm
          .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
          .then((collected) => {
            const reaction = collected.first();
            if (reaction.emoji.name === "✅") {
              adm.edit(embed3);
              cdm.edit(embedu);
              chanc.edit(embed4);
              cdm.react("❌");
              const filter2 = (reaction, user) => {
                return (
                  ["❌"].includes(reaction.emoji.name) &&
                  user.id === message.author.id
                );
              };
              cdm
                .awaitReactions(filter2, {
                  max: 1,
                  time: 6000000,
                  errors: ["time"],
                })
                .then((collected) => {
                  const reaction = collected.first();
                  if (reaction.emoji.name === "❌") {
                    cdm.edit("meboo");
                    chanc.edit(embed28);
                  }
                });
            } else {
              whohostttitk.send("Okay, Session canceled");
              chanc.edit(boop);
            }
          });
      }
    );
  }
};
