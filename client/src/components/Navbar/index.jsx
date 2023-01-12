import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { RiSearch2Line } from "react-icons/ri";

const MobileNav = () => {
    return (
        <div className="flex w-full items-center justify-between md:hidden">
            <div className="w-28">
                <img src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png" alt="logo" className="w-full h-full" />
            </div>

            <div className="flex items-center gap-3 relative">
                <button className="bg-zomato-400 text-white py-2 px-3 rounded-full">
                    Use App
                </button>

                <div className="border border-gray-300 text-zomato-400 w-10 h-10 rounded-full">
                    <img src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-handsome-young-guy-avatar-cartoon-style-png-image_5233396.jpg" alt="avatar" className="w-full h-full rounded-full object-cover" />
                </div>

                <div className="absolute shadow-lg py-3 -bottom-20 w-full z-20 flex flex-col gap-2">
                    <button>Sign Out</button>
                </div>
            </div>
        </div>
    )
}

const Navbar = () => {
    return (
        <>
            <MobileNav />
        </>
    );
}

export default Navbar;