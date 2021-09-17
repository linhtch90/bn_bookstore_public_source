var Admins = require("../models/adminsModel");
var bcryptjs = require("bcryptjs");
var passportJWT = require("passport-jwt");
var jwt = require("jsonwebtoken");

const adminSecret = process.env.ADMIN_SECRET_KEY;

const ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = adminSecret;

exports.createAdmin = function (req, res, next) {
  const name = req.body.name.toString().trim();
  const email = req.body.email.toString().trim();
  const password = req.body.password.toString();

  const newAdmin = new Admins({
    name,
    email,
    password,
  });

  function createHashedAdmin(newAdmin, callback) {
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(newAdmin.password, salt, (error, hash) => {
        const hashedAdmin = newAdmin;
        hashedAdmin.password = hash;
        hashedAdmin.save(callback);
      });
    });
  }

  createHashedAdmin(newAdmin, (err, user) => {
    if (err) {
      return next(err);
    }
    res.json({ createAdmin: "success" });
  });
};

exports.validateAdmin = function (req, res, next) {
  function getAdminByEmail(postEmail, callback) {
    Admins.findOne({ email: postEmail }, callback);
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

    getAdminByEmail(email, (err, admin) => {
      if (!admin) {
        res.status(404).json({ message: "Admin account does not exist" });
      } else {
        comparePassword(password, admin.password, (err, isMatch) => {
          if (err) {
            next(err);
          }
          if (isMatch) {
            const payload = { id: admin._id };
            const token = jwt.sign(payload, jwtOptions.secretOrKey, {
              expiresIn: "1h",
            });
            res.json({ signInStatus: "success", token, id: admin._id });
          } else {
            res.status(401).json({ message: "Wrong password" });
          }
        });
      }
    });
  }
};
