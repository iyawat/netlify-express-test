"use strict";
const bodyParser = require("body-parser");

const app = require("./express/server");

app.listen(3000, () => console.log("Local app listening on port 3000!"));

// const server = require("./express/server");
// const { PORT = 3000 } = process.env;

// server
//   .use(bodyParser.json())
//   .listen(PORT, () => console.log(`App listening on port ${PORT}!`));
