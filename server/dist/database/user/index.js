"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UserSchema = new _mongoose.default.Schema({
  fullname: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  address: [{
    detail: {
      type: String
    },
    for: {
      type: String
    }
  }],
  phoneNumber: [{
    type: Number
  }]
}, {
  timestamps: true
});

// attachments
UserSchema.methods.generateJwtToken = function () {
  return _jsonwebtoken.default.sign({
    user: this._id.toString()
  }, "ZomatoApp");
};

// helper functions
UserSchema.statics.findByEmailAndPhone = async ({
  email,
  phoneNumber
}) => {
  const checkUserByEmail = await UserModel.findOne({
    email
  });
  const checkUserByPhone = await UserModel.findOne({
    phoneNumber
  });
  if (checkUserByEmail || checkUserByPhone) {
    throw new Error("User already exists !!!");
  }
  return false;
};
UserSchema.statics.findByEmailAndPassword = async ({
  email,
  password
}) => {
  const user = await UserModel.findOne({
    email
  });
  if (!user) throw new Error("User doesn't exist !!!");

  // Compare Password
  const doesPasswordMatch = await _bcryptjs.default.compare(password, user.password);
  if (!doesPasswordMatch) throw new Error("Invalid Credentials !!!");
  return user;
};
UserSchema.pre('save', function (next) {
  const user = this;

  // password is been modified or not ??
  if (!user.isModified('password')) return next();

  // generate bcrypt & salt
  _bcryptjs.default.genSalt(8, (error, salt) => {
    // salt should be lesser or equal to 10 if it's more than 10 then it will take much time to compile.
    if (error) return next(error);

    // salt => hash the password for given number of time => Here it's 8.
    _bcryptjs.default.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      // will be assigning hashed password back
      user.password = hash;
      return next();
    });
  });
});
const UserModel = _mongoose.default.model("users", UserSchema);
exports.UserModel = UserModel;