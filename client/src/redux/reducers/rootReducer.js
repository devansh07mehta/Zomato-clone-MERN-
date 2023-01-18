import { combineReducers } from "redux";

// reducers or storage units
import auth from "./auth/auth.reducer";
import user from "./user/user.reducer";
import restaurant from "./restaurant/restaurant.reducer";
import image from "./image/image.reducer";
import review from "./review/review.reducer";
import food from "./food/food.reducer";
import cart from "./cart/cart.reducer";

const rootReducer = combineReducers({
  auth,
  user,
  restaurant,
  image,
  review,
  food,
  cart,
});

export default rootReducer;
