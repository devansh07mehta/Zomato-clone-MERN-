import express from "express";
import passport, { use } from "passport";
import { OrderModel } from "../../database/order";

const Router = express.Router();

/**
 * Route: /:_id
 * Description: Get all orders by user id
 * Params: _id
 * Access: Public
 * Method: GET
 */

Router.get("/:_id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { user } = req;
            const getOrders = await OrderModel.findOne({ user: user._id });

            if (!getOrders) {
                return res.status(404).json({ error: "No order for this user found here" });
            }

            return res.status(200).json({ orders: getOrders });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
);

/**
 * Route: /new
 * Description: Add new order 
 * Params: none
 * Access: Private
 * Method: PUT
 */

Router.put("/new",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { user } = req;
            const { orderDetails } = req.body;
            const addNewOrder = await OrderModel.findOneAndUpdate(
                {
                    user: user._id
                },
                {
                    $push: {
                        orderDetails: orderDetails
                    },
                },
                {
                    new: true
                }
            );
            return res.status(200).json({ order: addNewOrder });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
);


export default Router;
