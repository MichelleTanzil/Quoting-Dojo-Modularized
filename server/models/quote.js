const mongoose = require("mongoose");

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
    }
  },
  { timestamps: true }
);
// create an object that contains methods for mongoose to interface with MongoDB
const Quote = mongoose.model("Quote", QuoteSchema);
