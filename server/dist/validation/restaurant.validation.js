"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidateSearchString = exports.ValidateRestaurantCity = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ValidateRestaurantCity = restaurantObject => {
  const Schema = _joi.default.object({
    city: (0, _joi.default)().string().required()
  });
  return Schema.validateAsync(restaurantObject);
};
exports.ValidateRestaurantCity = ValidateRestaurantCity;
const ValidateSearchString = restaurantObject => {
  const Schema = _joi.default.object({
    searchString: _joi.default.string().required()
  });
  return Schema.validateAsync(restaurantObject);
};
exports.ValidateSearchString = ValidateSearchString;