var Users = require("../models/usersModel");
var bcryptjs = require("bcryptjs");
var passportJWT = require("passport-jwt");
var jwt = require("jsonwebtoken");

const userSecret = process.env.USER_SECRET_KEY;

const ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = userSecret;

exports.createUser = function (req, res, next) {
  const name = req.body.name.toString().trim();
  const email = req.body.email.toString().trim();
  const password = req.body.password.toString();

  const newUser = new Users({
    name,
    email,
    password,
  });

  function createHashedUser(newUser, callback) {
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(newUser.password, salt, (error, hash) => {
        const hashedUser = newUser;
        hashedUser.password = hash;
        hashedUser.save(callback);
      });
    });
  }

  createHashedUser(newUser, (err, user) => {
    if (err) {
      return next(err);
    }
    res.json({ createUser: "success" });
  });
};

exports.validateUser = function(req, res, next) {
  function getUserByEmail(postEmail, callback) {
    Users.findOne({email: postEmail}, callback);
  }

  function comparePassword(postedPassword, hash, callback) {
    bcryptjs.compare(postedPassword, hash, (err, isMatch) => {
      if (err) {
        return next(err);
      }
      callback(null, isMatch);
    });
  }

  if (req.body.email && req.body.password) {
    const email = req.body.email;
    const password = req.body.password;

    getUserByEmail(email, (err, user) => {
      if (!user) {
        res.status(404).json({message: "User does not exist"});
      } else {
        comparePassword(password, user.password, (err, isMatch) => {
          if (err) {
            next(err);
          }
          if (isMatch) {
            const payload = {id: user._id};
            const token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: "1h"});
            res.json({signInStatus: "success", token, id: user._id});
          } else {
            res.status(401).json({message: "Wrong password"});
          }
        })
      }
    });
  }
};
