import React from "react";
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import Mapa from 'components/Mapa'






const Rastreo = ({setMostrarRas,pedi}) => {
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

  return (
    <>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <Mapa/>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  OK
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

    
      <div class="w-6/12  min-w-max	bg-white rounded-lg shadow-sm  mx-64">
        <h1 class="font-extrabold tracking-wider text-center">Pedido {pedi._id}</h1>

        <div class="flex flex-col mt-5 gap-7 text-sm">
          <div class="bg-indigo-50 flex justify-between items-center p-3 rounded-sm shadow-sm">
            <div class="flex justify-end items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-indigo-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <div>
                <p class="text-gray-700 font-bold tracking-wider">Creado</p>
                <div>
                  <div className="flex justify-start items-center gap-2">
                    <p class="text-gray-400 text-xs"> Fecha: </p>
                    <p class="text-gray-400 text-xs">{pedi.fecha}</p>
                  </div>
                  <div className="flex justify-start items-center gap-2">
                    <p className="text-gray-400 text-xs"> Hora: </p>
                    <p class="text-gray-400 text-xs"> 16:52</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p class="text-gray-700 font-bold tracking-wider">Transportador</p>
              <p class="text-gray-400 text-xs">
                {" "}
               {pedi.transportador}
              </p>
              <p class="text-gray-700 font-bold tracking-wider">Vendedor</p>
              <p class="text-gray-400 text-xs">
                {" "}
               {pedi.vendedor}
              </p>
            </div>
            <div>
              <p class="text-gray-700 font-bold tracking-wider">Sede</p>
              <p class="text-gray-400 text-xs">
                {" "}
               {pedi.sede}
              </p>

            </div>
            <span class="font-bold text-indigo-500 text-3xl mr-3">
              <i className="fas fa-hammer"></i>
            </span>
          </div>
          <div class="bg-yellow-50 flex justify-between items-center p-3 rounded-sm shadow-sm">
            <div class="flex justify-start items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <div>
                <p class="text-gray-700 font-bold tracking-wider">En curso</p>
                <div className="flex justify-start items-center gap-2">
                  <p class="text-gray-400 text-xs"> Fecha: </p>
                  <p class="text-gray-400 text-xs"> {pedi.fecha} </p>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <p className="text-gray-400 text-xs"> Hora: </p>
                  <p class="text-gray-400 text-xs"> 16:52</p>
                </div>
              </div>
            </div>
            <div>
            <p class="text-gray-700 font-bold tracking-wider">Transportador</p>
              <p class="text-gray-400 text-xs">
                {" "}
               {pedi.transportador}
              </p>
              <p class="text-gray-700 font-bold tracking-wider">Vendedor</p>
              <p class="text-gray-400 text-xs">
                {" "}
               {pedi.vendedor}
              </p>
            </div>
            <div>
              <p class="text-gray-700 font-bold tracking-wider">Sede</p>
              <p class="text-gray-400 text-xs">
                {" "}
               {pedi.sede}
              </p>

            </div>
            <span className="font-bold text-yellow-500 text-3xl mr-3">
              <i className="fas fa-sync-alt"></i>
            </span>
          </div>
             {pedi.estado === "Entregada"?(<Enviado pedi={pedi}/>):pedi.estado === "Cancelada"?(<Rechazado pedi = {pedi}/>):<div></div>}
          
        </div>
        <div className="flex justify-center items-center mt-8 ml-8 mr-3 mb-8">
          {pedi.estado !== "En Proceso" ? <> </> : (<span class="font-bold text-gray-400 height text-4xl hover:text-gray-500 hover:text-4xl mt-8 ml-8"> 
            <i className="fas fa-map-marked-alt" onClick ={() => setOpen(!open)}></i>
          </span>)}
          
          <span class="font-bold text-gray-400 height text-4xl hover:text-gray-500 hover:text-4xl mt-8 ml-8">
            <i onClick ={() => setMostrarRas(false)} className="far fa-hand-point-left"></i>
          </span>
        </div>

          
      </div>
    
      </>
    
  );
};



const Enviado = ({pedi}) => {
  return (
    <div className="bg-green-50 flex justify-between items-center p-3 rounded-sm shadow-sm">
      <div className="flex justify-start items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-green-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <div>
          <p class="text-gray-700 font-bold tracking-wider">Recibido</p>
          <div className="flex justify-start items-center gap-2">
            <p class="text-gray-400 text-sm"> Fecha: </p>
            <p class="text-gray-400 text-sm"> {pedi.fecha} </p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <p className="text-gray-400 text-xs"> Hora: </p>
            <p class="text-gray-400 text-xs"> 16:52</p>
          </div>
        </div>
      </div>
      <div>
      <p class="text-gray-700 font-bold tracking-wider">Transportador</p>
              <p class="text-gray-400 text-xs">
                {" "}
               {pedi.transportador}
              </p>
              <p class="text-gray-700 font-bold tracking-wider">Vendedor</p>
              <p class="text-gray-400 text-xs">
                {" "}
               {pedi.vendedor}
              </p>
            
      </div>
      <div>
              <p class="text-gray-700 font-bold tracking-wider">Sede</p>
              <p class="text-gray-400 text-xs">
                {" "}
               {pedi.sede}
              </p>

            </div>
      <span class="font-bold text-green-500 text-3xl mr-3">
        <i className="fas fa-clipboard-check"></i>
      </span>
    </div>
  );
};
const Rechazado = ({pedi}) => {
  return (
      <div class="bg-pink-50 flex justify-between items-center p-3 rounded-sm shadow-sm">
          <div class="flex justify-start items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-pink-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <div>
              <p class="text-gray-700 font-bold tracking-wider">Devuelto</p>
              <div className="flex justify-start items-center gap-2">
                <p class="text-gray-400 text-xs"> Fecha: </p>
                <p class="text-gray-400 text-xs"> 26/11/2021 </p>
              </div>
              <div className="flex justify-start items-center gap-2">
                <p className="text-gray-400 text-xs"> Hora: </p>
                <p class="text-gray-400 text-xs"> 16:52</p>
              </div>
            </div>
          </div>
          <div>
          <p class="text-gray-700 font-bold tracking-wider">Transportador</p>
            <p class="text-gray-400 text-xs">
              {" "}
             {pedi.transportador}
            </p>
            <p class="text-gray-700 font-bold tracking-wider">Vendedor</p>
            <p class="text-gray-400 text-xs">
              {" "}
             {pedi.vendedor}
            </p>
          </div>
          <div>
            <p class="text-gray-700 font-bold tracking-wider">Sede</p>
            <p class="text-gray-400 text-xs">
              {" "}
             {pedi.sede}
            </p>

          </div>
          <span class="font-bold text-pink-500 text-3xl mr-3">
            <i className="fas fa-times"></i>
          </span>
        </div>
  );}

export default Rastreo;