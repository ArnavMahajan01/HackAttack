const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

require("./models/connect");

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: false, limit: "20mb" }));

/* Initializing the path for routes */
app.use("/", require("./routes"));

PORT = process.env.PORT || 6000;
const server = app.listen(PORT, function () {
  console.log("This server port is up and running at PORT: " + PORT);
});
console.log(new Date())