const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports = ContactSchema = new Schema({
  firstName: {
    type: String,
    required: "enter a first name",
  },
  lastName: {
    type: String,
    required: "enter a last name",
  },
  email: {
    type: String,
  },
  company: {
    type: String,
  },
  phone: {
    type: Number,
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
});
