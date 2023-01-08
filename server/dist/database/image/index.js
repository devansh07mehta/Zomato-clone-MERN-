"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ImageSchema = new _mongoose.default.Schema({
  images: [{
    location: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});
const ImageModel = _mongoose.default.model("images", ImageSchema);
exports.ImageModel = ImageModel;