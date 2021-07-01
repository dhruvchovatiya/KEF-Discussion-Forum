const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const { findById } = require("../models/User");


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
      user.posts.push(savedPost._id)
      const savedUser = await user.save();
      res.status(200).json({savedPost,savedUser});
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(502).json(err)
  }
});

//ADD COMMENT
router.post("/:id", async (req, res) => {

  try {
    const jwtUser = jwt.verify(req.body.token, process.env.JWT_SECRET)
    const user = await User.findById(jwtUser.id)
    const commTemp = req.body
    commTemp.firstName = user.firstName
    commTemp.lastName = user.lastName
    commTemp.email = user.email

    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    commTemp.date = date+'-'+month+'-'+year
    const newComment = new Comment(commTemp)

    
    let newPost = await Post.findById(req.params.id)
    newPost.comments.push(newComment)
    newPost.save()
    user.comments.push({postId: newPost._id, commentId: newComment._id, arrayIn: newPost.comments.length-1})
    user.save()
    res.status(200).json(newPost)
  } catch (err) {
    res.status(500).json(err);
  }
});

//VOTE ANSWER
router.post("/voteComment/:postId/:commentId", async (req, res) => {

  try {
    const jwtUser = jwt.verify(req.body.token, process.env.JWT_SECRET)

    let post = await Post.findById(req.params.postId)

    for (comment of post.comments) {
      if (comment._id == req.params.commentId) {
        if (req.body.up == 'true') {
          comment.votes++
        } else {
          comment.votes--
        }
        break
      }
    }

    let upDown = -1
    if (req.body.up == 'true') upDown = 1

    post.markModified('comments');
    const savedPost = await post.save()

    const user = await User.findById(jwtUser.id)
    let flag = false
    // console.log(flag)
    for (obj of user.voted) {
      if (obj.commentId === req.params.commentId) {
        flag = true
        if (req.body.up == 'true') {
          obj.vote++
        } else {
          obj.vote--
        }
      }
    }
    // console.log(flag)
    if (!flag) {
      let votedElement = {
        postId: req.params.postId,
        commentId: req.params.commentId,
        vote: 1
      }
      if(req.body.up!='true') votedElement.vote=-1
      user.voted.push(votedElement)
    }

    // console.log(user)
    user.markModified('voted')
    const savedUser = await user.save()
    // console.log(savedUser)
    res.status(200).json({ savedPost, savedUser })


  } catch (err) {
    res.status(500).json(err)
  }
});

// router.post("/:id", async (req,res) => {

//   const voted = async () => {
//     try {
//       console.log('b')

//       let newPost = await Post.findById(req.params.id)
//       if(req.body.up=='true') {
//         newPost.votes++
//       } else {
//         newPost.votes--
//       }
//       newPost.votedBy.push(user._id)
//       user.votedPosts.push(req.params.id)
//       newPost.save()
//       user.save()
//       res.status(200).json(newPost)
//       return 
//     } catch (err) {
//       console.log('c')
//       res.status(501)
//       return 

//     }
//   }


//       // try {
//         const jwtUser = jwt.verify(req.body.token, process.env.JWT_SECRET)
//         let user = await User.findById(jwtUser.id)
//         // console.log(user)

//         if(user.votedPosts.includes(req.params.id)) {
//       console.log('a')
//       console.log(user)
//       // throw new Error('err')

//           // res.status(500) 
//           throw {err:'error'}
//           return
//         }
//             // else {
//             //   voted()
//             // }
//           // try {

//           //   let newPost = await Post.findById(req.params.id)
//           //   if(req.body.up=='true') {
//           //     newPost.votes++
//           //   } else {
//           //     newPost.votes--
//           //   }
//           //   newPost.votedBy.push(user._id)
//           //   user.votedPosts.push(req.params.id)
//           //   newPost.save()
//           //   user.save()
//           //   return res.status(200).json(newPost)
//           // } catch (err) {
//           //   return res.status(501)

//           // }

//       // } catch(err) {
//       //   res.status(502).json(err)
//       // }


// })

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