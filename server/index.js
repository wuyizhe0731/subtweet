"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const {MongoClient} = require("mongodb")
const assert        = require('assert');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let url = "mongodb://localhost:27017/tweeter";

MongoClient.connect(url, function(err, db) {

  assert.equal(null, err);
  console.log("Connected successfully to server");

  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});


