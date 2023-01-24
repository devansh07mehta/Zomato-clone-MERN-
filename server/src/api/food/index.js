import express from "express";

import { FoodModel } from "../../database/AllModels";
import { ValidateCategory, ValidateId } from "../../validation/common.validation";

const Router = express.Router();

/**
 * Route: /:_id
 * Des: Create New Food Item
 * Params: none
 * Access: Public
 * Method: POST
 */
Router.post("/", async (req, res) => {
    try {
        const { FoodData } = await req.body;
        const FoodDetails = await FoodModel.findOne(FoodData);
        if (FoodDetails) {
            return res.status(404).json({
                success: false,
                message: "Food Details already exists in Db"
            });
        }

        const FoodItem = await FoodModel.create(FoodData);
        return res.status(200).json({ FoodItem });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route: /:_id
 * Description: Get food based on id
 * Params: _id
 * Access: Public
 * Method: GET
 */

Router.get("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        await ValidateId(req.params);
        const food = await FoodModel.findById(_id);
        if (!food) {
            return res.status(404).json({ message: "Food item doesn't exist!!" });
        }
        return res.status(200).json({ food });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route: /r/:_id
 * Description: Get all foods based on particular restaurant
 * Params:  _id
 * Access: Public
 * Method: GET
 */

Router.get("/r/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        await ValidateId(req.params);
        const foods = await FoodModel.find({
            restaurant: _id
        });

        // task: food not found return statement

        if (!foods) {
            return res.status(404).json({ message: "Restaurant doesn't exist hence food items within it cannot be found!!" });
        }
        return res.status(200).json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route: /c/category
 * Description: Get all foods based on particular category
 * Params: category
 * Access: Public
 * Method: GET
 */

Router.get("/c/:category", async (req, res) => {
    try {
        const { category } = req.params;
        await ValidateCategory(req.params);
        const foods = await FoodModel.find({
            category: { $regex: category, $options: "i" }
            // /c/veg
            // /c/Veg
            // /c/vEg
            // /c/veG
            // /c/VEG
        });

        if (!foods) {
            return res.status(404).json({ message: `No food matched with ${category}` });
        }
        return res.status(200).json({ foods });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;