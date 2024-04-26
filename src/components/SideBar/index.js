import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
export function SideBar() {
	let menuArray = [true, true, true];
	const [menu, setMenu] = useState(menuArray);
	const [show, setShow] = useState(true);

	const setMenuValue = (props) => {
		let newArr = [...menu];
		newArr[props] = !newArr[props];
		setMenu(newArr);
	}

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
		< div className="">
			<div className="z-40 fixed top-0 rounded-r  flex justify-between items-center   xl:w-64 p-1 rounded-sm md:hidden  ">
				<div aria-label="toggler" className="flex justify-center items-center">
					<button aria-label="open" id="open" onClick={() => setShow(true)} className={`${show ? 'hidden' : ''} bg-black rounded-sm focus:outline-none focus:ring-2`}>
						<svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 6H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M4 12H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M4 18H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
					<button aria-label="close" id="close" onClick={() => setShow(false)} className={`${show ? '' : 'hidden'}  bg-black rounded-sm   focus:outline-none focus:ring-2`}>
						<svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M18 6L6 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M6 6L18 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
				</div>
			</div>
			<div className="z-30 fixed top-0 left-0  h-screen xl:w-64 overflow-visible rounded-sm">

				<div id="Main" className={`${show ? 'translate-x-0' : '-translate-x-full'} xl:rounded-r transform  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-full  w-full sm:w-64 bg-white flex-col bottom-1  shadow-xl`}>

					<div className="flex justify-between items-center m-5  space-x-3">
						<svg aria-label="Home" id="logo" enableBackground="new 0 0 300 300" height={44} viewBox="0 0 300 300" width={43} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
							<g>
								<path
									fill="#4c51bf"
									d="m234.735 35.532c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16zm0 24c-4.412 0-8-3.588-8-8s3.588-8 8-8 8 3.588 8 8-3.588 8-8 8zm-62.529-14c0-2.502 2.028-4.53 4.53-4.53s4.53 2.028 4.53 4.53c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.027-4.53-4.529zm89.059 60c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.028-4.53-4.529c0-2.502 2.028-4.53 4.53-4.53s4.53 2.029 4.53 4.53zm-40.522-5.459-88-51.064c-1.242-.723-2.773-.723-4.016 0l-88 51.064c-1.232.715-1.992 2.033-1.992 3.459v104c0 1.404.736 2.705 1.938 3.428l88 52.936c.635.381 1.35.572 2.062.572s1.428-.191 2.062-.572l88-52.936c1.201-.723 1.938-2.023 1.938-3.428v-104c0-1.426-.76-2.744-1.992-3.459zm-90.008-42.98 80.085 46.47-52.95 31.289-23.135-13.607v-21.713c0-2.209-1.791-4-4-4s-4 1.791-4 4v21.713l-26.027 15.309c-1.223.719-1.973 2.029-1.973 3.447v29.795l-52 30.727v-94.688zm0 198.707-80.189-48.237 51.467-30.412 24.723 14.539v19.842c0 2.209 1.791 4 4 4s4-1.791 4-4v-19.842l26.027-15.307c1.223-.719 1.973-2.029 1.973-3.447v-31.667l52-30.728v94.729z"
								/>
							</g>
						</svg>
						<h3 className="text-base text-blue-8000 font-bold tracking-normal leading-tight ml-3"><Link to="/">Flour</Link></h3>
					</div>
					<div className="flex flex-col  items-center px-4 w-full  ">
						<div className=" flex justify-between items-center w-full ">
							<div className="flex justify-center items-center  space-x-2">
								<div>
								{user && user.photoURL && <img src={user.photoURL} className='w-12 rounded-full' alt="User Photo" />}
								</div>
								<div className="flex justify-start flex-col items-start">
									<p className="cursor-pointer text-sm leading-5  text-slate-900 font-bold ">{ user && user.displayName}</p>
									<p className="cursor-pointer text-xs leading-3  text-slate-600 font-bold ">{user && user.email}</p>
								</div>
							</div>
							<svg className="cursor-pointer" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</div>
					</div>

					<div className="mt-6 flex flex-col justify-start items-center  pl-4 w-full border-gray-100 border-b space-y-3 pb-5 ">
						<button className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  focus:text-indigo-400  text-slate-900 font-bold rounded ">
							<svg className="fill-stroke " width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
							<p className="text-base leading-4 ">Dashboard</p>
						</button>
						<button className="flex jusitfy-start items-center w-full  space-x-6 focus:outline-none focus:text-indigo-400   rounded text-slate-900 font-bold ">
							<svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
							<p className="text-base leading-4 ">Users</p>
						</button>
					</div>
					<div className="flex flex-col justify-start items-center   px-6 border-b border-gray-100 w-full  ">
						<button onClick={() => setMenuValue(0)} className="focus:outline-none focus:text-indigo-400   text-slate-900 font-bold  flex justify-between items-center w-full py-5 space-x-14  ">
							<p className="text-sm leading-5  uppercase">Pots</p>
							<svg id="icon1" className={`${menu[0] ? '' : 'rotate-180'} transform duration-100`} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</button>
						<div id="menu1" className={`${menu[0] ? 'flex' : 'hidden'} justify-start  flex-col w-full md:w-auto items-start pb-1 `}>
							<Link to="/product/new-posts"><button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-slate-600 font-bold rounded px-3 py-2  w-full md:w-52">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
									<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
								</svg>

								<p className="text-base leading-4  ">New Posts</p>
							</button>
							</Link>
							<Link to="/product"><button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-slate-600 font-bold rounded px-3 py-2  w-full md:w-52">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
									<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
								</svg>

								<p className="text-base leading-4  ">List Posts</p>
							</button>
							</Link>
						</div>
					</div>
					<div className="flex flex-col justify-start items-center   px-6 border-b border-gray-100 w-full">
						<button onClick={() => setMenuValue(1)} className="focus:outline-none focus:text-indigo-400   text-slate-900 font-bold  flex justify-between items-center w-full py-5 space-x-14  ">
							<p className="text-sm leading-5  uppercase">places</p>
							<svg id="icon1" className={`${menu[1] ? '' : 'rotate-180'} transform duration-100`} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</button>
						<div id="menu1" className={`${menu[1] ? 'flex' : 'hidden'} justify-start  flex-col w-full md:w-auto items-start pb-1 `}>
							<Link to="/places/new-place"><button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-slate-600 font-bold rounded px-3 py-2  w-full md:w-52">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
									<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
								</svg>

								<p className="text-base leading-4 ">New Attractive place</p>
							</button>
							</Link>
							<Link to="/places">	<button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-slate-600 font-bold rounded px-3 py-2  w-full md:w-52">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
									<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
								</svg>

								<p className="text-base leading-4  ">List Attractive place</p>
							</button>
							</Link>
						</div>
					</div>
					<div className="flex flex-col justify-start items-center   px-6 border-b border-gray-100 w-full  ">
						<button onClick={() => setMenuValue(2)} className="focus:outline-none focus:text-indigo-400   text-slate-900 font-bold e flex justify-between items-center w-full py-5 space-x-14  ">
							<p className="text-sm leading-5  uppercase">Gallery</p>
							<svg id="icon1" className={`${menu[2] ? '' : 'rotate-180'} transform duration-100`} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</button>
						<div id="menu1" className={`${menu[2] ? 'flex' : 'hidden'} justify-start  flex-col w-full md:w-auto items-start pb-1 `}>

							<Link to="/gallery">
								<button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-slate-600 font-bold rounded px-3 py-2  w-full md:w-52">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
										<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
									</svg>

									<p className="text-base leading-4  ">List Gallery</p>
								</button>
							</Link>
						</div>
					</div>
					<div className="flex flex-col justify-start items-center   px-6 border-b border-gray-100 w-full  ">
						<button onClick={() => setMenuValue(4)} className="focus:outline-none focus:text-indigo-400   text-slate-900 font-bold  flex justify-between items-center w-full py-5 space-x-14  ">
							<p className="text-sm leading-5 uppercase">VENDORS</p>
							<svg id="icon2" className={`${menu[4] ? '' : 'rotate-180'} transform `} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</button>
						<div className=" flex justify-start flex-col items-start  pb-5 ">
							<div id="menu1" className={`${menu[4] ? 'flex' : 'hidden'} justify-start  flex-col w-full md:w-auto items-start pb-1 `}>
								<Link to={'/'}>

									<button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-slate-600 font-bold rounded px-3 py-2  w-full md:w-52">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
											<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
										</svg>

										<p className="text-base leading-4  ">Messages</p>
									</button>
								</Link>
							</div>
						</div>
					</div>
					<div className="mt-6 flex flex-col justify-start items-center  pl-4 w-full  space-y-3 pb-5 ">
						<button  onClick={handleLogout} className="flex jusitfy-start items-center w-full  space-x-6 focus:outline-none focus:text-indigo-400   rounded text-slate-900 font-bold ">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
								<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
							</svg>

							<p className="text-base leading-4 ">Log Out</p>
						</button>

					</div>
				</div>
			</div>
		</div>
	)
}