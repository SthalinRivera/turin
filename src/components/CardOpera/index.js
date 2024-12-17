import React, { useEffect, useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import "../../index.css";
import { db } from "../../firebase";
import { ViewHome } from "../../pages/Opera/ViewHome";
import { collection, onSnapshot, doc, addDoc, updateDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';

export function Card({ product }) {
    const [like, setLike] = useState(null);
    const [userLiked, setUserLiked] = useState(false);
    const { user } = useAuth(); // Obtén el usuario actual de tu contexto de autenticación
    const [views, setViews] = useState(null)
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };



    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "Matrices", product.id), (doc) => {
            if (doc.exists()) {
                setLike(doc.data().like);
                setViews(doc.data().views); // Actualiza el estado de las vistas al valor de la base de datos

            } else {
                console.log('El producto no existe');
            }
        });
        // Suscribirse a cambios en la colección de "likes" para el usuario y el producto actual
        const likesQuery = query(collection(db, 'likesOpera'),
            where('userId', '==', user.uid),
            where('productId', '==', product.id));
        const unsubscribeLikes = onSnapshot(likesQuery, (snapshot) => {
            setUserLiked(!snapshot.empty);
        });
        return () => {
            unsubscribe();
            unsubscribeLikes();
        };
    }, [user, product.id, userLiked]);

    const handleLike = async () => {
        if (!user) {
            // Manejar el caso donde no hay usuario autenticado
            return;
        }

        if (userLiked) {
            // Si el usuario ya dio like, eliminar el like
            const q = query(collection(db, 'likesOpera'),
                where('userId', '==', user.uid),
                where('productId', '==', product.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
            // Disminuir el contador de likes en la tabla de productos
            await updateDoc(doc(db, 'OperaVariables', product.id), {
                like: like - 1
            });
        } else {
            // Si el usuario no ha dado like, agregar el like
            await addDoc(collection(db, 'likesOpera'), {
                userId: user.uid,
                productId: product.id,
                timestamp: new Date()
            });
            // Aumentar el contador de likes en la tabla de productos
            await updateDoc(doc(db, 'OperaVariables', product.id), {
                like: like + 1
            });

        }
    };
    const handleView = async () => {
        // Agregar la cantidad de vistas
        await updateDoc(doc(db, 'OperaVariables', product.id), {
            views: views + 1
        });
    }

    const [showFullResponse, setShowFullResponse] = useState(false);

    const handleToggleResponse = () => {
        setShowFullResponse(!showFullResponse);
    };

    return (
        <>
            <div className='m-1'>
                <div class="flex flex-wrap z-10  mt-1 bg-zinc-300 dark:bg-zinc-700 rounded-xl drop-shadow-lg ">
                    <div class=" w-full lg:max-w-full lg:flex transition duration-300 dark:hover:bg-zinc-800 rounded-2xl">
                        <div class=" lg:border-l-0  rounded-xl p-2  leading-normal">
                            <button onClick={() => {
                                openModal();
                                handleView();
                            }}>
                                <div class="mb-1">
                                    <p class="text-[10px] text-gray-900 dark:text-gray-100 flex ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                        </svg>
                                        {product.visibility ? "Public" : "private"}
                                    </p>
                                    {
                                        //overflow-scroll
                                    }
                                    <div class="text-gray-900 dark:text-gray-100 flex   text-sm  mb-1">{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</div>
                                </div>
                                <div class="flex justify-start ">
                                    <img class="w-2 h-2 md:w-4 md:h-4 rounded-full  mr-1" src={product.photoURL ? product.photoURL : "https://firebasestorage.googleapis.com/v0/b/tutorial-538a4.appspot.com/o/userDefault.jpg?alt=media&token=3939f559-10ba-4287-ba28-ebcc03779ba6"} alt="Avatar" />
                                    <div class="text-left">
                                        <p class="text-gray-900 dark:text-gray-100 flex text-[10px]  leading-none">{product.userEmail && product.userEmail.split('@')[0]}</p>
                                        <p class="text-gray-900 dark:text-gray-100 flex  text-[10px] "> {product.timestamp}</p>
                                    </div>
                                </div>
                            </button>
                            <div className='flex justify-between ' >
                                <button type="button" class="text-gray-900 dark:text-gray-100 flex   hover:bg-zinc-200 dark:hover:bg-zinc-900  font-medium rounded-lg text-sm md:text-sm py-2 px-4 text-center inline-flex items-center me-2 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2 h-2 md:w-4 md:h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    <p className='px-1 text-sm'> {product.views}</p>
                                    <span class="sr-only">Icon description</span>
                                </button>
                                <button onClick={handleLike} type="button" class="text-gray-900 dark:text-gray-100 flex hover:bg-zinc-200 dark:hover:bg-zinc-900 font-medium rounded-lg text-sm py-2 px-4 text-center inline-flex items-center me-22">
                                    <svg class={`w-2 h-2 md:w-4 md:h-4 ${userLiked ? 'text-yellow-600' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                        <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                                    </svg>
                                    <p className='px-1 text-sm'>{like}</p>
                                    <span class="sr-only">Icon description</span>
                                </button>
                                <button type="button" class="text-gray-900 dark:text-gray-100 flex   hover:bg-zinc-200 dark:hover:bg-zinc-900  font-medium rounded-lg text-sm py-2 px-4 text-center inline-flex items-center me-2 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2 h-2 md:w-4 md:h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                    </svg>
                                    <p className='px-1 text-sm'> </p>
                                    <span class="sr-only">Icon description</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ViewHome isOpen={modalOpen} closeModal={closeModal} key={product.id} product={product} />
        </>
    );
}
