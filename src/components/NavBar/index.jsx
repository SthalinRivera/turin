import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";
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

    return (
        <>
            <div className="  w-full z-50">
                {/* Code block starts */}
                <nav className="  w-full mx-auto hidden xl:block bg-gray-200 dark:bg-slate-800 shadow">
                    <div className="container px-6 justify-between h-16 flex items-center lg:items-stretch mx-auto">
                        <div className="h-full flex items-center">
                            <div className="mr-10 flex items-center">
                                <svg aria-label="Home" id="logo" enableBackground="new 0 0 300 300" height={44} viewBox="0 0 300 300" width={43} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                    <g>
                                        <path
                                            fill="#4c51bf"
                                            d="m234.735 35.532c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16zm0 24c-4.412 0-8-3.588-8-8s3.588-8 8-8 8 3.588 8 8-3.588 8-8 8zm-62.529-14c0-2.502 2.028-4.53 4.53-4.53s4.53 2.028 4.53 4.53c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.027-4.53-4.529zm89.059 60c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.028-4.53-4.529c0-2.502 2.028-4.53 4.53-4.53s4.53 2.029 4.53 4.53zm-40.522-5.459-88-51.064c-1.242-.723-2.773-.723-4.016 0l-88 51.064c-1.232.715-1.992 2.033-1.992 3.459v104c0 1.404.736 2.705 1.938 3.428l88 52.936c.635.381 1.35.572 2.062.572s1.428-.191 2.062-.572l88-52.936c1.201-.723 1.938-2.023 1.938-3.428v-104c0-1.426-.76-2.744-1.992-3.459zm-90.008-42.98 80.085 46.47-52.95 31.289-23.135-13.607v-21.713c0-2.209-1.791-4-4-4s-4 1.791-4 4v21.713l-26.027 15.309c-1.223.719-1.973 2.029-1.973 3.447v29.795l-52 30.727v-94.688zm0 198.707-80.189-48.237 51.467-30.412 24.723 14.539v19.842c0 2.209 1.791 4 4 4s4-1.791 4-4v-19.842l26.027-15.307c1.223-.719 1.973-2.029 1.973-3.447v-31.667l52-30.728v94.729z"
                                        />
                                    </g>
                                </svg>
                                <h3 className="text-base text-slate-700 dark:text-white font-bold tracking-normal leading-tight ml-3 hidden lg:block"><Link to="/">Flour</Link></h3>
                            </div>
                            <ul className="pr-12 xl:flex items-center h-full hidden">
                                <li className="cursor-pointer h-full flex items-center hover:text-indigo-700 text-sm text-slate-700 dark:text-white  tracking-normal border-b-2 border-white"><Link to="/home"> Home</Link></li>
                                <li className="cursor-pointer h-full flex items-center hover:text-indigo-700 text-sm text-slate-700 dark:text-white mx-10 tracking-normal"><Link to="/gemini"> Gemini</Link></li>
                                <li className="cursor-pointer h-full flex items-center hover:text-indigo-700 text-sm text-slate-700 dark:text-white mr-10 tracking-normal"><Link to="/parafrasear"> Parafrasea</Link></li>
                                <li className="cursor-pointer h-full flex items-center hover:text-indigo-700 text-sm text-slate-700 dark:text-white tracking-normal"><Link to="/resumir"> Resumir</Link></li>

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
                            <svg xmlns="http://www.w3.org/2000/svg" width={43} height={44} viewBox="0 0 43 44" fill="none">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M37.8735 0C36.1688 0 34.7818 1.37956 34.7818 3.0751C34.7818 4.77063 36.1688 6.15019 37.8735 6.15019C39.5782 6.15019 40.9653 4.77063 40.9653 3.0751C40.9653 1.37956 39.5782 0 37.8735 0ZM37.8735 4.61264C37.021 4.61264 36.3277 3.92305 36.3277 3.0751C36.3277 2.22714 37.021 1.53755 37.8735 1.53755C38.7261 1.53755 39.4194 2.22714 39.4194 3.0751C39.4194 3.92305 38.7261 4.61264 37.8735 4.61264ZM26.6663 1.0513C26.1828 1.0513 25.7909 1.44107 25.7909 1.92193C25.7909 2.4028 26.1828 2.79238 26.6663 2.79238C27.1497 2.79238 27.5416 2.40261 27.5416 1.92193C27.5416 1.44107 27.1497 1.0513 26.6663 1.0513ZM43 13.4535C43 13.9342 42.6081 14.324 42.1247 14.324C41.6412 14.324 41.2493 13.9342 41.2493 13.4535C41.2493 12.9727 41.6412 12.5829 42.1247 12.5829C42.6081 12.5829 43 12.9729 43 13.4535ZM18.1654 2.59019L35.1698 12.4044C35.4079 12.5418 35.5548 12.7951 35.5548 13.0692V33.0573C35.5548 33.3273 35.4123 33.5772 35.1803 33.7161L18.1758 43.8901C18.0533 43.9633 17.915 44 17.7774 44C17.6398 44 17.5016 43.9633 17.3789 43.8901L0.374484 33.7161C0.142219 33.5772 0 33.3271 0 33.0573V13.0692C0 12.7951 0.146857 12.5418 0.384919 12.4044L17.3894 2.59019C17.6296 2.45124 17.9254 2.45124 18.1654 2.59019ZM17.7774 4.14388L33.2524 13.0751L23.0207 19.0887L18.5503 16.4735V12.3004C18.5503 11.8758 18.2042 11.5316 17.7774 11.5316C17.3505 11.5316 17.0044 11.8758 17.0044 12.3004V16.4735L11.9752 19.4158C11.7389 19.554 11.5939 19.8057 11.5939 20.0783V25.8047L1.54586 31.7102V13.5118L17.7774 4.14388ZM2.28227 33.0632L17.7774 42.3341L34.0091 32.6225V14.4162L23.961 20.322V26.4081C23.961 26.6807 23.8161 26.9325 23.5798 27.0706L18.5505 30.0125V33.826C18.5505 34.2506 18.2044 34.5948 17.7776 34.5948C17.3507 34.5948 17.0046 34.2506 17.0046 33.826V30.0125L12.2274 27.2182L2.28227 33.0632Z"
                                    fill="#667EEA"
                                />
                            </svg>
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
                        <div className="w-64 z-40 fixed overflow-y-auto z-40 top-0 bg-gray-800 shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
                            <div className="px-6 h-full">
                                <div className="flex flex-col justify-between h-full w-full">
                                    <div>
                                        <div className="mt-6 flex w-full items-center justify-between">
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={43} height={44} viewBox="0 0 43 44" fill="none">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M37.8735 0C36.1688 0 34.7818 1.37956 34.7818 3.0751C34.7818 4.77063 36.1688 6.15019 37.8735 6.15019C39.5782 6.15019 40.9653 4.77063 40.9653 3.0751C40.9653 1.37956 39.5782 0 37.8735 0ZM37.8735 4.61264C37.021 4.61264 36.3277 3.92305 36.3277 3.0751C36.3277 2.22714 37.021 1.53755 37.8735 1.53755C38.7261 1.53755 39.4194 2.22714 39.4194 3.0751C39.4194 3.92305 38.7261 4.61264 37.8735 4.61264ZM26.6663 1.0513C26.1828 1.0513 25.7909 1.44107 25.7909 1.92193C25.7909 2.4028 26.1828 2.79238 26.6663 2.79238C27.1497 2.79238 27.5416 2.40261 27.5416 1.92193C27.5416 1.44107 27.1497 1.0513 26.6663 1.0513ZM43 13.4535C43 13.9342 42.6081 14.324 42.1247 14.324C41.6412 14.324 41.2493 13.9342 41.2493 13.4535C41.2493 12.9727 41.6412 12.5829 42.1247 12.5829C42.6081 12.5829 43 12.9729 43 13.4535ZM18.1654 2.59019L35.1698 12.4044C35.4079 12.5418 35.5548 12.7951 35.5548 13.0692V33.0573C35.5548 33.3273 35.4123 33.5772 35.1803 33.7161L18.1758 43.8901C18.0533 43.9633 17.915 44 17.7774 44C17.6398 44 17.5016 43.9633 17.3789 43.8901L0.374484 33.7161C0.142219 33.5772 0 33.3271 0 33.0573V13.0692C0 12.7951 0.146857 12.5418 0.384919 12.4044L17.3894 2.59019C17.6296 2.45124 17.9254 2.45124 18.1654 2.59019ZM17.7774 4.14388L33.2524 13.0751L23.0207 19.0887L18.5503 16.4735V12.3004C18.5503 11.8758 18.2042 11.5316 17.7774 11.5316C17.3505 11.5316 17.0044 11.8758 17.0044 12.3004V16.4735L11.9752 19.4158C11.7389 19.554 11.5939 19.8057 11.5939 20.0783V25.8047L1.54586 31.7102V13.5118L17.7774 4.14388ZM2.28227 33.0632L17.7774 42.3341L34.0091 32.6225V14.4162L23.961 20.322V26.4081C23.961 26.6807 23.8161 26.9325 23.5798 27.0706L18.5505 30.0125V33.826C18.5505 34.2506 18.2044 34.5948 17.7776 34.5948C17.3507 34.5948 17.0046 34.2506 17.0046 33.826V30.0125L12.2274 27.2182L2.28227 33.0632Z"
                                                            fill="#667EEA"
                                                        />
                                                    </svg>
                                                    <p className="text-base  text-white ml-3">TraviWeb</p>
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
                                                        <Link to="/home">   <p className="text-white xl:text-base  text-base ml-3">Home</p></Link>
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
