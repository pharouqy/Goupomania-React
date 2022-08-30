const Post = require("../models/post.models");
const User = require("../models/user.models");
const fs = require("fs");

module.exports.createPost = (req, res) => {
  // create a new post
  const { posterId, message, picture, likers, comments } = req.body;
  User.findById(posterId).then((user) => {
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    const post = new Post({
      posterId,
      message,
      picture: req.file
        ? `${req.protocol}://${req.get("host")}/images/posts/${
            req.file.filename
          }`
        : null,
      likers,
      comments,
    });
    post
      .save()
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
};

module.exports.getPost = (req, res) => {
  // get a post
  const { id } = req.params;
  Post.findById(id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          error: "Post not found",
        });
      }
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

module.exports.getAllPosts = (req, res) => {
  // get all posts
  Post.find({})
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

module.exports.updatePost = (req, res) => {
  const { id } = req.params;
  const postObject = req.file
    ? {
        ...req.body,
        picture: `${req.protocol}://${req.get("host")}/images/posts/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Object.keys(postObject).forEach(
    (k) => postObject[k] == "" && delete postObject[k]
  ); // Remove the empty string from the object
  Post.findByIdAndUpdate(id, postObject, { new: false })
    .then((post) => {
      const filePath = post.picture.split("/images/")[1];
      if (req.file) {
        fs.unlink(`images/${filePath}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
      post.set({
        ...postObject,
      });
      if (!post) {
        return res.status(404).json({
          error: "Post not found",
        });
      }
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

module.exports.deletePost = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndDelete(id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          error: "Post not found",
        });
      }
      const filePath = post.picture.split("/images/")[1];
      fs.unlink(`images/${filePath}`, (err) => {
        if (err) {
          console.log(err);
        }
        res.status(200).json({
          message: "Post deleted",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

module.exports.commentPost = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndUpdate(
    id,
    {
      $push: {
        comments: {
          commenterId: req.body.commenterId,
          commenterPseudo: req.body.commenterPseudo,
          comment: req.body.comment,
          timestamp: new Date().getTime(),
        },
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          error: "Post not found",
        });
      }
      res.status(200).json(post.comments);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

module.exports.updateComment = (req, res) => {
  const { id } = req.params;
  Post.findById(id, (err, post) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    }
    if (!post) {
      res.status(404).json({
        error: "Post not found",
      });
    }
    const comment = post.comments.id(req.body.commentId); // find the comment by its id
    comment.set({
      comment: req.body.comment,
    });
    post.save((err, post) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      }
      res.status(200).json(post.comments.id(req.body.commentId));
    });
  });
};

module.exports.deleteComment = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndUpdate(
    id,
    {
      $pull: {
        comments: {
          _id: req.body.commentId,
        },
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          error: "Post not found",
        });
      }
      res.status(200).json(post.comments);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

module.exports.likePost = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndUpdate(
    id,
    {
      $addToSet: {
        likers: req.body.likerId,
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          error: "Post not found",
        });
      }
      User.findByIdAndUpdate(
        req.body.likerId,
        {
          $addToSet: {
            likes: id,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )
        .then((user) => {
          if (!user) {
            return res.status(404).json({
              error: "User not found",
            });
          }
          res.status(200).json(post.likers);
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

module.exports.unLikePost = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndUpdate(
    id,
    {
      $pull: {
        likers: req.body.likerId,
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          error: "Post not found",
        });
      }
      User.findByIdAndUpdate(
        req.body.likerId,
        {
          $pull: {
            likes: id,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )
        .then((user) => {
          if (!user) {
            return res.status(404).json({
              error: "User not found",
            });
          }
          res.status(200).json(post.likers);
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
