"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireWildcard(require("passport"));
var _order = require("../../database/order");
var _common = require("../../validation/common.validation");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();

/**
 * Route: /:_id
 * Description: Get all orders by user id
 * Params: _id
 * Access: Public
 * Method: GET
 */

Router.get("/:_id", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      user
    } = req;
    const {
      userId
    } = user._id;
    await (0, _common.ValidateId)({
      userId
    });
    const getOrders = await _order.OrderModel.findOne({
      user: user._id
    });
    if (!getOrders) {
      return res.status(404).json({
        error: "No order for this user found here"
      });
    }
    return res.status(200).json({
      orders: getOrders
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route: /new
 * Description: Add new order 
 * Params: none
 * Access: Private
 * Method: PUT
 */

Router.put("/new", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      user
    } = req;
    const {
      userId
    } = user._id;
    await (0, _common.ValidateId)({
      userId
    });
    const {
      orderDetails
    } = req.body;
    const addNewOrder = await _order.OrderModel.findOneAndUpdate({
      user: user._id
    }, {
      $push: {
        orderDetails: orderDetails
      }
    }, {
      new: true
    });
    return res.status(200).json({
      order: addNewOrder
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
var _default = Router;
exports.default = _default;