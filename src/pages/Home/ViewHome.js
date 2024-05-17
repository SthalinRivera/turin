import React from "react";

export function ViewHome({ isOpen, closeModal, product }) {
  return (
    <>
      {isOpen && (
        <div className="relative">
          <div className="fixed z-50 flex justify-center items-center content-between" >
            <div className=" fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm">
              <div className=" absolute inset-y-0 right-0 bg-zinc-800 max-w-lg w-full rounded-lg overflow-hidden">
                <button
                  onClick={closeModal}
                  className="absolute top-0 right-0 m-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="p-8">
                  <p className="text-slate-100 text-lg font-semibold">{product.visibility ? "Public" : "Private"}</p>
                  <p className="text-xl text-slate-100 font-bold my-4">{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</p>
                  <div className="overflow-y-auto h-96">
                    <div className="text-slate-200" dangerouslySetInnerHTML={{ __html: product.response }} />
                  </div>
                  <div className="flex items-center mt-4">
                    <img
                      className="w-10 h-10 rounded-full mr-4"
                      src={product.photoURL ? product.photoURL : "https://firebasestorage.googleapis.com/v0/b/tutorial-538a4.appspot.com/o/userDefault.jpg?alt=media&token=3939f559-10ba-4287-ba28-ebcc03779ba6"}
                      alt="Avatar"
                    />
                    <div>
                      <p className="text-slate-200">{product.userEmail && product.userEmail.split('@')[0]}</p>
                      <p className="text-slate-300">{product.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button className="flex items-center text-blue-100 hover:bg-gray-800 font-medium rounded-lg py-2 px-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                      <span>{product.views}</span>
                    </button>
                    <button className="flex items-center text-blue-100 hover:bg-gray-800 font-medium rounded-lg py-2 px-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                      </svg>
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
