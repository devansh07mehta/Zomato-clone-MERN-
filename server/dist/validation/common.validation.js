"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidateSearchString = exports.ValidateId = exports.ValidateCategory = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ValidateId = id => {
  const Schema = _joi.default.object({
    _id: _joi.default.string().required()
  });
  return Schema.validateAsync(id);
};
exports.ValidateId = ValidateId;
const ValidateCategory = category => {
  const Schema = _joi.default.object({
    category: _joi.default.string().required()
  });
  return Schema.validateAsync(category);
};
exports.ValidateCategory = ValidateCategory;
const ValidateSearchString = searchString => {
  const Schema = _joi.default.object({
    searchString: _joi.default.string().required()
  });
  return Schema.validateAsync(searchString);
};
exports.ValidateSearchString = ValidateSearchString;