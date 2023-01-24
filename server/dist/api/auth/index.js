"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _user = require("../../database/user");
var _auth = require("../../validation/auth.validation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();

/**
 * Route: /signup
 * Des: Create new account
 * Params: none
 * Access: Public
 * Method: POST
 */

Router.post("/signup", async (req, res) => {
  try {
    await (0, _auth.ValidateSignup)(req.body.credentials);
    await _user.UserModel.findByEmailAndPhone(req.body.credentials);
    const newUser = await _user.UserModel.create(req.body.credentials);
    const token = newUser.generateJwtToken();
    return res.status(200).json({
      token,
      status: "success"
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route: /signin
 * Des: Login to existing account
 * Params: none
 * Access: Public
 * Method: POST
 */

Router.post("/signin", async (req, res) => {
  try {
    await (0, _auth.ValidateSignin)(req.body.credentials);
    const user = await _user.UserModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generateJwtToken();
    return res.status(200).json({
      token,
      status: "Success"
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

// Google auth here
Router.get('/google', _passport.default.authenticate('google', {
  scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]
}));
Router.get("/google/callback", _passport.default.authenticate("google", {
  failureRedirect: "/"
}), (req, res) => {
  // return res.status(200).json({ token: req.session.passport.user.token });

  return res.redirect(`${process.env.REACT_APP_CLIENT_URL}google/${req.session.passport.user.token}`);
});
var _default = Router;
exports.default = _default;