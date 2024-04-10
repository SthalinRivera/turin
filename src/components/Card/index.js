import React from 'react';
import { useAuth } from "../../context/AuthContext";
export function Card({ product }) {
    const { logout, user } = useAuth();
    return (

            <div className="rounded overflow-hidden shadow-lg p-4 m-2">
                <div className="px-6 py-4">
                    <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{product.name}</div>
                    <p className="text-gray-700 text-base">{product.response}</p>
                </div>
                <div className="flex px-6 pt-4 pb-2">
                    <a href="#"><img class="w-10 h-10 rounded-full mr-4" src={product.photoURL} alt="" /></a>
                    <div class="text-sm">
                        <p class="text-gray-900 font-semibold leading-none hover:text-indigo-600">{product.userName} </p>
                        <p class="text-gray-600"> Created {product.timestamp}</p>
                    </div>
                </div>
            </div>
    );
}
