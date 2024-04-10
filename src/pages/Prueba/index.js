import React, { useEffect, useState } from 'react';
import OpenAI from 'openai';
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, getDoc, deleteDoc, addDoc } from 'firebase/firestore';
export function Prueba() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [price, setPrice] = useState(0)
  const navigate = useNavigate()
  const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
   apiKey: process.env.OPENAI_API_KEY,
  
  });
  console.log(process.env.OPENAI_API_KEY)
  async function fetchResponse() {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: inputValue }
        ],
        model: "gpt-3.5-turbo",
      });

      setResponse(completion.choices[0].message.content);
      const respuesta = completion.choices[0].message.content
      console.log(respuesta);
      // Verifica si hay una respuesta antes de llamar a store()
      if (respuesta) {
        setResponse(respuesta);
        store(respuesta); // Llamar a store después de obtener la respuesta exitosa
      } else {
        console.log("no tengo una respuesta ");
      }
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando solicitud...");
    await fetchResponse();
    console.log("Solicitud enviada.");

  };

  const [products, setProducts] = useState('');
  const productsCollection = collection(db, "products")
  const getProducts = async () => {
    const data = await getDocs(productsCollection)
    //console.log("hola", data.docs);
    setProducts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    console.log(" test", products);
  }

  const productsCollectionStore = collection(db, "products")
  const store = async (respuesta) => {
    console.log("Almacenando en Firebase...");
    console.log(respuesta);
    // Verifica si hay una respuesta antes de almacenar
    if (respuesta) {
      await addDoc(productsCollectionStore, { name: inputValue, price: price, response: respuesta });
      console.log("Datos almacenados en Firebase.");
    } else {
      console.log("No hay respuesta para almacenar en Firebase.");
    }
    //  window.location.reload();
  }

  useEffect(() => {
    getProducts()
  }, [])


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Escribe tu solicitud..." value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
      {response && <p>{response}</p>}



      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">response</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.map((product) => (
            <tr key={product.id}>
              <th scope="row" >1</th>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.response}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

