// src/pages/Places/Places.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import { SideBar } from "../../components/SideBar";
import { Edit } from "../../pages/Places/Edit";
import { FaPlusCircle } from "react-icons/fa";


export function Encuesta() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [postId, setPostId] = useState(null);

  const openModal = (id) => {
    setPostId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const getPosts = async () => {
    const postsCollection = collection(db, "places");
    const data = await getDocs(postsCollection);
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "places", id);
    await deleteDoc(postDoc);
    getPosts(); // Refresca los posts después de eliminar
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        {/* Contenido Principal */}
        <main className="flex-1 p-4 md:p-6 bg-gray-100">
          <div className="bg-white shadow-lg border p-4 rounded-lg font-sans">
            {/* Cabecera */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">All Places</h1>
              <Link to="/places/new-place">
                <button className="button text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center">
                  <FaPlusCircle />
                  <p className="text-base ml-2"> New Place</p>
                </button>
              </Link>
            </div>

            <hr className="my-4 border-gray-300" />

            {/* Tabla de Posts */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50 text-gray-700 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-3">#</th>
                    <th className="px-6 py-3">Foto</th>
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">State</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post, index) => (
                      <tr
                        key={post.id}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">
                          <img
                            className="h-12 w-18 object-cover rounded"
                            src={
                              post.downloadURL ||
                              "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt="Place"
                          />
                        </td>
                        <td className="px-6 py-4">{post.title}</td>
                        <td className="px-6 py-4">{post.description}</td>
                        <td className="px-6 py-4">{post.category}</td>
                        <td className="px-6 py-4">{post.state}</td>
                        <td className="px-6 py-4 flex space-x-2">
                          <button
                            className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
                            onClick={() => openModal(post.id)}
                            aria-label="Editar Post"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM19.5 7.125L16.862 4.487"
                              />
                            </svg>
                          </button>
                          <button
                            className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
                            onClick={() => deletePost(post.id)}
                            aria-label="Eliminar Post"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19.428 15.428L18 14M6 9V19a2 2 0 002 2h8a2 2 0 002-2V9m-4 4v6m0 0H8m4 0h4"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-4 text-gray-500"
                      >
                        No hay lugares disponibles.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <Footer />

      {/* Modal de Edición */}
      {modalOpen && <Edit closeModal={closeModal} postId={postId} />}
    </div>
  );
}
