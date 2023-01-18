"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _passportJwt = _interopRequireDefault(require("passport-jwt"));
var _AllModels = require("../database/AllModels");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const JWTStrategy = _passportJwt.default.Strategy;
const ExtractJWT = _passportJwt.default.ExtractJwt;

// Authorization: "Bearer someTokenString"

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ZomatoApp"
};
var _default = passport => {
  passport.use(new JWTStrategy(options, async (jwt__payload, done) => {
    try {
      const doesUserExist = await _AllModels.UserModel.findById(jwt__payload.user);
      if (!doesUserExist) return done(null, false);
      return done(null, doesUserExist);
    } catch (error) {
      throw new Error(error);
    }
  }));
};
exports.default = _default;