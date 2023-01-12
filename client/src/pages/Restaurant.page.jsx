import React from 'react';
import { Outlet } from 'react-router-dom';

// Layouts
import RestaurantLayout from '../layouts/Restaurant.layout';

const Restaurant = () => {
    return <>
        <h4>This is a Restaurant Page</h4>
        <Outlet />
    </>;
};

export default RestaurantLayout(Restaurant);