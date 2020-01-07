const mongoose = require("mongoose");
const Quote = mongoose.model("Quote");
var quotes = require("../controllers/quotes.js");
module.exports = function(app) {
  app.get("/", (req, res) => {
    quotes.index(req, res);
  });

  app.get("/quotes", (req, res) => {
    quotes.allQuotes(req, res);
  });

  app.post("/quotes", (req, res) => {
    quotes.create(req, res);
  });
};
