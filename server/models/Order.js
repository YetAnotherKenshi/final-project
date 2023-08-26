const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    content: [[{ type: String }, Number]],
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = model("Order", schema);
