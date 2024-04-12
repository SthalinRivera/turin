import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../asset/images/logo.svg";
export function NavBar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const { logout, user } = useAuth();


    console.log(user);
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error.message);
        }
    };
    return (
        <>
            <nav class="wrapper h-20 flex items-center justify-between">
                <Link  to="/" className="w-1/3 max-w-[140px]">
                <img src={logo} class="w-full" />
                </Link>

                <input type="checkbox" id="menu" class="peer hidden" />
                <label for="menu" class="bg-open-menu w-6 h-5 bg-cover bg-center cursor-pointer peer-checked:bg-close-menu transition-all z-50 md:hidden"></label>
                <div class="fixed inset-0 bg-gradient-to-b from-white/70 to-black/70 translate-x-full peer-checked:translate-x-0 transition-transform z-40 md:static md:bg-none md:translate-x-0">

                    <ul class="absolute inset-x-0 top-24 p-12 bg-white w-[90%] mx-auto rounded-md h-max text-center grid gap-6 font-bold text-dark-blue shadow-2xl md:w-max md:bg-transparent md:p-0 md:grid-flow-col md:static">
                        <li>
                            <Link to="/prueba"> Prueba</Link>
                        </li>

                        <li>
                            <Link to="/speech-generator"> speech-generator</Link>
                        </li>
                    </ul>
                </div>
               
                {user ? (
                    <button
                        type="button"
                        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        onClick={toggleMenu}
                    >
                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">Open user menu</span>
                        {user.photoURL && <img src={user.photoURL} className='w-12 rounded-full' alt="User Photo" />}
                    </button>

                ) : (
                    <Link className='button shadow-sm shadow-bright-red/30 hidden py-3 lg:block' to="/login" relative="path"> LognIn   </Link>
                )}
            </nav>
            {isOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                    onBlur={() => setIsOpen(false)}
                >
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2" onClick={handleLogout}>Sign out</a>
                </div>
            )}
        </>
    )

}