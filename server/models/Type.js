const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    singleName: {
      type: String,
      required: true,
    },
    multipleName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Type", schema);
