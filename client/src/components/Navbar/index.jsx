import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiSearch2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

// components
import SignUp from "../Auth/Signup";
import SignIn from "../Auth/Signin";

// redux
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/reducers/auth/auth.action";
import { clearUser } from "../../redux/reducers/user/user.action";

const MobileNav = ({
  user,
  isDropdownOpen,
  setIsDropdownOpen,
  signIn,
  signUp,
}) => {
  const SignIn = () => {
    signIn();
    setIsDropdownOpen(false);
  };

  const SignUp = () => {
    signUp();
    setIsDropdownOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SignOut = () => {
    dispatch(signOut());
    dispatch(clearUser());
    navigate("/delivery");
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex w-full items-center justify-between lg:hidden">
      <div className="w-28">
        <Link to="/">
          <img
            src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
            alt="logo"
            className="w-full h-full"
          />
        </Link>
      </div>
      <div className="flex items-center gap-3 relative">
        <button className="bg-zomato-400 text-white py-2 px-3 rounded-full">
          Use App
        </button>
        {user?.fullName ? (
          <>
            <div
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="border border-gray-300 text-zomato-400 w-9 h-9 rounded-full"
            >
              <img
                src="/images/avatar.png"
                alt="avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            {isDropdownOpen && (
              <div className="absolute shadow-lg py-3 -bottom-14 w-36 z-20 flex flex-col gap-2 bg-white border border-gray-200">
                <button onClick={SignOut}>Sign Out</button>
              </div>
            )}
          </>
        ) : (
          <>
            <span
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="border p-2 border-gray-400 rounded-full"
            >
              <FaUserAlt className="w-full h-full" />
            </span>

            {isDropdownOpen && (
              <div className="absolute shadow-lg py-3 -bottom-24 w-full z-20 flex flex-col gap-2 bg-white border border-gray-200">
                <button onClick={SignIn}>Sign In</button>
                <button onClick={SignUp}>Sign Up</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const LargeNav = ({
  user,
  isDropdownOpen,
  setIsDropdownOpen,
  signIn,
  signUp,
}) => {
  const SignIn = () => {
    signIn();
    setIsDropdownOpen(false);
  };

  const SignUp = () => {
    signUp();
    setIsDropdownOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SignOut = () => {
    dispatch(signOut());
    dispatch(clearUser());
    navigate("/delivery");
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full items-center justify-between hidden lg:flex px-14">
      <div className="gap-4  items-center justify-around flex">
        <div className="w-20">
          <Link to="/">
            <img
              src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
              alt="logo"
              className="w-full h-full"
            />
          </Link>
        </div>
      </div>
      <div className="w-3/4 bg-white shadow-md p-3 flex items-center gap-3 border border-gray-200 rounded">
        <div className="flex items-center gap-2 border-r-2 border-gray-300 pr-2">
          <span className="text-zomato-400">
            <HiLocationMarker />
          </span>
          <input
            type="text"
            placeholder="Delhi NCR"
            className="w-full focus:outline-none"
          />
          <IoMdArrowDropdown />
        </div>

        <div className="flex w-full items-center gap-2">
          <RiSearch2Line />
          <input
            type="search"
            placeholder="Search for restaurant, cuisine or a dish"
            className="w-full focus:outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 relative">
        {user?.fullName ? (
          <>
            <div
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="border border-gray-300 text-zomato-400 w-9 h-9 rounded-full"
            >
              <img
                src="/images/avatar.png"
                alt="avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            {isDropdownOpen && (
              <div className="absolute shadow-lg py-3 -bottom-14 -right-0 w-36 z-20 flex flex-col gap-2 bg-white border border-gray-200">
                <button onClick={SignOut}>Sign Out</button>
              </div>
            )}
          </>
        ) : (
          <>
            <span
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="border p-2 border-gray-400 rounded-full"
            >
              <FaUserAlt className="w-full h-full" />
            </span>

            {isDropdownOpen && (
              <div className="absolute shadow-lg py-3 -bottom-24 -right-0 w-36 z-20 flex flex-col gap-2 bg-white border border-gray-200">
                <button onClick={SignIn}>Sign In</button>
                <button onClick={SignUp}>Sign Up</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const Navbar = () => {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const openSignInModal = () => setOpenSignIn(true);
  const openSignUpModal = () => setOpenSignUp(true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const user = {
  //   // fullName: "Aditya",
  // };

  const user = useSelector((globalState) => globalState.user);

  return (
    <>
      <SignIn isOpen={openSignIn} setIsOpen={setOpenSignIn} />
      <SignUp isOpen={openSignUp} setIsOpen={setOpenSignUp} />

      <nav className="p-4 lg:py-2 flex bg-white shadow-md lg:shadow-none lg:border-b-2 border-gray-100 w-full items-center">
        <MobileNav
          user={user}
          setIsDropdownOpen={setIsDropdownOpen}
          isDropdownOpen={isDropdownOpen}
          signIn={openSignInModal}
          signUp={openSignUpModal}
        />

        <LargeNav
          user={user}
          setIsDropdownOpen={setIsDropdownOpen}
          isDropdownOpen={isDropdownOpen}
          signIn={openSignInModal}
          signUp={openSignUpModal}
        />
      </nav>
    </>
  );
};

export default Navbar;
