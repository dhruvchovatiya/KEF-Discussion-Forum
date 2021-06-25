const mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema(
  {

    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);

