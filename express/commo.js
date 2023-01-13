const rp = require("request-promise");
const cheerio = require("cheerio");

const getGoldPrice = (url, res) => {
  rp({
    uri: url,
    transform: (body) => {
      return cheerio.load(body);
    },
  }).then(($) => {
    // Retrive data
    let data = [];

    $(
      "#__next > div.fullLayout > div:nth-child(6) > div.jsx-3419068704.GoldRateHomePage > div > div.col-12.col-lg-8 > div.jsx-722160545.SectionRecentPrice > div > div:nth-child(1) > div > div:nth-child(2) > div.col-7 > b"
    ).each((i, elem) => {
      // console.log("E: ", $(elem).text().replace(/ /g, "").split("\n"));
      let d = $(elem).text().replace(/ /g, "").split("\n");
      data.push({ gold0buy: d[0] });
    });

    $(
      "#__next > div.fullLayout > div:nth-child(6) > div.jsx-3419068704.GoldRateHomePage > div > div.col-12.col-lg-8 > div.jsx-722160545.SectionRecentPrice > div > div:nth-child(1) > div > div:nth-child(3) > div.col-7 > b"
    ).each((i, elem) => {
      // console.log("E: ", $(elem).text().replace(/ /g, "").split("\n"));
      let d = $(elem).text().replace(/ /g, "").split("\n");
      data.push({ gold0sell: d[0] });
    });

    $(
      "#__next > div.fullLayout > div:nth-child(6) > div.jsx-3419068704.GoldRateHomePage > div > div.col-12.col-lg-8 > div.jsx-722160545.SectionRecentPrice > div > div:nth-child(2) > div > div:nth-child(2) > div.col-7 > b"
    ).each((i, elem) => {
      // console.log("E: ", $(elem).text().replace(/ /g, "").split("\n"));
      let d = $(elem).text().replace(/ /g, "").split("\n");
      data.push({ gold1buy: d[0] });
    });

    $(
      "#__next > div.fullLayout > div:nth-child(6) > div.jsx-3419068704.GoldRateHomePage > div > div.col-12.col-lg-8 > div.jsx-722160545.SectionRecentPrice > div > div:nth-child(2) > div > div:nth-child(3) > div.col-7 > b"
    ).each((i, elem) => {
      // console.log("E: ", $(elem).text().replace(/ /g, "").split("\n"));
      let d = $(elem).text().replace(/ /g, "").split("\n");
      data.push({ gold1sell: d[0] });
    });

    // console.log("DATA: ", data);
    // Push data
    res.send({
      status: "success",
      response: {
        data: data,
      },
    });

    return data;
  });
};

const getOilPrice = (url, res) => {
  rp({
    uri: url,
    transform: (body) => {
      return cheerio.load(body);
    },
  }).then(($) => {
    // Retrive data
    let data = [];

    $(
      "#__next > div.fullLayout > div:nth-child(5) > div > div.row > div.content-wrapper.col-12.col-lg-8 > section:nth-child(1) > div.jsx-492581780.RecentPriceTable > div:nth-child(1) > div.center.flex-start-mobile.col-4.col-lg-3 > strong"
    ).each((i, elem) => {
      // console.log("E: ", $(elem).text().replace(/ /g, "").split("\n"));
      let d = $(elem).text().replace(/ /g, "").split("\n");
      data.push({ gas95: d[0] });
    });

    $(
      "#__next > div.fullLayout > div:nth-child(5) > div > div.row > div.content-wrapper.col-12.col-lg-8 > section:nth-child(1) > div.jsx-492581780.RecentPriceTable > div:nth-child(2) > div.center.flex-start-mobile.col-4.col-lg-3 > strong"
    ).each((i, elem) => {
      // console.log("E: ", $(elem).text().replace(/ /g, "").split("\n"));
      let d = $(elem).text().replace(/ /g, "").split("\n");
      data.push({ gas91: d[0] });
    });

    $(
      "#__next > div.fullLayout > div:nth-child(5) > div > div.row > div.content-wrapper.col-12.col-lg-8 > section:nth-child(1) > div.jsx-492581780.RecentPriceTable > div:nth-child(3) > div.center.flex-start-mobile.col-4.col-lg-3 > strong"
    ).each((i, elem) => {
      // console.log("E: ", $(elem).text().replace(/ /g, "").split("\n"));
      let d = $(elem).text().replace(/ /g, "").split("\n");
      data.push({ E20: d[0] });
    });

    $(
      "#__next > div.fullLayout > div:nth-child(5) > div > div.row > div.content-wrapper.col-12.col-lg-8 > section:nth-child(1) > div.jsx-492581780.RecentPriceTable > div:nth-child(4) > div.center.flex-start-mobile.col-4.col-lg-3 > strong"
    ).each((i, elem) => {
      // console.log("E: ", $(elem).text().replace(/ /g, "").split("\n"));
      let d = $(elem).text().replace(/ /g, "").split("\n");
      data.push({ E85: d[0] });
    });

    $(
      "#__next > div.fullLayout > div:nth-child(5) > div > div.row > div.content-wrapper.col-12.col-lg-8 > section:nth-child(1) > div.jsx-492581780.RecentPriceTable > div:nth-child(5) > div.center.flex-start-mobile.col-4.col-lg-3 > strong"
    ).each((i, elem) => {
      // console.log("E: ", $(elem).text().replace(/ /g, "").split("\n"));
      let d = $(elem).text().replace(/ /g, "").split("\n");
      data.push({ diesel: d[0] });
    });

    $(
      "#__next > div.fullLayout > div:nth-child(5) > div > div.row > div.content-wrapper.col-12.col-lg-8 > section:nth-child(1) > div.jsx-492581780.RecentPriceTable > div:nth-child(6) > div.center.flex-start-mobile.col-4.col-lg-3 > strong"
    ).each((i, elem) => {
      // console.log("E: ", $(elem).text().replace(/ /g, "").split("\n"));
      let d = $(elem).text().replace(/ /g, "").split("\n");
      data.push({ B7: d[0] });
    });

    // console.log("DATA: ", data);
    // Push data
    res.send({
      status: "success",
      response: {
        data: data,
      },
    });

    return data;
  });
};

module.exports = {
  getGoldPrice,
  getOilPrice,
};
