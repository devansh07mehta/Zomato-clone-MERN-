import express from "express";

import { UserModel } from "../../database/AllModels";

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

Router.get("/", async (req, res) => {
    try {
        const { email, fullName, phoneNumber, address } = req.user;
        return res.json({ user: { email, fullName, phoneNumber, address } });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

export default Router;