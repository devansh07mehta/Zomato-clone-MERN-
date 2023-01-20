"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _multer = _interopRequireDefault(require("multer"));
var _AllModels = require("../../database/AllModels");
var _s = require("../../utils/s3");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();

// multer configure
const storage = _multer.default.memoryStorage();
const upload = (0, _multer.default)({
  storage
});

/**
 * Route:  /:_id
 * Description: Get image details based on their IDs
 * Params: _id
 * Access: Public
 * Method: GET
 */

Router.get("/:_id", async (req, res) => {
  try {
    const image = await _AllModels.ImageModel.findById(req.params._id);
    return res.status(200).json({
      image
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route:  /
 * Description:  Upload given image to s3 bucket and save file link to mongoDB
 * Params: none
 * Access: Public
 * Method: POST
 */

Router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const bucketOptions = {
      Bucket: "zomato-clone-11022",
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read" // Access Control List
    };

    const uploadImage = await (0, _s.s3upload)(bucketOptions);

    // Uploading images to db
    const dbUpload = await _AllModels.ImageModel.create({
      images: [{
        location: uploadImage.location
      }]
    });

    // return res.status(200).json({ uploadImage });
    return res.status(200).json({
      dbUpload
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
var _default = Router;
exports.default = _default;