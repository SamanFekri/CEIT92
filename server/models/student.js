const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Model = new Schema({
  username: String,
  email: String,
  mobile: String,
  first_name: String,
  last_name: String,
  sex: String,
  order: String,
  pic: String,
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
}, {strict: false});


module.exports = mongoose.model("Student", Model);
