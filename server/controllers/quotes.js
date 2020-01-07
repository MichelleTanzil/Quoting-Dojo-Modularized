// All necessary requires, such as the Quote model.
const mongoose = require("mongoose");
const Quote = mongoose.model("Quote");
var moment = require("moment");
module.exports = {
  index: function(req, res) {
    res.render("index");
  },

  allQuotes: function(req, res) {
    Quote.find()
      .sort({ createdAt: "desc" })
      .then(quotes => {
        // logic with users results
        console.log("All quotes: " + quotes);
        res.render("allquotes", { quotes: quotes, moment: moment });
      })
      .catch(err => res.json(err));
  },

  create: function(req, res) {
    const quote = new Quote(req.body);
    quote
      .save()
      .then(() => res.redirect("/quotes"))
      .catch(err => {
        console.log("We have an error!", err);
        for (var key in err.errors) {
          req.flash("new_quote", err.errors[key].message);
        }
        res.redirect("/");
      });
  }
};
