import express from "express";
import { MenuModel, ImageModel } from "../../database/AllModels";
import { ValidateId } from "../../validation/common.validation";

const Router = express.Router();

/**
 * Route: /list/:_id
 * Description: Get all the menu lists for the given restaurant based on the restaurant id
 * Params: _id
 * Access: Public
 * Method: GET
 */

Router.get("/list/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        await ValidateId(req.params);
        const menus = await MenuModel.findById(_id);

        if (!menus) {
            return res.status(404).json({ error: "No menu present for the given restaurant" });
        }
        return res.status(200).json({ menus });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route: /image/:_id
 * Description: Get all list of menu images with their restaurant ids
 * Params: _id
 * Acess: Public
 * Method: GET
 */

Router.get("/image/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        await ValidateId(req.params);
        const menuImages = await ImageModel.findById(_id);

        if (!menuImages) {
            return res.status(404).json({ error: "No restaurant found hence menu images can't be fetched!!" });
        }
        return res.status(200).json({ menuImages });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;