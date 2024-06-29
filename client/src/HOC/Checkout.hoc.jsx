import React from "react";
import { Route } from "react-router-dom";

// layout
import CheckoutLayout from "../layouts/Checkout.layout";

function CheckoutLayoutHoc({ component: Component, ...rest }) {
    return (
        <>
            <Route
                {...rest}
                component={(props) => (
                    <CheckoutLayout>
                        <Component {...props} />
                    </CheckoutLayout>
                )}
            />
        </>
    );
}

export default CheckoutLayoutHoc;