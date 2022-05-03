"use strict";

const app = require("./express/server");
const thailotto = require("./express/thai-lotto");
const kasetprice = require("./express/kasetprice");
const rp = require("request-promise");

app.listen(3000, () => console.log("Local app listening on port 3000!"));

// const Discord = require("discord.js");
const { App } = require("@slack/bolt");

const slack = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

(async () => {
  const port = 3001;
  // Start your app
  await slack.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();

// const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = "$";

// bot.on("ready", () => {
//   console.log("DISCORD BOT READY!");
// });

// bot.on("messageCreate", function (message) {
//   if (message.author.bot) return;
//   if (!message.content.startsWith(prefix)) return;

//   const commandBody = message.content.slice(prefix.length);
//   const args = commandBody.split(" ");
//   const command = args.shift().toLowerCase();

//   if (command === "ping") {
//     const timeTaken = Date.now() - message.createdTimestamp;
//     message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
//   } else if (command === "sum") {
//     const numArgs = args.map((x) => parseFloat(x));
//     const sum = numArgs.reduce((counter, x) => (counter += x));
//     message.reply(`The sum of all the arguments you provided is ${sum}!`);
//   } else if (command === "ราคา") {
//     getPriceData(args).then((data) => {
//       let res = data.map((x) => {
//         return `${x[0]} ราคา ${x[1]} ${x[2]}`;
//       });
//       console.log(res);
//       if (res.length > 0) {
//         res.forEach((x) => {
//           message.reply(x);
//         });
//       } else {
//         message.reply("ไม่พบราคาสินค้า");
//       }
//     });
//   } else if (command === "หวย") {
//     getLotoData().then((data) => {
//       if (data != "") message.reply(data);
//       else message.reply("ไม่พบหวย");
//     });
//   }
// });

async function getPriceData(x) {
  let url = encodeURI("https://www.kasetprice.com/ราคา/" + x + "/วันนี้");
  let data = await kasetprice.getRawData(url);
  return data;
}

async function getLotoData() {
  return rp({
    uri: `https://sofin-webscraper.netlify.app/.netlify/functions/server/lotto/latest`,
  }).then((res) => {
    let x = JSON.parse(res).response;
    return (
      "งวดวันที่ " +
      x.date +
      "\r\n รางวัลที่ 1 : " +
      x.prizes.filter((x) => x.id === "prizeFirst")[0].number[0] +
      "\r\n รางวัลเลขหน้า 3 ตัว : " +
      x.runningNumbers.filter((x) => x.id === "runningNumberFrontThree")[0]
        .number +
      "\r\n รางวัลเลขท้าย 3 ตัว : " +
      x.runningNumbers.filter((x) => x.id === "runningNumberBackThree")[0]
        .number +
      "\r\n รางวัลเลขท้าย 2 ตัว : " +
      x.runningNumbers.filter((x) => x.id === "runningNumberBackTwo")[0].number
    );
  });
}

// bot.login(process.env.DISCORD_BOT_TOKEN);

slack.command("/test", async ({ command, ack, say }) => {
  try {
    await ack();
    say("Yaaay! BOT is working!");
  } catch (error) {
    console.log("err");
    console.error(error);
  }
});

slack.message("hey", async ({ command, say }) => {
  try {
    say("Yaaay! BOT is working!");
  } catch (error) {
    console.log("err");
    console.error(error);
  }
});

slack.message("ตรวจหวย", async ({ command, say }) => {
  try {
    getLotoData().then((data) => {
      if (data != "") say(data);
      else say("ไม่พบหวย");
    });
  } catch (error) {
    console.log("err");
    console.error(error);
  }
});
