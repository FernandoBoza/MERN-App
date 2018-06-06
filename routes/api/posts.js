const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
// POST Model
const Post = require("../../models/Post");
// POST Validator
const validatePostInput = require("../../validation/post");

// @Route GET api/posts/test
// @Desc Test post route
// @Access Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @Route POST api/posts
// @Desc Create Posts
// @Access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      // If Any Errors Send 400 with err obj
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => {
      res.json(post);
    });
  }
);

module.exports = router;
