// src/components/SideBar.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export function SideBar() {
	const menuArray = [false, false, false, false, true];
	const [menu, setMenu] = useState(menuArray);
	const [show, setShow] = useState(false); // Por defecto oculto en móviles

	const toggleMenu = (index) => {
		setMenu((prevMenu) => {
			const newMenu = [...prevMenu];
			newMenu[index] = !newMenu[index];
			return newMenu;
		});
	};

	const { logout, user } = useAuth();
	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error("Error al cerrar sesión: ", error.message);
		}
	};

	return (
		<>
			{/* Botones de toggler para móviles */}
			<div className="fixed top-4 left-4 z-50 md:hidden">
				{!show ? (
					<button
						aria-label="Abrir menú"
						onClick={() => setShow(true)}
						className="p-2 bg-black text-white rounded focus:outline-none"
					>
						<svg
							width={24}
							height={24}
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4 6H20"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M4 12H20"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M4 18H20"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				) : (
					<button
						aria-label="Cerrar menú"
						onClick={() => setShow(false)}
						className="p-2 bg-black text-white rounded focus:outline-none"
					>
						<svg
							width={24}
							height={24}
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M18 6L6 18"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M6 6L18 18"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				)}
			</div>

			{/* Barra Lateral */}
			<div
				className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 shadow-lg transform ${show ? "translate-x-0" : "-translate-x-full"
					} transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:shadow-none z-40`}
			>
				<div className="flex flex-col h-full">
					{/* Logo */}
					<div className="p-4 flex items-center space-x-3 border-b">
						<Link to="/" className="flex items-center space-x-3">
							<svg
								aria-label="Logo"
								width={44}
								height={44}
								fill="#4c51bf"
								xmlns="http://www.w3.org/2000/svg"
							>
								{/* SVG Path */}
								<path d="M234.735 35.532c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16zm0 24c-4.412 0-8-3.588-8-8s3.588-8 8-8 8 3.588 8 8-3.588 8-8 8zm-62.529-14c0-2.502 2.028-4.53 4.53-4.53s4.53 2.028 4.53 4.53c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.027-4.53-4.529zm89.059 60c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.028-4.53-4.529c0-2.502 2.028-4.53 4.53-4.53s4.53 2.029 4.53 4.53z" />
							</svg>
							<h1 className="text-lg font-bold text-slate-900 dark:text-slate-200">TraviAI</h1>
						</Link>
					</div>

					{/* Información del Usuario */}
					{user && (
						<div className="flex items-center p-4 space-x-3 border-b">
							{user.photoURL && (
								<img
									src={user.photoURL}
									alt="Usuario"
									className="w-12 h-12 rounded-full object-cover"
								/>
							)}
							<div className="flex flex-col">
								<p className="text-sm font-bold text-slate-800 dark:text-slate-200">
									{user.displayName}
								</p>
								<p className="text-xs text-slate-800 dark:text-slate-400">{user.email}</p>
							</div>
						</div>
					)}

					{/* Elementos del Menú */}
					<nav className="flex-1 p-4 overflow-y-auto">
						<ul className="space-y-2">
							{/* Dashboard */}
							<li>
								<Link
									to="/dashboard"
									className="flex items-center p-2 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
								>
									<svg
										className="w-6 h-6 mr-3"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5v12m6-12v12"
										/>
									</svg>
									Dashboard
								</Link>
							</li>

							{/* Users */}
							<li>
								<Link
									to="/users"
									className="flex items-center p-2 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
								>
									<svg
										className="w-6 h-6 mr-3"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5.121 17.804A13.935 13.935 0 0112 15c2.673 0 5.194.53 7.379 1.471M5.121 17.804A13.935 13.935 0 0112 15c2.673 0 5.194.53 7.379 1.471M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
									Users
								</Link>
							</li>

							{/* Pots */}
							<li>
								<button
									onClick={() => toggleMenu(0)}
									className="flex justify-between items-center w-full p-2 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
								>
									<span>Pots</span>
									<svg
										className={`w-4 h-4 transform transition-transform ${menu[0] ? "rotate-180" : ""
											}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>
								{menu[0] && (
									<ul className="pl-6 mt-2 space-y-1">
										<li>
											<Link
												to="/product/new-posts"
												className="flex items-center p-2 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-800"
											>
												<span>New Posts</span>
											</Link>
										</li>
										<li>
											<Link
												to="/product"
												className="flex items-center p-2 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-800"
											>
												<span>List Posts</span>
											</Link>
										</li>
									</ul>
								)}
							</li>

							{/* Places */}
							<li>
								<button
									onClick={() => toggleMenu(1)}
									className="flex justify-between items-center w-full p-2 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
								>
									<span>Places</span>
									<svg
										className={`w-4 h-4 transform transition-transform ${menu[1] ? "rotate-180" : ""
											}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>
								{menu[1] && (
									<ul className="pl-6 mt-2 space-y-1">
										<li>
											<Link
												to="/places/new-place"
												className="flex items-center p-2 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-800"
											>
												<span>New Attractive Place</span>
											</Link>
										</li>
										<li>
											<Link
												to="/places"
												className="flex items-center p-2 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-800"
											>
												<span>List Attractive Place</span>
											</Link>
										</li>
									</ul>
								)}
							</li>

							{/* Gallery */}
							<li>
								<button
									onClick={() => toggleMenu(2)}
									className="flex justify-between items-center w-full p-2 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
								>
									<span>Gallery</span>
									<svg
										className={`w-4 h-4 transform transition-transform ${menu[2] ? "rotate-180" : ""
											}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>
								{menu[2] && (
									<ul className="pl-6 mt-2 space-y-1">
										<li>
											<Link
												to="/gallery"
												className="flex items-center p-2 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-800"
											>
												<span>List Gallery</span>
											</Link>
										</li>
									</ul>
								)}
							</li>

							{/* Vendors */}
							<li>
								<button
									onClick={() => toggleMenu(3)}
									className="flex justify-between items-center w-full p-2 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
								>
									<span>Reports</span>
									<svg
										className={`w-4 h-4 transform transition-transform ${menu[3] ? "rotate-180" : ""
											}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>
								{menu[3] && (
									<ul className="pl-6 mt-2 space-y-1">
										<li>
											<Link
												to="/reports"
												className="flex items-center p-2 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-800"
											>
												<span>Reporte models</span>
											</Link>
										</li>
										<li>
											<Link
												to="/reports/satisfaction-report"
												className="flex items-center p-2 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-800"
											>
												<span>Reporte Satisfaciíon usuarios</span>
											</Link>
										</li>
									</ul>
								)}
							</li>
						</ul>
					</nav>

					{/* Botón de Logout */}
					<div className="p-4 border-t">
						<button
							onClick={handleLogout}
							className="w-full flex items-center p-2 text-gray-700 dark:text-gray-300 rounded hover:bg-red-100 dark:hover:bg-gray-800"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-6 h-6 mr-3"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								/>
							</svg>
							Log Out
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
