"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MenuSchema = new _mongoose.default.Schema({
  menus: [{
    name: {
      type: String,
      required: true
    },
    items: [{
      type: _mongoose.default.Types.ObjectId,
      ref: "foods"
    }]
  }],
  recommended: [{
    type: _mongoose.default.Types.ObjectId,
    ref: "foods",
    unique: true
  }]
}, {
  timestamps: true
});
const MenuModel = _mongoose.default.model("menus", MenuSchema);
exports.MenuModel = MenuModel;