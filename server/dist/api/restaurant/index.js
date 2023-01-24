"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _AllModels = require("../../database/AllModels");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import { ValidateId } from "../../validation/common.validation";
// import { ValidateSearchString, ValidateRestaurantCity } from "../../validation/restaurant.validation";

const Router = _express.default.Router();

/**
 * Route     /
 * Des       Create new restaurant
 * Params    none
 * Access    Public
 * Method    POST
 */
// Homework

/**
 * Route     /
 * Des       Get all the restuarant details based on the city
 * Params    none
 * Access    Public
 * Method    GET
 */
Router.get("/", async (req, res) => {
  try {
    // http://localhost:4000/restaurant/?city=ncr
    const {
      city
    } = req.query;

    // await ValidateRestaurantCity(req.query);

    const restaurants = await _AllModels.RestaurantModel.find({
      city
    });
    if (restaurants.length === 0) {
      return res.status(404).json({
        error: "No restaurant found in this city."
      });
    }
    return res.json({
      restaurants
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route     /:_id
 * Des       Get individual restuarant details based on id
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/:_id", async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    const restaurant = await _AllModels.RestaurantModel.findById(_id);
    if (!restaurant) {
      return res.status(400).json({
        error: "Restaurant not found"
      });
    }
    return res.json({
      restaurant
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route     /search/:searchString
 * Des       Get restaurants details based on search string
 * Params    searchString
 * Access    Public
 * Method    GET
 */
Router.get("/search/:searchString", async (req, res) => {
  /**
   * searchString = Raj
   * results = {
   *  RajHotel
   *  RajRow
   *  RonRaj
   *  raJRow
   * }
   */
  try {
    const {
      searchString
    } = req.params;

    // await ValidateSearchString(req.params);

    const restaurants = await _AllModels.RestaurantModel.find({
      name: {
        $regex: searchString,
        $options: "i"
      }
    });
    if (!restaurants.length === 0) {
      return res.status(404).json({
        error: `No restaurant matched with ${searchString}`
      });
    }
    return res.json({
      restaurants
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
var _default = Router;
exports.default = _default;