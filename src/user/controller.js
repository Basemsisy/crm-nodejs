const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = require("./model");

const User = mongoose.model("User", UserSchema);

const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "you are not authorized to take this action" });
  }
};

const register = (req, res) => {
  const newUser = new User(req.body);
  newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({ message: err });
    } else {
      user.hashPassword = undefined;
      res.send(user);
    }
  });
};

const login = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) throw err;
      if (!user) {
        res
          .status(401)
          .json({ message: "Authentcation faild, No user found!" });
      } else if (user) {
        if (!user.comparePassword(req.body.password, user.hashPassword)) {
          res
            .status(401)
            .json({ message: "Authentcation faild, wrong password" });
        } else {
          res.send({
            ...user._doc,
            hashPassword: undefined,
            token: jwt.sign(
              {
                email: user.email,
                username: user.username,
                _id: user.id,
              },
              "RESTFULAPIs"
            ),
          });
        }
      }
    }
  );
};
module.exports = { loginRequired, register, login };
