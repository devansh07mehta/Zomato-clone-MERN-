import React, { useState, useEffect } from "react";
import RestaurantCard from "../RestaurantCard";

// components
import DeliveryCarousel from "./DeliveryCarousel";

// redux
import { useSelector } from "react-redux";

const Delivery = () => {
  const [restaurantList, setRestaurantList] = useState([]);

  const reduxState = useSelector(
    (globalState) => globalState.restaurant.restaurants
  );

  useEffect(() => {
    reduxState && setRestaurantList(reduxState);
  }, [reduxState]);

  return (
    <>
      <DeliveryCarousel />
      <h1 className="text-xl mt-4 mb-2 md:mt-8 md:text-3xl md:font-semibold">
        Delivery Restaurants in NCR (Delhi)
      </h1>
      <div className="grid gap-0 md:gap-2 md:grid-cols-2 grid-cols-1 lg:grid-cols-3">
        {restaurantList.map((restaurant) => (
          <RestaurantCard {...restaurant} key={restaurant._id} />
        ))}
      </div>
    </>
  );
};

export default Delivery;

// {
//   _id: "124ksjf435245jv34fg3",
//   isPro: true,
//   isOff: true,
//   name: "Nathu's Sweets",
//   restaurantReviewValue: "3.7",
//   cuisine: [
//     "Mithai",
//     "South Indian",
//     "Chinese",
//     "Street Food",
//     "Fast Food",
//     "Desserts",
//     "North Indian",
//   ],
//   averageCost: "450",
// },
// {
//   _id: "sdffdsadadsfadfadsfadsf",
//   isPro: true,
//   isOff: false,
//   name: "Master Koii's",
//   restaurantReviewValue: "4.6",
//   cuisine: ["Asian", "Chinese", "Thai", "Malaysian", "Korean"],
//   averageCost: "600",
// },
// {
//   _id: "124ksjf435245jfdfv34fg3",
//   isPro: true,
//   isOff: true,
//   name: "Nathu's Sweets",
//   restaurantReviewValue: "3.7",
//   cuisine: [
//     "Mithai",
//     "South Indian",
//     "Chinese",
//     "Street Food",
//     "Fast Food",
//     "Desserts",
//     "North Indian",
//   ],
//   averageCost: "450",
// },
