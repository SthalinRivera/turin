import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { collection, getDocs, getDoc, updateDoc, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { Login } from "../Login";
import { useNavigate, useParams } from "react-router-dom"
import { db } from "../../firebase";
export function Modal({ closeModal, postId }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [state, setState] = useState('');
    const navigate = useNavigate();

    const getPostsById = async (postId) => {
        const post = await getDoc(doc(db, "posts", postId))
        if (post.exists()) {
            console.log(post.data())
            setTitle(post.data().title)
            setDescription(post.data().description)
            setCategory(post.data().category)
            setState(post.data().state)
        } else {
            console.log('El producto no existe')
        }
    }
    const update = async (e) => {
        e.preventDefault()
        const post = doc(db, "posts", postId)
        const data = { title: title, description: description, category: category, state: state }
        await updateDoc(post, data)
        navigate('/product')
    }
    useEffect(() => {
        getPostsById(postId)    
    }, [])
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  ">

                        <p className="text-center text-slate-900 font-semibold mt-6">Actulizar datos</p>
                        <form onSubmit={update} className="p-6">
                            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                <div class="md:col-span-5">
                                    <label for="full_name">Title</label>
                                    <input type="text" name="full_name" id="full_name" value={title} onChange={(e) => setTitle(e.target.value)} class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                </div>

                                <div class="md:col-span-5">
                                    <label for="email">Description</label>
                                    <input type="text" name="text" id="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="" />
                                </div>

                                <div class="md:col-span-3">
                                    <label for="address">Categoria</label>
                                    <input type="text" name="address" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="" />
                                </div>

                                <div class="md:col-span-2">
                                    <label for="city">State</label>
                                    <input type="text" name="city" id="city" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={state} onChange={(e) => setState(e.target.value)} placeholder="" />
                                </div>


                                <div class="flex items-center justify-center w-full col-start-1 col-end-7">
                                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" class="hidden" />
                                    </label>
                                </div>


                                <div class="md:col-span-5 text-right">
                                    <div class="inline-flex items-end">
                                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                                    </div>
                                    <div class="inline-flex items-end">
                                        <button class="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded  ml-3" onClick={closeModal}>Close</button>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}