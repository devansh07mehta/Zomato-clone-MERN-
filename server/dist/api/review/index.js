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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const Router = _express.default.Router();

/**
 * Route: /:resId
 * Description: Get all the reviews for a particular restaurant id
 * Params: resId
 * Access: Public
 * Method: GET
 */

Router.get("/", async (req, res) => {
  try {
    const {
      resId
    } = req.params;
    const reviews = await _AllModels.ReviewModel.find({
      restaurants: resId
    }).sort({
      createdAt: -1 //-1 denotes descending order.
      // createdAt is specific keyword for timestamp which shows the exact time when the reviews are created.
    });

    return res.status(200).json({
      reviews
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route: /new
 * Description: Add new food/restaurant review and rating
 * Params: none
 * Access: Private
 * Method: POST
 */

Router.post("/new", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      _id
    } = req.user;
    await (0, _common.ValidateId)({
      _id
    });
    const {
      reviewData
    } = req.body;
    const newReview = await _AllModels.ReviewModel.create(_objectSpread(_objectSpread({}, reviewData), {}, {
      user: _id
    }));
    return res.status(200).json({
      newReview
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route: /delete/:id
 * Description: Delete a review
 * Params: id
 * Access: Private 
 * Method: DELETE
 */

Router.delete("/delete/:id", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      user
    } = req;
    const {
      id
    } = req.params;
    await (0, _common.ValidateId)(req.params);
    const data = await _AllModels.ReviewModel.findOneAndDelete({
      _id: id,
      user: user._id
    });
    if (!data) {
      return res.status(404).json({
        error: "Review was not deleted!!"
      });
    }
    return res.status(200).json({
      message: "Successfully deleted a review",
      data
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
var _default = Router;
exports.default = _default;