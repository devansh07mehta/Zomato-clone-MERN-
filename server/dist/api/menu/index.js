"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _AllModels = require("../../database/AllModels");
var _common = require("../../validation/common.validation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();

/**
 * Route: /list/:_id
 * Description: Get all the menu lists for the given restaurant based on the restaurant id
 * Params: _id
 * Access: Public
 * Method: GET
 */

Router.get("/list/:_id", async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    await (0, _common.ValidateId)(req.params);
    const menus = await _AllModels.MenuModel.findById(_id);
    if (!menus) {
      return res.status(404).json({
        error: "No menu present for the given restaurant"
      });
    }
    return res.status(200).json({
      menus
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route: /image/:_id
 * Description: Get all list of menu images with their restaurant ids
 * Params: _id
 * Acess: Public
 * Method: GET
 */

Router.get("/image/:_id", async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    await (0, _common.ValidateId)(req.params);
    const menuImages = await _AllModels.ImageModel.findById(_id);
    if (!menuImages) {
      return res.status(404).json({
        error: "No restaurant found hence menu images can't be fetched!!"
      });
    }
    return res.status(200).json({
      menuImages
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
var _default = Router;
exports.default = _default;