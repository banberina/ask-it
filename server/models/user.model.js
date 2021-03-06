const mongoose = require("mongoose");
const Question = require("./question.model");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String },
  surname: { type: String },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  role: {
    type: String,
    default: "user",
  },
  noOfAnswers: {
    type: Number,
    default: 0,
  },
  password: { type: String, required: true, minLength: 5, select: false },
});

UserSchema.plugin(AutoIncrement, { id: "user_id", inc_field: "id" });
const User = mongoose.model("User", UserSchema);

module.exports = User;
