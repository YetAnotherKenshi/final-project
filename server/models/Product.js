const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
    },
    url: {
      type: String,
    },
    brand: { type: String },
    type: { type: String },
    date: Number,
    price: Number,
    quantity: Number,
    rate: Number,
  },
  { timestamps: true }
);

module.exports = model("Product", schema);
