const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");


dotenv.config();

//CREATE POST
router.post("/", async (req, res) => {
  try {

    const jwtUser = jwt.verify(req.body.token, process.env.JWT_SECRET)
    const user = await User.findById(jwtUser.id)

    const newPost = new Post({
      title: req.body.title,
      desc: req.body.desc,
      img: req.body.img,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });





    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(502).json(err)
  }
});

//ADD COMMENT
//********CHANGE SO ONLY LOGGED IN USERS CAN POST COMMENTS
router.post("/:id", async (req, res) => {
  
  const newComment = new Comment(req.body)
  try {
    let newPost = await Post.findById(req.params.id)
    newPost.comments.push(newComment)
    newPost.save()
    res.status(200).json(newPost)
  } catch (err) {
    res.status(500).json(err);
  }
});

//ADD COMMENT
// router.post("/:id", async (req, res) => {
//     const newComment = new Comment(req.body)
//     try {
//       let newPost = await Post.findById(req.params.id)
//       newPost.comments.push(newComment)
//       newPost.save()
//       res.status(200).json(newPost)
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });


// //UPDATE POST
// router.put("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post.username === req.body.username) {
//       try {
//         const updatedPost = await Post.findByIdAndUpdate(
//           req.params.id,
//           {
//             $set: req.body,
//           },
//           { new: true }
//         );
//         res.status(200).json(updatedPost);
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(401).json("You can update only your post!");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //DELETE POST
// router.delete("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post.username === req.body.username) {
//       try {
//         await post.delete();
//         res.status(200).json("Post has been deleted...");
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(401).json("You can delete only your post!");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;