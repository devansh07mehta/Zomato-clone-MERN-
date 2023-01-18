"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FoodModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const FoodSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isVeg: {
    type: Boolean,
    required: true
  },
  isContainsEggs: {
    type: Boolean,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  photos: {
    type: _mongoose.default.Types.ObjectId,
    ref: "images"
  },
  price: {
    type: Number,
    default: 150,
    required: true
  }
}, {
  timestamps: true
});
const FoodModel = _mongoose.default.model("foods", FoodSchema);
exports.FoodModel = FoodModel;