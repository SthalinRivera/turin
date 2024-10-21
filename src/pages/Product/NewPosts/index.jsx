import React, { useEffect, useState } from 'react';
import OpenAI from "openai";
import { NavBar } from "../../../components/NavBar";
import { SideBar } from "../../../components/SideBar";
import { Footer } from "../../../components/Footer";
import { PageHeading } from "../../../components/PageHeading";
import { db, storage } from "../../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, getDocs, getDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export function NewPosts() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [state, setState] = useState('');
  const [file, setFile] = useState()
  const [downloadURL, setDownloadURL] = useState(null)
  const [per, setPerc] = useState(null);
  const navigate = useNavigate()
  //Agregar datos a Firebase 
  const productsCollection = collection(db, "posts")
  const store = (e) => {
    e.preventDefault()
    addDoc(productsCollection, { title: title, description: description, category: category, state: state, downloadURL: downloadURL })
    navigate('/product')
  }
  //Leer datos de Firebase 
  const [posts, setPosts] = useState('');
  const postsCollection = collection(db, "posts");
  const getPosts = async () => {
    const data = await getDocs(postsCollection)
    setPosts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )

  }
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name
      console.log(name);
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, 'images/' + name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPerc(progress)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setDownloadURL(downloadURL)
          });
        }
      );

    };
    file && uploadFile();

    getPosts()
  }, [file])

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 text-black dark:text-whiten">
      <NavBar />

      <div className="flex flex-1">
        {/* Barra Lateral */}
        <SideBar />

        {/* Contenido Principal */}
        <main className="flex-1 p-2 md:p-6 bg-gray-100 dark:bg-slate-800">
          <div className='bg-white dark:bg-slate-900 shadow-lg  p-2 md:p-4 rounded-lg font-sans overflow-hidden mx-auto'>

            <div className='flex py-2 px-4 rounded-xl justify-between'>
              <div className=''>
                <p className='text-slate-900 dark:text-slate-200'>New Post</p>
              </div>
              <div className='flex '>
                <Link to="/product"> <button className='button text-white mr-2' >List Posts</button></Link>
              </div>
            </div>
            <div className="">
              <div class=" p-1 md:p-4 flex items-center justify-center">
                <div class="container w-full">

                  <div class=" rounded  px-4 md:p-8 mb-6">
                    <div class="grid gap-6 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">

                      <div class="lg:col-span-2">
                        <form onSubmit={store}>
                          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 text-slate-900 dark:text-slate-200">
                            <div class="col-start-1 col-end-7 md:col-span-5">
                              <label for="full_name">Title</label>
                              <input type="text" name="full_name" id="full_name" value={title} onChange={(e) => setTitle(e.target.value)} class="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-slate-800" />
                            </div>
                            <div class="col-start-1 col-end-7 md:col-span-5">
                              <label for="email">Description</label>
                              <textarea type="text" name="text" id="text" rows="4" class="block  border mt-1 rounded w-full bg-gray-50 dark:bg-slate-800" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="" />
                            </div>
                            <div class=" col-start-1 col-end-7 md:col-span-3">
                              <label for="address">Categoria</label>
                              <input type="text" name="address" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-slate-800" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="" />
                            </div>
                            <div class=" col-start-1 col-end-7 md:col-span-2">
                              <label for="city">State</label>
                              <input type="text" name="city" id="city" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-slate-800" value={state} onChange={(e) => setState(e.target.value)} placeholder="" />
                            </div>
                            <div class="flex items-center justify-center w-full col-start-1 col-end-7 md:col-start-1 md:col-end-3">
                              <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                  <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                  </svg>
                                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                  <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" onChange={(e) => setFile(e.target.files[0])} type="file" class="hidden" />
                              </label>
                            </div>
                            <img className='col-start-1 col-end-7 md:col-start-3 md:col-end-7 md:h-32  md:object-cover rounded-lg' src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                              alt=""
                            />
                            <div class="col-start-1 col-end-7  md:col-span-5 text-right">
                              <div class="md:inline-flex md:items-end">
                                <button type="submit" className={` text-white font-bold py-2 w-full px-4  rounded ${per !== null && per < 100 ? ' bg-slate-500 disabled:bg-slate-500 cursor-not-allowed' : 'bg-blue-500'}`} >Guardar</button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />

    </div>
  );
}
