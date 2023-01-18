"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestaurantModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const RestaurantSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  mapLocation: {
    type: String,
    required: true
  },
  cuisine: [String],
  restaurantTimings: String,
  contactNumber: Number,
  webSite: String,
  popularDishes: [String],
  averageCost: Number,
  amenties: [String],
  menuImages: {
    type: _mongoose.default.Types.ObjectId,
    ref: "images"
  },
  menu: {
    type: _mongoose.default.Types.ObjectId,
    ref: "menus"
  },
  reviews: [{
    type: _mongoose.default.Types.ObjectId,
    ref: "reviews"
  }],
  photos: {
    type: _mongoose.default.Types.ObjectId,
    ref: "images"
  }
}, {
  timestamps: true
});
const RestaurantModel = _mongoose.default.model("restaurants", RestaurantSchema);
exports.RestaurantModel = RestaurantModel;