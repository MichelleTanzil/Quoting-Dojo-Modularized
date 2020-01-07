const mongoose = require("mongoose");
const Quote = mongoose.model("Quote");
module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.post("/quotes", (req, res) => {
    const quote = new Quote(req.body);
    quote
      .save()
      .then(() => res.redirect("/quotes"))
      .catch(err => {
        console.log("We have an error!", err);
        // adjust the code below as needed to create a flash message with the tag and content you would like
        for (var key in err.errors) {
          req.flash("new_quote", err.errors[key].message);
        }
        res.redirect("/");
      });
  });

  app.get("/quotes", (req, res) => {
    Quote.find()
      .sort({ createdAt: "desc" })
      .then(quotes => {
        // logic with users results
        console.log(quotes);
        res.render("quotes", { quotes: quotes, moment: moment });
      })
      .catch(err => res.json(err));
  });
};
