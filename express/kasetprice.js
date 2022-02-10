const rp = require("request-promise");
const cheerio = require("cheerio");

const getData = (url, res) => {
  rp({
    uri: url,
    transform: (body) => {
      return cheerio.load(body);
    },
  }).then(($) => {
    // Retrive data
    let data = [];
    $(
      "#__layout > section > div:nth-child(3) > section:nth-child(1) > div > div > div.price-table-wrapper > div.price-table-list-wrapper > .price-list"
    ).each((i, elem) => {
      // console.log("E: ", $(elem).text().replace(/ /g, "").split("\n"));
      let d = $(elem).text().replace(/ /g, "").split("\n");
      data.push([d[1], d[3], d[5]]);
    });

    // console.log("DATA: ", data);
    // Push data
    res.send({
      status: "success",
      response: {
        data: data,
      },
    });
  });
};

module.exports = {
  getData,
};
