import React, { useState, useEffect } from 'react';
import icono from '../../asset/images/logo.png'; // Asegúrate de que la ruta sea correcta

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
export function NavBar() {
    const [show, setShow] = useState(null);
    const [profile, setProfile] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const { logout, user } = useAuth();


    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error.message);
        }
    };
    const [theme, setTheme] = useState(() => {
        // On page load or when changing themes, check localStorage for the theme
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            return 'dark';
        } else {
            return 'light';
        }
    });

    // Update the theme in localStorage and apply it to the HTML element
    useEffect(() => {
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };
    // Get the current location
    const location = useLocation();
    const currentPath = location.pathname;

    // Helper function to determine if a link is active
    const isActive = (path) => currentPath === path;
    return (
        <>
            <div className="  w-full z-50">
                {/* Code block starts */}
                <nav className="  w-full mx-auto hidden xl:block bg-gray-200 dark:bg-slate-800 shadow">
                    <div className="container px-6 justify-between h-16 flex items-center lg:items-stretch mx-auto">
                        <div className="h-full flex items-center">
                            <div className="mr-10 flex items-center">
                            <img src={icono} alt="Icono" className="mr-2 w-6 h-6" />

                                <h3 className="text-base text-slate-700 dark:text-white font-bold tracking-normal leading-tight ml-3 hidden lg:block"><Link to="/">Travi</Link></h3>
                            </div>
                            <ul className="pr-12 xl:flex items-center h-full hidden">
                            <li className={`cursor-pointer h-full flex items-center hover:text-indigo-700 text-sm tracking-normal ${isActive('/home') ? 'text-indigo-200 border-b-2 border-indigo-700 dark:border-indigo-300': 'text-slate-700 dark:text-white'}`}>
                                <Link to="/home">Generate Matriz Consc.</Link>
                            </li>
                            <li className={`cursor-pointer h-full flex items-center hover:text-indigo-700 dark:hover:text-indigo-200 text-sm mx-10 tracking-normal ${isActive('/opera') ? 'text-indigo-200 border-b-2 border-indigo-700 dark:border-indigo-300' : 'text-slate-700 dark:text-white'}`}>
                                <Link to="/opera">Oper. Variables</Link>
                            </li>
                            <li className={`cursor-pointer h-full flex items-center hover:text-indigo-700 dark:hover:text-indigo-200 text-sm mx-10 tracking-normal ${isActive('/gemini') ? 'text-indigo-200 border-b-2 border-indigo-700 dark:border-indigo-300' : 'text-slate-700 dark:text-white'}`}>
                                <Link to="/gemini">Gemini</Link>
                            </li>
                            <li className={`cursor-pointer h-full flex items-center hover:text-indigo-700 text-sm mr-10 tracking-normal ${isActive('/parafrasear') ? 'text-indigo-200 border-b-2 border-indigo-700 dark:border-indigo-300' : 'text-slate-700 dark:text-white'}`}>
                                <Link to="/parafrasear">Parafrasea</Link>
                            </li>
                            <li className={`cursor-pointer h-full flex items-center hover:text-indigo-700 text-sm tracking-normal ${isActive('/resumir') ? 'text-indigo-200 border-b-2 border-indigo-700 dark:border-indigo-300' : 'text-slate-700 dark:text-white'}`}>
                                <Link to="/resumir">Resumir</Link>
                            </li>
                        </ul>
                        </div>

                        <div className="h-full xl:flex items-center justify-end hidden">
                            <div className="w-full h-full flex items-center">
                                <button onClick={toggleTheme} className={` h-12 w-12 rounded-lg p-2 mr-2 hover:bg-gray-300 ${theme === 'dark' ? 'dark:bg-gray-700' : ''}`}>
                                    <svg className={`${theme === 'dark' ? 'fill-yellow-500' : 'fill-violet-800'} block dark:hidden`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                    </svg>
                                    <svg className={`${theme === 'dark' ? 'fill-yellow-500' : 'fill-violet-300'} hidden dark:block`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"></path>
                                    </svg>
                                </button>
                                <div className="w-full h-full flex">

                                    <div className="w-full flex items-center justify-end relative cursor-pointer" onClick={() => setProfile(!profile)}>
                                        {profile && (
                                            <ul className="p-2 w-40 border-r bg-white absolute rounded left-0 shadow mt-16 top-0 ">

                                                <li onClick={handleLogout} className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                                    </svg>

                                                    <span className="ml-2"> Sign out</span>


                                                </li>
                                            </ul>
                                        )}

                                        {/* Si hay una URL de foto del usuario, muestra la imagen */}
                                        {user ? (
                                            <>
                                                <p class=" text-slate-700 dark:text-slate-200 text-xs  leading-none mr-2">{user.email && user.email.split('@')[0]}</p>
                                                <img className="rounded-full h-10 w-10 object-cover" src={user.photoURL ? user.photoURL : "https://firebasestorage.googleapis.com/v0/b/tutorial-538a4.appspot.com/o/userDefault.jpg?alt=media&token=3939f559-10ba-4287-ba28-ebcc03779ba6"} alt="logo" />
                                            </>
                                        ) : (
                                            /* Si no hay URL de foto del usuario, muestra una imagen alternativa */
                                            <>
                                                <Link className=" text-slate-900 dark:text-slate-100" to={"/login"}>
                                                    <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Get started</button>

                                                </Link>

                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </nav>
                {/* Navbar */}
                <nav>
                    <div className="py-4 px-6 w-full flex xl:hidden justify-between items-center bg-slate-300 dark:bg-gray-800 fixed top-0 z-40">
                        <div className="w-24">
                      <img src={icono} alt="Icono" className="mr-2 w-6 h-6" />
                        </div>
                        <div className='flex'>
                            <div className="  mr-2">
                                <button onClick={toggleTheme} className={` h-12 w-12 rounded-lg p-2 mr-2 hover:bg-gray-300 ${theme === 'dark' ? 'dark:bg-gray-700' : ''}`}>
                                    <svg className={`${theme === 'dark' ? 'fill-yellow-500' : 'fill-violet-800'} block dark:hidden`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                    </svg>
                                    <svg className={`${theme === 'dark' ? 'fill-yellow-500' : 'fill-violet-300'} hidden dark:block`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"></path>
                                    </svg>
                                </button>
                            </div>
                            <div id="menu" className=" text-slate-800 dark:text-white" onClick={() => setShow(!show)}>
                                {show ? (
                                    " "
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <line x1={4} y1={6} x2={20} y2={6} />
                                        <line x1={4} y1={12} x2={20} y2={12} />
                                        <line x1={4} y1={18} x2={20} y2={18} />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                    {/*Mobile responsive sidebar*/}
                    <div className={show ? "absolute xl:hidden w-full h-full transform -translate-x-0 z-40" : "absolute xl:hidden w-full h-full transform -translate-x-full z-40"} id="mobile-nav">
                        <div className="bg-gray-800 opacity-50 w-full h-full" onClick={() => setShow(!show)} />
                        <div className="w-64 z-40 fixed overflow-y-auto z-40 inset-y-0 bg-gray-800 shadow h-full flex-col justify-between xl:hidden pb-8 transition duration-150 ease-in-out">
                            <div className="px-4 h-full">
                                <div className="flex flex-col justify-between h-full w-full">
                                    <div>
                                        <div className=" flex w-full items-center justify-between">
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center">
                                                <img src={icono} alt="Icono" className="mr-2 w-6 h-6" />
                                                    <p className="text-base  text-white ml-3">Travi</p>
                                                </div>
                                                <div id="cross" className="text-white" onClick={() => setShow(!show)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <line x1={18} y1={6} x2={6} y2={18} />
                                                        <line x1={6} y1={6} x2={18} y2={18} />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <ul className="f-m-m">
                                            <a className="cursor-pointer">
                                                <li className="text-white pt-10">
                                                    <div className="flex items-center">
                                                        <div className="w-6 h-6 md:w-8 md:h-8 text-indigo-700">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                                <rect x={4} y={4} width={6} height={6} rx={1} />
                                                                <rect x={14} y={4} width={6} height={6} rx={1} />
                                                                <rect x={4} y={14} width={6} height={6} rx={1} />
                                                                <rect x={14} y={14} width={6} height={6} rx={1} />
                                                            </svg>
                                                        </div>
                                                        <Link to="/home">   <p className="text-white xl:text-base  text-base ml-3">Generate Matriz Consc.</p></Link>
                                                    </div>
                                                </li>
                                            </a>
                                            <a className="cursor-pointer">
                                                <li className="text-white pt-8">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 md:w-8 md:h-8 text-white">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                                    <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                                                                </svg>
                                                            </div>
                                                            <Link to="/gemini">   <p className="text-white xl:text-base  text-base ml-3">Gemini</p></Link>
                                                        </div>
                                                    </div>
                                                </li>
                                            </a>
                                            <a className="cursor-pointer">
                                                <li className="text-white pt-8">
                                                    <div className="flex items-center">
                                                        <div className="w-6 h-6 md:w-8 md:h-8 text-white">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-compass" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                                <polyline points="8 16 10 10 16 8 14 14 8 16" />
                                                                <circle cx={12} cy={12} r={9} />
                                                            </svg>
                                                        </div>
                                                        <Link to="/parafrasear">   <p className="text-white xl:text-base  text-base ml-3">parafrasear</p></Link>
                                                    </div>
                                                </li>
                                            </a>
                                            <li className="text-white pt-8 cursor-pointer">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className="w-6 h-6 md:w-8 md:h-8 text-white">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-code" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                                <polyline points="7 8 3 12 7 16" />
                                                                <polyline points="17 8 21 12 17 16" />
                                                                <line x1={14} y1={4} x2={10} y2={20} />
                                                            </svg>
                                                        </div>
                                                        <Link to="/resumir"><p className="text-white xl:text-base  text-base ml-3">Resumir</p></Link>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="w-full pt-4">

                                        <div className="border-t border-gray-700">
                                            <div className=" mt-2">
                                                {/* Si hay una URL de foto del usuario, muestra la imagen */}
                                                {user ? (
                                                    <div className='flex justify-between'>
                                                        <div className='inline-flex  items-center'>
                                                            <img className="rounded-full h-10 w-10 object-cover" src={user.photoURL ? user.photoURL : "https://firebasestorage.googleapis.com/v0/b/tutorial-538a4.appspot.com/o/userDefault.jpg?alt=media&token=3939f559-10ba-4287-ba28-ebcc03779ba6"} alt="logo" />

                                                            <p class=" text-slate-700 dark:text-slate-200 text-xs  leading-none ml-2">{user.email && user.email.split('@')[0]}</p>
                                                        </div>
                                                        <button onClick={handleLogout} className="cursor-pointer text-gray-600 text-sm text-right leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    /* Si no hay URL de foto del usuario, muestra una imagen alternativa */
                                                    <>
                                                        <Link className="text-slate-100" to={"/login"}>LognIn</Link>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                    </div>
                </nav>
                {/* Sidebar ends */}

                {/* Code block ends */}
            </div>
        </>
    );
}
