const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String },
    password: { type: String },
    phone: { type: String },
    image: { type: String },
    email: { type: String, required: true },
    about: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = model("User", schema);
