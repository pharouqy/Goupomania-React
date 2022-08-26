const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

module.exports.signup = (req, res) => {
  const { pseudo, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    const user = new User({
      pseudo,
      email,
      password: hash,
    });
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({ err: err });
      }
      res.status(201).json({
        message: "User created",
      });
    });
  });
};

module.exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          error: "Invalid credentials",
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user.email,
            pseudo: user.pseudo,
            _id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );
        return res
          .status(200)
          .cookie("token", token, {
            maxAge: 9000000, // 1 day
            httpOnly: false, // to avoid XSS
            secure: false, // set to true if your using https
          })
          .json({
            message: "Login success",
            token,
            pseudo: user.pseudo,
            _id: user._id,
          });
      }
      return res.status(401).json({
        error: "Invalid credentials",
      });
    });
  });
};

module.exports.logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send({ message: "Logout success" });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  console.log(id);
  User.findById(id, (err, user) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    res.status(200).json(user);
  });
};

module.exports.getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    if (!users) {
      return res.status(404).json({
        error: "Users not found",
      });
    }
    res.status(200).json(users);
  }).sort({ createdAt: -1 });
};

module.exports.updateUser = (req, res) => {
  const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  const { id } = req.params;
  const userObject = req.file
    ? {
        ...req.body.user,
        picture: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  if (token.id !== id && !token.isAdmin) {
    return res.status(401).json({
      error: "You are not authorized to update this user",
    });
  } else {
    User.findByIdAndUpdate(id, userObject, { new: true })
      .then((user) => {
        const { pseudo, email, bio, picture } = user;
        const userUpdated = {
          pseudo: userObject.pseudo ? userObject.pseudo : pseudo,
          email: userObject.email ? userObject.email : email,
          bio: userObject.bio ? userObject.bio : bio,
          picture: userObject.picture ? pictureState() : picture,
        };
        function pictureState() {
          if (userObject.picture) {
            const filePath = user.picture.split("/images/")[1];
            fs.unlink(`images/profils/${filePath}`, (err) => {
              if (err) {
                console.log(err);
              }
            });
            return userObject.picture;
          }
        }
        res.status(200).json(userUpdated);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};

module.exports.deleteUser = (req, res) => {
  const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  const { id } = req.params;
  if (token._id !== id && !token.isAdmin) {
    return res.status(401).json({
      error: "You are not authorized to delete this user",
    });
  } else {
    User.findByIdAndDelete(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            error: "User not found",
          });
        }
        const filePath = user.picture.split("/images/")[1];
        fs.unlink(`images/profils/${filePath}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
        res.status(200).json({
          message: "User deleted",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};
