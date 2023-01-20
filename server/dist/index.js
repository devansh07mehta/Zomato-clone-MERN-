"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _passport = _interopRequireDefault(require("passport"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _route = _interopRequireDefault(require("./config/route.config"));
var _google = _interopRequireDefault(require("./config/google.config"));
var _connection = _interopRequireDefault(require("./database/connection"));
var _auth = _interopRequireDefault(require("./api/auth"));
var _food = _interopRequireDefault(require("./api/food"));
var _restaurant = _interopRequireDefault(require("./api/restaurant"));
var _user = _interopRequireDefault(require("./api/user"));
var _menu = _interopRequireDefault(require("./api/menu"));
var _order = _interopRequireDefault(require("./api/order"));
var _review = _interopRequireDefault(require("./api/review"));
var _image = _interopRequireDefault(require("./api/image"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Private route authorization config

// Database Connection

_dotenv.default.config();
(0, _route.default)(_passport.default); //Call the private route
(0, _google.default)(_passport.default);
const zomato = (0, _express.default)();

// adding additional passport configuration

zomato.use((0, _cors.default)({
  origin: "http://localhost:3000"
}));
zomato.use((0, _helmet.default)());
zomato.use(_express.default.json());
zomato.use((0, _expressSession.default)({
  secret: "ZomatoApp"
}));
zomato.use(_passport.default.initialize()); //Initialize or Use the new package imported
zomato.use(_passport.default.session());
zomato.get("/", (req, res) => {
  res.json({
    message: "Response from the server"
  });
});

//  /auth/signup
zomato.use("/auth", _auth.default);

// /food
zomato.use("/food", _food.default);

// /restaurant
zomato.use("/restaurant", _restaurant.default);

// /user
zomato.use("/user", _user.default);

// /menu
zomato.use("/menu", _menu.default);

// /order
zomato.use("/order", _order.default);

// /review
zomato.use("/review", _review.default);

// /image
zomato.use("/image", _image.default);
const PORT = 4000;
zomato.listen(PORT, () => {
  (0, _connection.default)().then(() => {
    console.log("Server is up and running successfully!!!");
  }).catch(err => {
    console.log("Server is running, but the database connection failed");
    console.log(err);
  });

  // console.log("Server is up and running successfully!!");
});