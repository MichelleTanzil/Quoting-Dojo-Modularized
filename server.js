const express = require("express");
const app = express();
const session = require("express-session");
app.use(
  session({
    secret: "keyboardkitteh",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/quoting_dojo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const flash = require("express-flash");
app.use(flash());
var validate = require("mongoose-validator");

const QuoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name has a minimum length of 2 characters"]
    },
    quote: {
      type: String,
      required: [true, "Quote is required"],
      minlength: [2, "Quote has a minimum length of 2 characters"]
      // message: "Quote is required and has a minimum length of 2 characters"
    }
  },
  { timestamps: true }
);
// create an object that contains methods for mongoose to interface with MongoDB
const Quote = mongoose.model("Quote", QuoteSchema);
app.use(express.static(__dirname + "/static"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({ extended: true }));
require("./server/config/routes.js")(app);
app.listen(8000, () => console.log("listening on port 8000"));
