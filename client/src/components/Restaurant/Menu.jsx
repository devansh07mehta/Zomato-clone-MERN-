import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import getImage from "../../redux/reducers/image/image.action";

// components
import MenuCollection from "./MenuCollection";

const Menu = () => {
  const [menus, setMenus] = useState([]);

  const dispatch = useDispatch();

  const reduxState = useSelector(
    (globalState) => globalState.restaurant.selectedRestaurant.restaurant
  );

  useEffect(() => {
    if (reduxState) {
      dispatch(getImage(reduxState?.menuImages)).then((data) => {
        const images = [];
        data.payload.images.map(({ location }) => images.push(location));
        setMenus(images);
      });
    }
  }, [reduxState]);

  return (
    <div className="flex flex-wrap gap-3">
      <MenuCollection menuTitle="Menu" pages={menus.length} images={menus} />
    </div>
  );
};
export default Menu;
