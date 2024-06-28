import job from "./cron";
import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";

// Private route authorization config
import PrivateRouteConfig from "./config/route.config";
import googleAuthConfig from "./config/google.config";

// Database Connection
import ConnectDB from "./database/connection";

import Auth from "./api/auth";
import Food from "./api/food";
import Restaurant from "./api/restaurant";
import User from "./api/user";
import Menu from "./api/menu";
import Order from "./api/order";
import Review from "./api/review";
import Image from "./api/image";

job.start();
dotenv.config();

PrivateRouteConfig(passport); //Call the private route
googleAuthConfig(passport);

const zomato = express();

// adding additional passport configuration

zomato.use(cors({ origin: "https://zomato-client.onrender.com" }));
zomato.use(helmet());

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
zomato.use("/user", User);

// /menu
zomato.use("/menu", Menu);

// /order
zomato.use("/order", Order);

// /review
zomato.use("/review", Review);

// /image
zomato.use("/image", Image);

const PORT = 4000;

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
