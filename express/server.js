"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
// const app = express();
const cheerio = require("cheerio");
const rp = require("request-promise");
const thailotto = require("./thai-lotto");

const server = express();

server.get("/", (req, res) => {
  console.log(thailotto.getData());
  res.send({
    status: "success",
    response:
      "Please go to https://github.com/iyawat/netlify-express-test#api for API usage",
  });
});

server.get("/lotto/latest", (req, res) => {
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

server.get("/lotto/:id", (req, res) => {
  thailotto.getData(
    "https://news.sanook.com/lotto/check/" + req.params.id,
    res
  );
});

server.get("*", (req, res) => {
  res.send(
    {
      status: "failure",
      response: "route not found",
    },
    404
  );
});

module.exports = server;
module.exports.handler = serverless(server);
