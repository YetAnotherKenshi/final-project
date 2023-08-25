const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    text: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    rating: Number,
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = model("Comment", schema);
