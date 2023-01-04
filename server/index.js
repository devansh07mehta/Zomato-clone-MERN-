import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";

import PrivateRouteConfig from "./config/route.config";

// Database Connection
import ConnectDB from "./database/connection";

import Auth from "./api/auth";
import Food from "./api/food";
import Restaurant from "./api/restaurant";
import User from "./api/user";

dotenv.config();

const zomato = express();
PrivateRouteConfig(passport); //Call the private route

zomato.use(express.json());
zomato.use(session({ secret: "ZomatoApp" }));
zomato.use(passport.initialize()); //Initialize or Use the new package imported
zomato.use(passport.session());

zomato.get("/", (req, res) => {
    res.json({
        message: "Response from the server"
    });
});

//  /auth/signup
zomato.use("/auth", Auth);

// /food
zomato.use("/food", Food);
// /restaurant
zomato.use("/restaurant", Restaurant);
// /user
zomato.use("/user", passport.authenticate("jwt", { session: false }), User);

const PORT = 4000

zomato.listen(PORT, () => {
    ConnectDB()
        .then(() => {
            console.log("Server is up and running successfully!!!");
        })
        .catch((err) => {
            console.log("Server is running, but the database connection failed");
            console.log(err);
        })

    // console.log("Server is up and running successfully!!");
});
