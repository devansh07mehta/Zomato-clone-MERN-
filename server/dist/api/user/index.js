"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _AllModels = require("../../database/AllModels");
var _common = require("../../validation/common.validation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();

/**
 *
 * Route: /
 * Description: Get authorized user data
 * Params: none
 * Access: Private
 * Method: GET
 */

// Passport & passport JWT is used here to make the route access private & secured.
// Passport is the main folder within which we have JWT as a sub package.

Router.get("/", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      email,
      fullName,
      phoneNumber,
      address
    } = req.user;
    return res.json({
      user: {
        email,
        fullName,
        phoneNumber,
        address
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route: /:_id
 * Description: Get user data (For the review system)
 * Params: _id
 * Access: Public
 * Method: GET
 */

Router.get("/:_id", async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    await (0, _common.ValidateId)(req.params);
    const getUser = await _AllModels.UserModel.findById(_id);
    const {
      fullName
    } = getUser;
    if (!getUser) return res.status(404).json({
      error: "User not found by this particular id"
    });
    return res.status(200).json({
      user: {
        fullName
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route: /:_id
 * Description: Update user data by their id
 * Params: _id
 * Access: Private
 * Method: PUT
 */

Router.put("/update/:_id", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    await (0, _common.ValidateId)(req.params);
    const {
      userData
    } = req.body;
    userData.password = undefined;
    const updateUserData = await _AllModels.UserModel.findByIdAndUpdate(_id, {
      $set: userData
    }, {
      new: true
    });
    return res.status(200).json({
      user: updateUserData
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
var _default = Router;
exports.default = _default;