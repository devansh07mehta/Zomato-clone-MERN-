"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.s3Upload = void 0;
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const s3Bucket = new _awsSdk.default.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  region: "ap-south-1"
});
const s3Upload = options => {
  return new Promise((resolve, reject) => {
    s3Bucket.upload(options, (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
};
exports.s3Upload = s3Upload;