import express from "express";

import { FoodModel } from "../../database/food";

const Router = express.Router();

/**
 * Route: /:_id
 * Description: Get food based on id
 * Params: _id
 * Access: public
 * Method: Get
 */

Router.get("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
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
 * Method: Get
 */

Router.get("/r/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const foods = await FoodModel.find({
            restaurant: _id
        });
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
 * Method: Get
 */

Router.get("/c/category", async (req, res) => {
    try {
        const { category } = req.params;
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