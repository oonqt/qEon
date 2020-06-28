module.exports = (client, message) => {
  bot.on("message", (msg) => {
    if (msg.content === "?stmt") {
      msg.reply("Yo Reals#0001 made meeeeeeee!");
    }
  });
};
