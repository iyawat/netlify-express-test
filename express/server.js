"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const rp = require("request-promise");

const thailotto = require("./thai-lotto");
const kasetprice = require("./kasetprice");
require("dotenv").config();

const router = express.Router();

router.get("/lotto/latest", (req, res) => {
  // Get latest lottery URL
  rp({
    uri: `https://news.sanook.com/lotto/`,
    transform: (body) => {
      return cheerio.load(body);
    },
  }).then(($) => {
    let lottoUrl;

    if (
      $("#lotto-highlight-result > p.lotto__wait").text() ===
      "รอผลสลากกินแบ่งรัฐบาล"
    ) {
      lottoUrl = $(
        "body > div.section.section--lotto-check > div > div > div > div.col.span-8 > section > div.section__body > div > article:nth-child(1) > h3.lotto-check__title > a"
      ).attr("href");
    } else {
      lottoUrl = $(
        "body > div.section.section--highlight.highlight-horo > div > div > div > div.lotto-highlight > div > div.lotto-check__btn-group.flex-box > div > a"
      ).attr("href");
    }
    thailotto.getData(lottoUrl, res);
  });
});

router.get("/lotto/:id", (req, res) => {
  thailotto.getData(
    "https://news.sanook.com/lotto/check/" + req.params.id,
    res
  );
});

router.get("/kasetprice/:id", (req, res) => {
  // console.log("https://www.kasetprice.com/ราคา/" + req.params.id + "/วันนี้");
  kasetprice.getData(
    encodeURI("https://www.kasetprice.com/ราคา/" + req.params.id + "/วันนี้"),
    res
  );
});

router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello from Express.js!</h1>");
  res.end();
});
router.get("/another", (req, res) => res.json({ route: req.originalUrl }));
router.post("/", (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
