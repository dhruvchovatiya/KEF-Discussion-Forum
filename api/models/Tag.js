const mongoose = require("mongoose");


const TagSchema = new mongoose.Schema(
  {

    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tag", TagSchema);