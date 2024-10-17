import React, { useEffect, useState } from 'react';
import { NavBar } from "../../../components/NavBar";
import { SideBar } from "../../../components/SideBar";
import { Footer } from "../../../components/Footer";
import { db, storage } from "../../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaList } from "react-icons/fa";

export function NewPlace() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [state, setState] = useState('');
  const [file, setFile] = useState();
  const [downloadURL, setDownloadURL] = useState(null);
  const [per, setPerc] = useState(null);
  const navigate = useNavigate();

  // Agregar datos a Firebase
  const productsCollection = collection(db, "places");
  const store = (e) => {
    e.preventDefault();
    addDoc(productsCollection, {
      title: title,
      description: description,
      category: category,
      state: state,
      downloadURL: downloadURL,
    });
    navigate('/places');
  };

  // Leer datos de Firebase
  const [posts, setPosts] = useState('');
  const postsCollection = collection(db, "places");
  const getPosts = async () => {
    const data = await getDocs(postsCollection);
    setPosts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
      const storageRef = ref(storage, 'images/' + name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPerc(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setDownloadURL(downloadURL);
          });
        }
      );
    };
    file && uploadFile();
    getPosts();
  }, [file]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        {/* Contenido Principal */}
        <main className="flex-1 p-4 md:p-6 bg-gray-100">
          <div className="">
            <div className='bg-white shadow-lg border p-6 rounded-lg'>
              <div className='flex justify-between mb-4'>
                <p className="font-semibold text-xl">New Place</p>
                <Link to="/places">
                  <button className='button bg-blue-500 text-white px-4 py-2 rounded flex items-center'>
                  <FaList />
                  <p className="text-base ml-2">List post</p>
                  </button>
                </Link>
              </div>

              <form onSubmit={store}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label htmlFor="title" className="block text-gray-700">Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="description" className="block text-gray-700">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" rows="4"></textarea>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-gray-700">Category</label>
                    <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded" />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-gray-700">State</label>
                    <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} className="w-full p-2 border rounded" />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="dropzone-file" className="block text-gray-700">Image Upload</label>
                    <input type="file" id="dropzone-file" onChange={(e) => setFile(e.target.files[0])} className="block w-full p-2 border rounded" />
                  </div>

                  <div className="col-span-2 text-right">
                    <button type="submit" className={`text-white font-bold py-2 px-4 rounded ${per !== null && per < 100 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'}`} disabled={per !== null && per < 100}>
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
        
          </div>
        </main>
      </div>
      <Footer />

    </div>
  );
}
