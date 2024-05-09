import React, { useState, useEffect } from "react";

export function ViewHome({ isOpen, closeModal, product }) {

  return (
    <>
      {isOpen && (
        <div className="relative ">
          <div className="fixed z-50  inset-y-0 right-0 justify-center content-center md:w-[50%] ">
            <div class=" bg-gray-100 bg-opacity-0.5 rounded-lg shadow-xl transition-opacity"></div>
            <div class="z-10 transform text-left  bg-zinc-900 transition-all">
              <div class="md:p-10 h-screen">
                <button onClick={closeModal} data-modal-hide="popup-modal" type="button" class="m-4 absolute top-0 right-0 bg-white hover:bg-gray-100 text-gray-800 font-semibold md:py-4 md:px-4  border border-gray-400 rounded shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
                <div class="md:m-10  mx-2 my-2 ">
                  <div class="flex md:m-12 ">
                    <p class="text-sm text-gray-100 items-start mt-10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                      </svg>
                    </p>
                    <p className="text-gray-100 mx-2 mt-10 font-principal">   {product.visivility ? "Public" : "Private"}</p>
                  </div>
                  <div class="text-slate-200 font-bold text-xs  md:text-xl md:mb-10 ">{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</div>
                  <div className="overflow-x-auto overflow-y-auto w-auto md:w-full   h-96 md:h-full">
                    <div class=" text-slate-300 my-4 md:m-4 text-xs md:text-sm ">
                      <div dangerouslySetInnerHTML={{ __html: product.response }} />
                    </div>
                  </div>
                  <div class="flex items-center  content-start">
                    <img class="w-6 h-6 md:w-10 md:h-10 rounded-full  mr-4" src={product.photoURL ? product.photoURL : "https://firebasestorage.googleapis.com/v0/b/tutorial-538a4.appspot.com/o/userDefault.jpg?alt=media&token=3939f559-10ba-4287-ba28-ebcc03779ba6"} alt="Avatar" />
                    <div class="text-sm">
                      <p class="text-slate-200 text-xs  leading-none">{product.userEmail && product.userEmail.split('@')[0]}</p>
                      <p class="text-slate-300"> {product.timestamp}</p>
                    </div>
                  </div>
                  <div className='flex justify-between mt-10'>
                    <button type="button" class="text-blue-100  hover:bg-zinc-900  font-medium rounded-lg text-sm py-2 px-4 text-center inline-flex items-center me-2 ">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                      <p className='px-2'> {product.views}</p>
                      <span class="sr-only">Icon description</span>
                    </button>
                    <button type="button" class="text-blue-100  hover:bg-zinc-900  font-medium rounded-lg text-sm py-2 px-4 text-center inline-flex items-center me-2 ">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                      </svg>
                      <p className='px-2'> </p>
                      <span class="sr-only">Icon description</span>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}