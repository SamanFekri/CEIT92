const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Model = new Schema({
  title: String,
  content: String,
  picture: String,
  user_id: { type: String, ref: "User" },
  texter_id:  { type: String, ref: "User" },
  show: String,
}, {strict: false});


module.exports = mongoose.model("Article", Model);
