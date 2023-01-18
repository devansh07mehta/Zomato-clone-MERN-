import express from "express";

import { RestaurantModel } from "../../database/AllModels";
import { ValidateId } from "../../validation/common.validation";
import { ValidateSearchString, ValidateRestaurantCity } from "../../validation/restaurant.validation";

const Router = express.Router();

/**
 * Route: /
 * Desc: Create new restaurant
 * Params: none
 * Access: Public
 * Method: POST
 */
// HomeWork

/**
 * Route: /
 * Description: Get all the restaurants details based on the city
 * Params: none
 * Access: Public
 * Method: GET
 */

Router.get("/", async (req, res) => {
    try {
        // http://localhost:4000/restaurant/?city=mumbai
        const { city } = req.query;
        await ValidateRestaurantCity(req.query);

        const restaurants = await RestaurantModel.find({ city });

        if (restaurants.length === 0) {
            return res.status(404).json({ error: "No restaurant found in this city" });
        }
        return res.status(200).json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route: /:_id
 * Description: Get individual restaurant details based on the id
 * Params: _id
 * Access: Public
 * Method: GET
 */

Router.get("/:_id", async (rew, res) => {
    try {
        const { _id } = req.params;
        await ValidateId(req.params);
        const restaurant = await RestaurantModel.findById(_id);
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found by id" });
        }
        return res.status(200).json({ restaurant });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route: /search/:searchString
 * Description: Get restaurant details based on the search string
 * Params: searchString
 * Access: Public
 * Method: GET
 */

Router.get("/search/:searchString", async (req, res) => {
    try {
        // searchString: "Udipi Hotel"
        /**
         * results={
         * UdipiMandirHotel
         * Udipi
         * Udipi Hotel
         * Hospet udipi
         * }
         */

        const { searchString } = req.params;
        await ValidateSearchString(req.params);
        const restaurant = await RestaurantModel.find({
            name: { $regex: searchString, $options: "i" }
        });

        if (!restaurant.length === 0) {
            return res.status(404).json({ error: `No restaurant matched with ${searchString}` });
        }
        return res.status(200).json({ restaurant });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;