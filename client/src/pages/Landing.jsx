import React, { useState, useEffect } from "react";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import ButtonTemplate from "../components/ButtonTemplate";
import { LogOut } from "lucide-react";
import Slate from "../components/Slate";
import CursorFollower from "../components/CursorFollower";
import Background from "/bg.jpg";
import Featured from "../components/Featured";
import ScrollText from "../components/ScrollText";
import Opportunities from "../components/Opportunities";
import ScrollAnimation from "../components/ScrollAnimation";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

function Landing() {
  const navigate = useNavigate();
  // const [isClient, setIsClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchIcon, setSearchIcon] = useState("/searchWhite.svg");
  const [userIcon, setUserIcon] = useState("/userWhite.svg");
  const [notiIcon, setNotiIcon] = useState("/notificationWhite.svg");
  const [userImage, setUserImage] = useState(null);

  // const handleSelection = (type) => {
  //   if (type === "client") navigate("/login?type=client");
  //   else if (type === "freelancer") navigate("/login?type=freelancer");
  // };
  const handleGoogleSignIn = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log(result);
        
        const token = await result.user.getIdToken();
  
        // Store token in local storage
        localStorage.setItem("authToken", token);
  
        const response = await fetch("http://localhost:3001/api/protected", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
  
        const userData = await response.json();
        console.log("User Data:", userData);
      } catch (error) {
        console.error("Error during sign-in:", error);
      }
      window.location.reload();
    };

  

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    // localStorage.removeItem("userType");
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    // const type = localStorage.getItem("userType");
    // if (type === "client") setIsClient(true);
    // else setIsClient(false);
    if (token) {
      setIsLoggedIn(true);
      console.log("User is logged in");
    } else {
      localStorage.removeItem("userImage");
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) setUserImage(localStorage.getItem("userImage"));
  }, [isLoggedIn]);

  return (
    <div className="relative w-full min-h-screen bg-black flex flex-col font-labil">
      <div className="z-[999] hidden md:block">
      <CursorFollower />
      </div>
      <img
        src={Background}
        alt="Background"
        className="absolute inset-0 w-full h-auto object-cover z-0"
      />
      <div className="fixed top-8 left-12 z-20">
        <div className="fixed top-8 left-12 z-20 hidden md:block">
          <img src="/logoWhite.svg" alt="Logo" className="w-12 h-auto" />
        </div>
      </div>
      <div className="flex items-center justify-end gap-0 z-50 absolute lg:fixed top-8 right-8">
        <div
          className="relative w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-700 hover:bg-[#A594FD] mr-4"
          onMouseEnter={() => setSearchIcon("/searchBlack.svg")}
          onMouseLeave={() => setSearchIcon("/searchWhite.svg")}
          onClick={() => navigate("/search")}
        >
          <img
            src={searchIcon}
            alt="Search"
            className="w-8 h-8 transition-colors duration-300"
          />
        </div>
        {isLoggedIn ? (
          <div>
            {/* {!isClient ? ( */}

            {/* <div className="flex items-center justify-end gap-4">
                <div
                  className="relative w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-700 hover:bg-[#A594FD] overflow-hidden"
                  onMouseEnter={() =>
                    setUserIcon(userImage || "/userBlack.svg")
                  }
                  onMouseLeave={() =>
                    setUserIcon(userImage || "/userWhite.svg")
                  }
                  onClick={() => navigate(`/profile`)}
                >
                  <img
                    src={userImage || userIcon}
                    alt="User"
                    className={`w-${userImage ? 12 : 8} h-${
                      userImage ? 12 : 8
                    } rounded-full object-cover`}
                  />
                </div>
                <div
                  className="relative w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-700 hover:bg-[#A594FD] overflow-hidden"
                  onMouseEnter={() => setNotiIcon("/notificationBlack.svg")}
                  onMouseLeave={() => setNotiIcon("/notificationWhite.svg")}
                  onClick={() => navigate(`/requests`)}
                >
                  <img
                    src={notiIcon}
                    alt="Notification"
                    className={`w-8 h-8 rounded-full object-cover`}
                  />
                </div>
              </div> */}
              
            {/* {/* ) : ( */}
              <Link to={`/`}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSignOut}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <LogOut className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </Link>
            {/* )} */}
          </div>
        ) : (
          <div className="flex items-center justify-end gap-4">
            <ButtonTemplate
              text="Sign In"
              onClick={() => handleGoogleSignIn()}
            />
          </div>
        )}
      </div>
      <div className="flex-grow relative flex flex-col items-center justify-start w-full h-full z-10">
        <Slate />
        <div className="w-full h-[20vh]" />
        <Featured />
        <div className="w-full h-[20vh]" />
        <hr className="w-3/5 h-[1px] bg-[#EBEBEB] opacity-50" />
        <div className="w-full h-[20vh]" />
        <ScrollText />
        <div className="w-full h-[20vh]" />
        <hr className="w-3/5 h-[1px] bg-[#EBEBEB] opacity-50" />
        <div className="w-full h-[20vh]" />
        <Opportunities />
        <ScrollAnimation />
      </div>
    </div>
  );
}

export default Landing;