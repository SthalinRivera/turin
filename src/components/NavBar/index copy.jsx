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
            <nav class="wrapper h-20 flex items-center bg-emerald-400 justify-between">
                <Link to="/" className="w-1/3 max-w-[140px]"><img src={logo} class="w-full" /></Link>
                <input type="checkbox" id="menu" class="peer hidden" />
                <label for="menu" class="bg-open-menu w-6 h-5 bg-cover bg-center cursor-pointer peer-checked:bg-close-menu transition-all z-40 md:hidden"></label>
                <div className='relative flex'>
                    <div class="fixed inset-0 bg-gradient-to-b from-white/70 to-black/70 translate-x-full peer-checked:translate-x-0 transition-transform z-30 md:static md:bg-none md:translate-x-0">
                        <ul class="absolute inset-x-0 top-24 p-12 bg-white w-[90%] mx-auto rounded-md h-max text-center grid gap-6 font-bold text-dark-blue  md:w-max md:bg-transparent md:p-0 md:grid-flow-col md:static">
                            <li><Link to="/prueba"> Prueba</Link></li>
                            <li><Link to="/speech-generator"> speech-generator</Link></li>
                        </ul>
                    </div>
                    <div>
                    </div>
                    <div className=''>

                        {user ? (
                            <div className='bg-sky-300'>
                                <div className=' flex'>
                                    <button type="button" className="relative flex " id="user-menu-button" aria-expanded={isOpen} aria-haspopup="true" onClick={toggleMenu}>
                                        {user.photoURL && <img src={user.photoURL} className='w-12 rounded-full' alt="User Photo" />}
                                    </button>
                                    <p className='text-sm font-normal  ml-4 md:hidden'> {user.email}</p>
                                </div>
                      
                            </div>
                        ) : (
                            <Link className='button shadow-sm shadow-bright-red/30 hidden py-3 lg:block' to="/login" relative="path"> LognIn   </Link>
                        )}
                    </div>
                </div>
            </nav>
            {isOpen && (
                <div className="absolute "
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                    onBlur={() => setIsOpen(false)}
                >
              

                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2" onClick={handleLogout}>
                        Cerrar sesión</a>
                </div>
            )}


            <div class="relative inline-block text-left">
                <div>
                    <button type="button" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                        Options
                        <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="py-1" role="none">

                        <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
                        <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
                        <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">License</a>
                        <form method="POST" action="#" role="none">
                            <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="flex flex-1 bg-gray-50">
    <div class="hidden md:flex md:w-64 md:flex-col">
        <div class="flex flex-col flex-grow pt-5 overflow-y-auto bg-white">
            <div class="flex items-center flex-shrink-0 px-4">
                <img class="w-auto h-8" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo.svg" alt="" />
            </div>

            <div class="px-4 mt-8">
                <label for="" class="sr-only"> Search </label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>

                    <input type="search" name="" id="" class="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm" placeholder="Search here" />
                </div>
            </div>

            <div class="px-4 mt-6">
                <hr class="border-gray-200" />
            </div>

            <div class="flex flex-col flex-1 px-3 mt-6">
                <div class="space-y-4">
                    <nav class="flex-1 space-y-2">
                        <a href="#" title="" class="flex items-center px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-indigo-600 rounded-lg group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 text-white" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Dashboard
                        </a>

                        <a href="#" class="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Tickets
                        </a>

                        <a href="#" class="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Agents
                        </a>

                        <a href="#" class="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Customers
                            <svg class="w-4 h-6 ml-auto text-gray-400 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                    </nav>

                    <hr class="border-gray-200" />

                    <nav class="flex-1 space-y-2">
                        <a href="#" class="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            Products
                        </a>

                        <a href="#" class="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            Orders
                        </a>

                        <a href="#" class="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Analytics
                            <svg class="w-4 h-6 ml-auto text-gray-400 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                    </nav>

                    <hr class="border-gray-200" />

                    <nav class="flex-1 space-y-2">
                        <a href="#" class="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                        </a>
                    </nav>
                </div>

                <div class="pb-4 mt-20">
                    <button type="button" class="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:bg-gray-100">
                        <img class="flex-shrink-0 object-cover w-6 h-6 mr-3 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/2/avatar-male.png" alt="" />
                        Jacob Jones
                        <svg class="w-5 h-5 ml-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="flex flex-col flex-1">
        <main>
            <div class="py-6">
                <div class="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                  
                </div>
            </div>
        </main>
    </div>
</div>

        </>
    )

}