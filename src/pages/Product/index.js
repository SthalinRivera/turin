import React, { useEffect, useState } from 'react';
import OpenAI from "openai";
import { NavBar } from "../../components/NavBar";
import { SideBar } from "../../components/SideBar";
import { Footer } from "../../components/Footer";
import { db, storage } from "../../firebase";
import { collection, getDocs, getDoc, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { async } from '@firebase/util'
import { Edit } from "../../pages/Product/Edit";
import { Link } from "react-router-dom";
export function Product() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [postId, setPostId] = useState(null);
  const openModal = (id) => {
    setPostId(id)
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const postsCollection = collection(db, "posts");
  const getPosts = async () => {
    const data = await getDocs(postsCollection)
    setPosts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
  }

  useEffect(() => {
    getPosts()
  }, [])

  const deletePost = async (id) => {
    const deletePots = doc(db, "posts", id)
    await deleteDoc(deletePots)
    getPosts()
  }

  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="">
      <div class="flex">
        <div class="">
          <SideBar></SideBar>
        </div>
        <div class="wrapper mt-4  ">
          <div className='bg-white shadow-[0_8px_12px_-6px_rgba(0,0,0,0.2)] border p-1 md:p-6 w-full  rounded-lg font-[sans-serif] overflow-hidden mx-auto my-4'>
            <div className='flex  py-6 px-6 rounded-xl justify-between'>
              <div className=''>
                <p>All Post</p>
              </div>
              <div className='flex '>
                <Link to="/product/new-posts"> <button className='button text-white mr-2' >+ new posts</button></Link>
              </div>
            </div>
            <button onClick={handleChangeTheme} className='bg-salate-700'>Mode</button>
            <hr className="my-4 border-gray-300" />
            <div class="md:relative  shadow-md sm:rounded-lg border-dark-blue pt-10 flex-col overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      #
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Foto
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" class="px-6 py-3">
                      <p className='hidden md:block'> Description</p>
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" class="px-6 py-3">
                      State
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(posts) && posts.map((post, index) => (
                    <tr key={post.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {index + 1}
                      </th>
                      <td class="px-4 py-4">
                        <img className='h-12 w-18 object-cover' src={post.downloadURL ? post.downloadURL : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                          alt="" />
                      </td>
                      <td class="px-6 py-4">
                        {post.title}
                      </td>
                      <td class="px-6 py-4">
                        <p className='text-wrap hidden md:block'>  {post.description}</p>
                      </td>
                      <td class="px-6 py-4">
                        {post.category}
                      </td>
                      <td class="px-6 py-4">
                        {post.state}
                      </td>
                      <td class="px-6 py-4">
                        <div className='flex'>
                          <a href="#" class="font-medium bg-green-600 p-1 mr-1 rounded-md hover:bg-green-900 text-slate-50" onClick={() => openModal(post.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg></a>

                          <a href="#" onClick={() => deletePost(post.id)} class="font-medium bg-red-600 p-1 rounded-md hover:bg-red-800 text-zinc-50 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </a>
                        </div>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {modalOpen && <Edit closeModal={closeModal} postId={postId} />}
            </div>

          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
