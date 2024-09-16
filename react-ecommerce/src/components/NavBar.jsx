// COMPONENTS FILE SHOULD CONTAIN ALL COMMON/GLOBAL COMPONENTS/FILES USED
import { memo, useContext, useEffect, useState } from "react";

////now styles is an object and each class is a property to this object
// import styles from "./style.module.css"
import { FaPhone } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { AppContext } from "../context/AppContext";
import { FaCartShopping } from "react-icons/fa6";
import profile from "./images/profile.jpg";

// tailwind -> utility classes => way to handle responsiveness, RTL(right to left), TLR, Dark mode, Light, override classes
// bootstrap -> Grid system utility classes - components => js => dom directly which is wrong in React ... as React deals with React by itself

// tailwind classes [] (imports needed classes only)
// bootstrap size is big (imports all)

// before initial render -> props was still undefined
// then when actual valaue is passed to props then useEffect triggers

/*  to add multiple classes while using styles.nav: 
        <div className={`${styles.nav} text-slate-700 mt-7` }>
            <p>hamada</p>
        </div>*/

// export default function NavBar (){
const NavBar = () => {

    const { valueObj, isScrolled, setIsScrolled, setIsSidebarVisible, cartItems, isCartMenuVisible, setIsCartMenuVisible } = useContext(AppContext);
    const { logOut, user } = valueObj;

    const location = useLocation();

    const navigate = useNavigate();

    const handleSideBarClick = () => {
        setIsSidebarVisible(1);
    };
     
    const handleCartClick = () => {
        setIsCartMenuVisible(!isCartMenuVisible);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 25);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {/* 1st Navbar */}
            <nav className="bg-[#3e5067] h-12 flex items-center text-[0.75rem] text-sm md:font-medium text-white font-serif">
                <div className="flex-grow flex justify-start ">
                    <p className="ms-6 me-5 ">Welcome to Our store Multikart</p>
                    <FaPhone className="mt-1"/>
                    <p className="ms-3">Call Us: 123 - 456 - 7890</p>
                </div>

                {/* <div className="flex justify-end me-7">
                    <p className="">Login</p>
                </div> */}
            </nav>            
            {/* 2nd Navbar */}
            <nav className={`fixed z-10 top-0 text-[#3e5067] py-[1rem] w-full border shadow h-[12vh] flex bg-white ${isScrolled ? 'top-0' : 'top-12'}`}>
                
                <div className="flex-grow flex justify-start ms-7  ">
                    {location.pathname.includes("home") ? <IoMenu className="cursor-pointer z-20" size={32} onClick={handleSideBarClick} /> : <></>}
  
                    <Link to={"/home"} className="me-2">
                        <img className="ms-7" src="/images/18.png"/>  
                    </Link>  
                </div>
                
                <div className="flex justify-end align-middle text-lg font-bold mt-3 z-30">
                    <Link to={"/home"} className="me-4">Home</Link>   
                    <Link to={"/home/posts"} className="me-4">Posts</Link>  
                </div>
                <div>
                    {user ? (
                    <div className="flex justify-between align-middle gap-5 ">
                        <FaCartShopping className="mt-3 relative cursor-pointer hover:text-blue-800" size={22} onClick={handleCartClick}/>
                        <p className="absolute bg-red-600 mt-2 rounded-md px-1 translate-x-2 -translate-y-1 text-xs ">{cartItems.length}</p>
                        <img
                            class="w-10 h-10 rounded-full"
                            onClick={() => logOut(navigate)}
                            src={profile}
                            alt="Rounded avatar"
                        />
                    </div>
                    ) : (
                        <Link className={"flex text-lg justify-end align-middle font-bold mt-3 z-30 me-7"} to={"/auth"}>Sign In</Link>
                    )}
                </div>
            </nav>
        </>
    );
}

export default memo(NavBar);