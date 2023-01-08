import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

import { ImageModel } from "../../database/AllModels";

import { s3upload } from "../../utils/s3";

const Router = express.Router();

// configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * Route:  /:_id
 * Description: Get image based on their IDs
 * Params: _id
 * Access: Public
 * Method: GET
 */

Router.get("/:_id", async (req, res) => {
    try {
        const image = await ImageModel.findById(req.params._id);
        return res.status(200).json({ image });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route:  /
 * Description:  Upload given image to s3 n db
 * Params: none
 * Access: Public
 * Method: POST
 */

Router.post("/", upload.single("file") ,async (req, res) => {
    try {
        const file = req.file;

        const bucketOptions = {
            Bucket: "zomato-clone",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        }

        const uploadImage = await s3upload(bucketOptions);

        // Uploading images to db
        const dbUpload = await ImageModel.create({
            images: [{
                location: uploadImage.location
            }]
        });

        // return res.status(200).json({ uploadImage });
        return res.status(200).json({ dbUpload });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;