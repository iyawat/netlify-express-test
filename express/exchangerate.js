const rp = require("request-promise");
const cheerio = require("cheerio");
const axios = require("axios");
const _ = require("lodash");

const getExchangeRate = (url, res) => {
  rp({
    uri: url,
    transform: (body) => {
      return cheerio.load(body);
    },
  }).then(async ($) => {
    // Retrive data
    let data = [];
    let rate = [];

    $("#ctl00_PlaceHolderMain_dgAvg > tbody").each((i, elem) => {
      // console.log("E: ", $(elem).text().replace(/\t/g, "").split("\n"));
      let d = $(elem).text().replace(/\t/g, "").split("\n");
      // console.log(d);
      data.push({ exchangeRate: d });
    });

    // console.log("DATA: ", data);
    let el = data[0].exchangeRate.filter((x) => x.length > 0);
    // console.log(el);

    el.forEach((x) => {
      let y = x.split("      ");
      // console.log(y);

      if (y.length > 1) {
        let z = y[1].split(" ");
        rate.push({
          Source: "BOT",
          Symbol: y[0].substring(y[0].length - 3, y[0].length),
          Currency: y[0].substring(0, y[0].length - 3),
          BuySightBill: z[0],
          BuyTransfer: z[1],
          SellAvg: z[2],
        });
      }
    });
    // console.log("BOT ", rate);

    let bbl = await axios.get(
      `https://www.bangkokbank.com/api/exchangerateservice/GetLatestfxrates`,
      {
        headers: {
          "ocp-apim-subscription-key": "7d1b09abe2ea413cbf95b2d99782ed37",
        },
      }
    );

    let b_rate = bbl.data.map((x) => {
      return {
        Source: "BBL",
        Symbol: x.Family,
        Currency: x.FamilyLong,
        BuySightBill: x.SightBill,
        BuyTransfer: x.BuyingRates,
        SellAvg: x.SellingRates,
      };
    });
    // console.log("BBL ", b_rate);

    let scb = await axios.get(
      `https://www.scb.co.th/services/scb/exchangeRateService/latest.json?_charset_=UTF-8&lang=th&page=%2Fcontent%2Fscb%2Fth%2Fpersonal-banking%2Fforeign-exchange-rates`
    );

    let s_rate = scb.data.exchangeRates.map((x) => {
      return {
        Source: "SCB",
        Symbol: x.curCode,
        Currency: x.curName,
        BuySightBill: x.buyNotes,
        BuyTransfer: x.buyExport,
        SellAvg: x.sellNotes,
      };
    });
    // console.log("SCB ", s_rate);

    let arr = rate.concat(b_rate).concat(s_rate);
    let a = _.groupBy(arr, "Symbol");

    // Push data
    res.send({
      status: "success",
      response: {
        data: a,
      },
    });

    return data;
  });
};

module.exports = {
  getExchangeRate,
};
