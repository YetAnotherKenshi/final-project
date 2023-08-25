const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
    },
    url: {
      type: String,
    },
    date: Number,
    price: Number,
    quantity: Number,
    rate: Number,
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "Type",
    },
  },
  { timestamps: true }
);

module.exports = model("Product", schema);
