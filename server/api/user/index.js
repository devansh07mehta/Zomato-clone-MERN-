import express from "express";
import passport from "passport";
import { UserModel } from "../../database/AllModels";
import { ValidateId } from "../../validation/common.validation";

const Router = express.Router();

/**
 *
 * Route: /
 * Description: Get authorized user data
 * Params: none
 * Access: Private
 * Method: GET
 */

// Passport & passport JWT is used here to make the route access private & secured.
// Passport is the main folder within which we have JWT as a sub package.

Router.get("/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { email, fullName, phoneNumber, address } = req.user;
            return res.json({ user: { email, fullName, phoneNumber, address } });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

/**
 * Route: /:_id
 * Description: Get user data
 * Params: _id
 * Access: Public
 * Method: GET
 */

Router.get("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        await ValidateId(req.params);
        const getUser = await UserModel.findById(_id);
        const { fullName } = getUser;

        if (!getUser) return res.status(404).json({ error: "User not found by this particular id" });
        return res.status(200).json({ user: { fullName } });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route: /:_id
 * Description: Update user data by their id
 * Params: _id
 * Access: Private
 * Method: PUT
 */

Router.put("/update/:_id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { _id } = req.params;
            await ValidateId(req.params);
            const { userData } = req.body;

            userData.password = undefined;

            const updateUserData = await UserModel.findById(_id, 
                {
                    $set: userData,
                },
                {
                    new: true
                }
            );
            return res.status(200).json({ user: updateUserData });
            
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
)

export default Router;