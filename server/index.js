import express from "express";
import dotenv from "dotenv";

// Database Connection
import ConnectDB from "./database/connection";

dotenv.config();

const zomato = express();

zomato.use(express.json());

zomato.get("/", (req, res) => {
    res.json({
        message: "Response from the server"
    });
});

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
