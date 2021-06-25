const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    }, 
    lastName: {
      type: String,
      required: false,
    },
    tags: {
      type: Array,  
      required: false,
    },
    comments: {
      type: Array,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);