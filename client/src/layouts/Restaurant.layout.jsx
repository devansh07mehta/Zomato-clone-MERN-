import React from 'react';

// import react icons
import { TiStarOutline } from 'react-icons/ti';
import { RiDirectionLine, RiShareForwardLine } from 'react-icons/ri';
import { BiBookmarkPlus } from 'react-icons/bi';

// import for components
import Navbar from "../components/Navbar";
// import ImageGrid from "../components/Restaurant/ImageGrid";
// import InfoButton from "../components/Restaurant/InfoButton";
// import RestaurantInfo from "../components/Restaurant/RestaurantInfo";
// import Tabs from "../components/Restaurant/Tabs";
// import CartContainer from "../components/Cart/CartContainer";

const RestaurantLayout = (Component) => ({ ...props }) => {
    return <>
        <Navbar />
        {/* <div className='container mx-auto px-4 mt-8 lg:px-20 pb-20'> */}
            {/* <ImageGrid images={} /> */}
            {/* <RestaurantInfo name='' restaurantRating='' deliverRating='' cuisine='' />
            <div className='my-4 flex flex-wrap gap-3 mx-auto'>
                <InfoButton isActive='true'>
                    <TiStarOutline />
                    Add Review
                </InfoButton>
                <InfoButton>
                    <RiDirectionLine />
                    Direction
                </InfoButton>
                <InfoButton>
                    <BiBookmarkPlus />
                    Bookmark
                </InfoButton>
                <InfoButton>
                    <RiShareForwardLine />
                    Share
                </InfoButton>
            </div>

            <div className='my-10'>
                <Tabs />
            </div> */}
            <Component {...props} /> 
        {/* </div> */}
        {/* <CartContainer /> */}
    </>
};

export default RestaurantLayout;