import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { NavBar } from "../../../components/NavBar";
import { Footer } from "../../../components/Footer";
import { SideBar } from "../../../components/SideBar";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

export function Users() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("INVITADO");
  const [state, setState] = useState(true);
  const [editUserId, setEditUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, "Users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    } catch (error) {
      showToast("Error al obtener los usuarios.", "error");
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !name.trim() || !role.trim()) {
      showToast("Todos los campos son obligatorios.", "error");
      return;
    }
    try {
      if (editUserId) {
        const userRef = doc(db, "Users", editUserId);
        await updateDoc(userRef, { email, name, role, state });
        showToast("Usuario actualizado correctamente.", "success");
      } else {
        await addDoc(collection(db, "Users"), { email, name, role, state });
        showToast("Usuario agregado con éxito.", "success");
      }
      closeModal();
      fetchUsers();
    } catch (error) {
      showToast("Error al guardar el usuario.", "error");
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm("¿Seguro que quieres eliminar este usuario?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "Users", id));
      showToast("Usuario eliminado correctamente.", "success");
      fetchUsers();
    } catch (error) {
      showToast("Error al eliminar el usuario.", "error");
    }
  };

  const handleEditUser = (user) => {
    setEditUserId(user.id);
    setEmail(user.email);
    setName(user.name);
    setRole(user.role);
    setState(user.state);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditUserId(null);
    setEmail("");
    setName("");
    setRole("");
    setState(true);
    setShowModal(false);
  };

  const showToast = (message, type) => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 lg:p-4 bg-gray-100 dark:bg-gray-800">
          <div className="bg-white dark:bg-slate-900 shadow-lg p-4  rounded-lg">
            <div className="flex justify-between items-center mb-4 mt-20 lg:mt-1">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">Usuarios</h1>
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Agregar Usuario
              </button>
            </div>
            <hr className="my-4" />
            <div className="w-80 lg:w-auto overflow-hidden items-center justify-center content-center">
              <div className="overflow-x-auto ">
                <table className="w-full  bg-white dark:bg-gray-900 rounded-lg shadow-lg text-sm text-gray-900 dark:text-gray-200">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 text-xs text-left">
                      <th className="py-2 px-2 md:px-4 border-b">Email</th>
                      <th className="py-2 px-2 md:px-4 border-b">Nombre</th>
                      <th className="py-2 px-2 md:px-4 border-b hidden sm:table-cell">Rol</th>
                      <th className="py-2 px-2 md:px-4 border-b">Estado</th>
                      <th className="py-2 px-2 md:px-4 border-b">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="py-2 px-2 md:px-4 border-b text-xs md:text-sm">{user.email}</td>
                        <td className="py-2 px-2 md:px-4 border-b text-xs md:text-sm">{user.name}</td>
                        <td className="py-2 px-2 md:px-4 border-b hidden sm:table-cell text-xs md:text-sm">{user.role}</td>
                        <td className="py-2 px-2 md:px-4 border-b text-xs md:text-sm">
                          <span className={`px-2 py-1 rounded-md text-white ${user.state ? 'bg-green-500' : 'bg-red-500'}`}>
                            {user.state ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="py-2 px-2 md:px-4 border-b flex flex-col md:flex-row items-center gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-blue-600 hover:underline text-xs md:text-sm"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>

                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:underline text-xs md:text-sm"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>

                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />

      {/* Modal de Usuario */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg dark:text-slate-50 text-slate-900 font-bold mb-4">{editUserId ? "Editar Usuario" : "Agregar Usuario"}</h2>
            <form onSubmit={handleUserSubmit} className="space-y-3">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2 rounded w-full" />
              <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required className="border p-2 rounded w-full" />
              <select value={role} onChange={(e) => setRole(e.target.value)} required className="border p-2 rounded w-full">
                <option value="" disabled>Selecciona un rol</option>
                <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                <option value="INVITADO">INVITADO</option>
              </select>
              <label className="flex items-center">
                <input type="checkbox" checked={state} onChange={(e) => setState(e.target.checked)} className="form-checkbox h-5 w-5" />
                <span className="ml-2 dark:text-slate-50 text-slate-900">Activo</span>
              </label>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">Guardar</button>
            </form>
            <button onClick={closeModal} className="mt-3 w-full text-center text-gray-600">Cancelar</button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-5 right-5 z-50 bg-${toastMessage.type === "success" ? "green" : "red"}-500 text-white px-4 py-2 rounded-lg shadow-lg`}>
          {toastMessage.message}
        </div>
      )}
    </div>
  );
}
