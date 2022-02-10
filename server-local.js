"use strict";

const app = require("./express/server");
const thailotto = require("./express/thai-lotto");
const kasetprice = require("./express/kasetprice");

app.listen(3000, () => console.log("Local app listening on port 3000!"));

const Discord = require("discord.js");

const prefix = "$";
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
bot.on("ready", () => {
  console.log("DISCORD BOT READY!");
});

bot.on("message", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  } else if (command === "sum") {
    const numArgs = args.map((x) => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => (counter += x));
    message.reply(`The sum of all the arguments you provided is ${sum}!`);
  } else if (command === "ราคา") {
    kasetprice.getData(
      encodeURI("https://www.kasetprice.com/ราคา/" + args[0] + "/วันนี้"),
      res
    );
  }
});

bot.login(process.env.BOT_TOKEN);
