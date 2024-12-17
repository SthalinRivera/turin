import React from "react";

export function ViewHome({ isOpen, closeModal, product }) {


  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
          <div className="relative w-full h-full sm:max-w-full mx-auto max-h-screen overflow-y-auto rounded-lg bg-slate-100 text-slate-900 dark:bg-gray-800 dark:text-slate-100">
            <button
              onClick={closeModal}
              className="absolute top-1 right-1 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-full text-sm px-2 py-2 text-center me-2 mb-2"
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
            <div className="p-2">
              <p className="text-lg font-semibold mb-1">
                {product.visibility}
              </p>
              <p className="text-sm font-bold mb-1">
                {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
              </p>
              <div className="overflow-y-auto h-auto mb-4">
                <table class=" w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-4xl shadow-md">
                  <thead>
                    <tr class=" text-gray-800 dark:text-gray-200">
                      <th class="py-2 px-4 border border-gray-300 dark:border-gray-600">Problema</th>
                      <th class="py-2 px-4 border border-gray-300 dark:border-gray-600">Objetivos</th>
                      <th class="py-2 px-4 border border-gray-300 dark:border-gray-600">Hipótesis</th>
                      <th class="py-2 px-4 border border-gray-300 dark:border-gray-600">Variables</th>
                      <th class="py-2 px-4 border border-gray-300 dark:border-gray-600">Dimensiones</th>
                      <th class="py-2 px-4 border border-gray-300 dark:border-gray-600 w-80">Indicadores</th>
                      <th class="py-2 px-4 border border-gray-300 dark:border-gray-600">Metodología</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-800 dark:text-gray-200 rounded-lg">
                    <tr class="">
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                        <p class="text-sm font-bold">Problema general:</p>
                        <p class="text-sm">{product.response.problema_general || 'No hay datos'}</p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                        <p class="text-sm font-bold">Objetivo general</p>
                        <p class="text-sm"> {product.response.objetivo_general || 'No hay datos'}</p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" >
                        <p class="text-sm font-bold">Hipótesis general</p>
                        <p class="text-sm"> {product.response.hipótesis_general || 'No hay datos'} </p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="3">
                        <p class="text-sm font-bold">Variable 01</p>
                        <br />
                        <p class="text-sm"> {product.response.variable1 || 'No hay datos'}</p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                        <p class="text-sm font-bold">Dimensión 1:</p>
                        <p class="text-sm">{product.response.variable1_dimension1 || 'No hay datos'} </p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                        <p class="text-sm font-bold">Indicador 1:</p>
                        <p class="text-sm">{product.response.variable1_dimension1_indicador1 || 'No hay datos'} </p>
                        <p class="text-sm font-bold">Indicador 2:</p>
                        <p class="text-sm"> {product.response.variable1_dimension1_indicador2 || 'No hay datos'}</p>
                        <p class="text-sm font-bold">Indicador 3:</p>
                        <p class="text-sm">{product.response.variable1_dimension1_indicador3 || 'No hay datos'} </p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="6">
                        <p class="text-sm font-bold">Enfoque:</p>
                        <p class="text-sm">{product.response.enfoque || 'No hay datos'} </p>
                        <p class="text-sm font-bold">Tipo de investigación:</p>
                        <p class="text-sm"> {product.response.tipo_de_investigación || 'No hay datos'} </p>
                        <p class="text-sm font-bold">Nivel de investigación:</p>
                        <p class="text-sm"> {product.response.nivel_de_investigación || 'No hay datos'} </p>
                        <p class="text-sm font-bold">Población:</p>
                        <p class="text-sm">  {product.response.población || 'No hay datos'}</p>
                        <p class="text-sm font-bold">Muestra:</p>
                        <p class="text-sm">  {product.response.muestra || 'No hay datos'}</p>
                        <p class="text-sm font-bold">Muestreo:</p>
                        <p class="text-sm">{product.response.muestreo || 'No hay datos'} </p>
                        <p class="text-sm font-bold">Instrumento:</p>
                        <p class="text-sm">{product.response.instrumento || 'No hay datos'} </p>
                      </td>
                    </tr>
                    <tr class="">
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="2">
                        <p class="text-sm font-bold">Problema específico 1</p>
                        <p class="text-sm">{product.response.problema_especifico1 || 'No hay datos'} </p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="2">
                        <p class="text-sm font-bold">Objetivo específico 1</p>
                        <p class="text-sm"> {product.response.objetivo_especifico1 || 'No hay datos'}</p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="2">
                        <p class="text-sm font-bold">Hipótesis específica 1</p>
                        <p class="text-sm">  {product.response.hipótesis_especifico1 || 'No hay datos'}</p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                        <p class="text-sm font-bold">Dimensión 2:</p>
                        <p class="text-sm">  {product.response.variable1_dimension2 || 'No hay datos'} </p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                        <p class="text-sm font-bold">Indicador 1:</p>
                        <p class="text-sm">{product.response.variable1_dimension2_indicador1 || 'No hay datos'} </p>
                        <p class="text-sm font-bold">Indicador 2:</p>
                        <p class="text-sm">{product.response.variable1_dimension2_indicador2 || 'No hay datos'} </p>
                        <p class="text-sm font-bold">Indicador 3:</p>
                        <p class="text-sm"> {product.response.variable1_dimension2_indicador3 || 'No hay datos'}</p>
                      </td>
                    </tr>
                    <tr class="">

                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                        <p class="text-sm font-bold">Dimensión 3: </p>
                        <p class="text-sm">  {product.response.variable1_dimension3 || 'No hay datos'} </p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                        <p class="text-sm font-bold">Indicador 1:</p>
                        <p class="text-sm">{product.response.variable1_dimension3_indicador1 || 'No hay datos'} </p>
                        <p class="text-sm font-bold">Indicador 2:</p>
                        <p class="text-sm">{product.response.variable1_dimension3_indicador2 || 'No hay datos'} </p>
                        <p class="text-sm font-bold">Indicador 3:</p>
                        <p class="text-sm"> {product.response.variable1_dimension3_indicador3 || 'No hay datos'}</p>
                      </td>
                    </tr>
                    <tr class="">
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                        <p class="text-sm font-bold">Problema específico 2</p>
                        <p class="text-sm"> {product.response.problema_especifico2 || 'No hay datos'}</p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                        <p class="text-sm font-bold">Objetivo específico 2</p>
                        <p class="text-sm">{product.response.objetivo_especifico2 || 'No hay datos'} </p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                        <p class="text-sm font-bold">Hipótesis específica 2</p>
                        <p class="text-sm">  {product.response.hipótesis_especifico2 || 'No hay datos'}</p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="3">
                        <p class="text-sm font-bold">Variable 02:</p>
                        <p class="text-sm"> {product.response.variable2 || 'No hay datos'}</p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                        <p class="text-sm font-bold">Dimensión 1</p>
                        <p class="text-sm"> {product.response.variable2_dimension1 || 'No hay datos'}</p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                        <p class="text-sm font-bold">Indicador 1:</p>
                        <p class="text-sm">{product.response.variable2_dimension3_indicador1 || 'No hay datos'} </p>
                        <p class="text-sm font-bold">Indicador 2:</p>
                        <p class="text-sm">{product.response.variable2_dimension3_indicador2 || 'No hay datos'} </p>
                        <p class="text-sm font-bold">Indicador 3:</p>
                        <p class="text-sm"> {product.response.variable2_dimension3_indicador3 || 'No hay datos'}</p>
                      </td>
                    </tr>
                    <tr class="">
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="2">
                        <p class="text-sm font-bold">Problema específico 3</p>
                        <p class="text-sm"> {product.response.problema_especifico3 || 'No hay datos'}</p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="2">
                        <p class="text-sm font-bold">Objetivo específico 3</p>
                        <p class="text-sm"> {product.response.objetivo_especifico3 || 'No hay datos'} </p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="2">
                        <p class="text-sm font-bold">Hipótesis específica 3</p>
                        <p class="text-sm"> {product.response.hipótesis_especifico3 || 'No hay datos'} </p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                        <p class="text-sm font-bold">Dimensión 2:</p>
                        <p class="text-sm">  {product.response.variable2_dimension2 || 'No hay datos'}</p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                        <p class="text-sm font-bold">Indicador 1:</p>
                        <p class="text-sm"> {product.response.variable2_dimension2_indicador1 || 'No hay datos'} </p>
                        <p class="text-sm font-bold">Indicador 2:</p>
                        <p class="text-sm">  {product.response.variable2_dimension2_indicador2 || 'No hay datos'} </p>
                        <p class="text-sm font-bold">Indicador 3:</p>
                        <p class="text-sm">{product.response.variable2_dimension2_indicador3 || 'No hay datos'} </p>
                      </td>

                    </tr>
                    <tr class="">

                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                        <p class="text-sm font-bold">Dimensión 3: </p>
                        <p class="text-sm">  {product.response.variable2_dimension3 || 'No hay datos'} </p>
                      </td>
                      <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                        <p class="text-sm font-bold">Indicador 1:</p>
                        <p class="text-sm">{product.response.variable2_dimension3_indicador1 || 'No hay datos'} </p>
                        <p class="text-sm font-bold">Indicador 2:</p>
                        <p class="text-sm">{product.response.variable2_dimension3_indicador2 || 'No hay datos'} </p>
                        <p class="text-sm font-bold">Indicador 3:</p>
                        <p class="text-sm"> {product.response.variable2_dimension3_indicador3 || 'No hay datos'}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>

              </div>
              <div className="flex items-center mb-1">
                <img
                  className="w-6 h-6 rounded-full mr-4"
                  src={product.photoURL || "https://firebasestorage.googleapis.com/v0/b/tutorial-538a4.appspot.com/o/userDefault.jpg?alt=media&token=3939f559-10ba-4287-ba28-ebcc03779ba6"}
                  alt="Avatar"
                />
                <div className="text-start">
                  <p className="text-slate-900 dark:text-slate-200 text-[10px]">{product.userEmail?.split('@')[0]}</p>
                  <p className="text-slate-900 dark:text-slate-300 text-[10px]">{product.timestamp}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <button className="flex items-center text-blue-100 bg-gray-700 hover:bg-gray-900 font-medium rounded-lg py-1 px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 mr-2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  <span></span>
                </button>
                <button className="flex items-center text-blue-100  bg-gray-700 hover:bg-gray-900 font-medium rounded-lg py-1 px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 mr-2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}