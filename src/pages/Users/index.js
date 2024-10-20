// src/pages/Places/Places.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import { SideBar } from "../../components/SideBar";
import { FaPlusCircle, FaRedo } from "react-icons/fa";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

export function Users() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [state, setState] = useState(true);
  const [editUserId, setEditUserId] = useState(null);
  const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
    resetForm(); // Resetea el formulario al ocultarlo
  };
  // Función para obtener los usuarios desde Firebase
  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, "Users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  // Función para agregar o actualizar un usuario
  const handleUserSubmit = async (e) => {
    e.preventDefault();

    if (editUserId) {
      // Actualizar usuario
      const userRef = doc(db, "Users", editUserId);
      await updateDoc(userRef, { email, name, role, state });
    } else {
      // Agregar nuevo usuario
      await addDoc(collection(db, "Users"), { email, name, role, state });
    }

    // Resetear el formulario y volver a obtener los usuarios
    resetForm();
    fetchUsers();
  };

  // Función para eliminar un usuario
  const handleDeleteUser = async (id) => {
    await deleteDoc(doc(db, "Users", id));
    fetchUsers();
  };

  // Función para llenar el formulario para editar
  const handleEditUser = (user) => {
    setEditUserId(user.id);
    setEmail(user.email);
    setName(user.name);
    setRole(user.role);
    setState(user.state);
  };

  // Función para resetear el formulario
  const resetForm = () => {
    setEditUserId(null);
    setEmail("");
    setName("");
    setRole("");
    setState(true);
  };

  // Obtener usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 p-2 md:p-6 bg-gray-100 dark:bg-gray-800">
          <div className="bg-white dark:bg-slate-900 shadow-lg  p-2 md:p-4 rounded-lg font-sans">
            {/* Cabecera */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">Users</h1>
              <button onClick={toggleFormVisibility} className="button text-white text-sm md:text-base px-3 py-2 rounded hover:bg-blue-700 transition flex items-center">
                {showForm ? "Ocultar Formulario" : "Agregar Usuario"}
              </button>

            </div>

            <hr className="my-2 md:my-4 " />

            {/* Formulario para agregar/actualizar usuario */}
            {showForm && (
              <form onSubmit={handleUserSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full"
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full"
                />
                <label className="inline-flex items-center col-span-1 md:col-span-3 mb-2">
                  <input
                    type="checkbox"
                    checked={state}
                    onChange={(e) => setState(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-800 dark:text-white">Activo</span>
                </label>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-1 md:col-span-3">
                  {editUserId ? "Actualizar Usuario" : "Agregar Usuario"}
                </button>
              </form>
            )}

            {/* Tabla de Usuarios */}
            <table className="min-w-full bg-white dark:bg-gray-900 ">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Role</th>
                  <th className="py-2 px-4 border-b">State</th>
                  <th className="py-2 px-4 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200">
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.role}</td>
                    <td className="py-2 px-4 border-b">{user.state ? "Activo" : "Inactivo"}</td>
                    <td className="py-2 px-4 border-b">
                      <button onClick={() => handleEditUser(user)} className="text-blue-600 hover:underline mr-2">Editar</button>
                      <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:underline">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
