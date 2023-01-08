import express from "express";
import passport from "passport";
import { ReviewModel } from "../../database/AllModels";
import { ValidateId } from "../../validation/common.validation";

const Router = express.Router();

/**
 * Route: /:resId
 * Description: Get all the reviews for a particular restaurant id
 * Params: resId
 * Access: Public
 * Method: GET
 */

Router.get("/", async (req, res) => {
    try {
        const { resId } = req.params;
        const reviews = await ReviewModel.find({ restaurants: resId }).sort({
            createdAt: -1  //-1 denotes descending order.
            // createdAt is specific keyword for timestamp which shows the exact time when the reviews are created.
        });
        return res.status(200).json({ reviews });
    } catch (error) {
        return res.status(500).json({ error: error.message });
   }
});

/**
 * Route: /new
 * Description: Add new food/restaurant review and rating
 * Params: none
 * Access: Private
 * Method: POST
 */

Router.post("/new", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { _id } = req.user;
        await ValidateId({_id});
        const { reviewData } = req.body;

        const newReview = await ReviewModel.create({ ...reviewData, user: _id });
        return res.status(200).json({ newReview });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route: /delete/:id
 * Description: Delete a review
 * Params: id
 * Access: Private 
 * Method: DELETE
 */

Router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { user } = req;
        const { id } = req.params;
        await ValidateId(req.params);
        const data = await ReviewModel.findOneAndDelete({
            _id: id,
            user: user._id
        });
        if (!data) {
            return res.status(404).json({ error: "Review was not deleted!!" });
        }
        return res.status(200).json({ message: "Successfully deleted a review", data });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export default Router;