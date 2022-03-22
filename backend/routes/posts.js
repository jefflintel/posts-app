const express = require('express');
const Post = require('../models/post');
const router = express.Router();

//create a new post
router.post('', (req, res, next) => {
  // const post = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({
      message: 'success! post added',
      postId: createdPost._id


    });
  });
});

//update a post
router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

//retrieve saved posts
router.get('', (req, res, next) => {
  Post.find()
    .then(posts => {
      res.status(200).json({
        message: 'success! here are your posts',
        posts: posts
      });
    });
});

router.get('/:_id', (req, res, next) => {
  Post.findById(req.params._id).then(post => {
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: 'Unable to locate post'
      });
    }
  })
})

//delete a post
router.delete('/:_id', (req, res, next) => {
  Post.deleteOne({_id: req.params._id})
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'post deleted'});
    });
});

module.exports = router;
