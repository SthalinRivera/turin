
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { NavBar } from "../../../components/NavBar";
import { useNavigate } from "react-router-dom";

import { db } from "../../../firebase";
import { collection, addDoc } from 'firebase/firestore';

export function Create() {
  const { logout, user } = useAuth();
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const navigate = useNavigate()

  console.log(user);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  const productsCollection = collection(db, "products")
  const store = async (e) => {
    e.preventDefault()
    await addDoc(productsCollection, { name: name, price: price })
    navigate('/prueba')
  }

  return (
    <>
      <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div class="text-center">


          <form onSubmit={store}>
            <input class="form-control form-control-lg" type="text" placeholder=".form-control-lg" value={name} onChange={(e) => setName(e.target.value)} />
            <input class="form-control form-control-lg" type="text" placeholder=".form-control-lg" value={price} onChange={(e) => setPrice(e.target.value)} />

            <button type="submit" class="btn btn-primary">Submit</button>
          </form>

        </div>
      </main>
    </>
  );
}
