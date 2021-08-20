const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Model = new Schema({
  name: String,
}, {strict: false});


module.exports = mongoose.model("User", Model);
