import React, {useEffect, useState, useRef} from "react";
import im from 'media/apreton.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { obtenerVentas } from 'utils/api'
import {Dialog, Tooltip} from '@material-ui/core'
import { crearVenta } from "utils/api";

import PrivateComponent from "components/PrivateComponent";


const RegistroPedido = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true)
  const [textoBoton, setTextoBoton] = useState("Registrar nueva venta")


  useEffect(() => {
    if (mostrarTabla) {
    }
  }, [mostrarTabla]);



  useEffect(()=>{
    if(mostrarTabla){
      setTextoBoton("Registrar nueva venta")
    }else{
      setTextoBoton("Lista de ventas")
    }
  },[mostrarTabla])

  return(
    <div>
      <h2 className="text-3xl font-extrabold text-gray-700">Pagina de administración de Pedidos</h2>
      {mostrarTabla ? (<TablaPedidos />) :( <FormularioCrecionVentas setMostrarTabla ={setMostrarTabla} />)}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <button  type = "button" onClick={()=>setMostrarTabla(!mostrarTabla)} className="sm:auto mx-auto ml-8 whitespace-nowrap px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-900 hover:bg-indigo-700">
      {textoBoton}

      </button>
    </div>
  )
}



const TablaPedidos = ({ }) => {

  return(
    <div className="Maincontainer ">
        <input 
        type="text" 
        placeholder="Buscar" 
        className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        />

        <table className="min-w-full divide-y divide-gray-200 max-w-7xl mx-auto px-4 py-6 sm:px-6">

          <thead className="bg-gray-50">
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Id venta
          </th>

          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Cliente
          </th>

          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Valor
          </th>

          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Estado
          </th>

          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Fecha inicial
          </th>

          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Fecha final
          </th>

          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Responsable
          </th>

          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Producto
          </th>

          </thead>

          <tbody>

          </tbody>


          </table>


    </div>


 
  )
}


const FormularioCrecionVentas = ({setMostrarTabla}) => {
  return(
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-500 p-2' >Registar nueva venta</h2>

      <form ref={form} onSubmit={submitForm} className = 'grid grid-cols-3'>

        <label htmlFor="id venta" className='flex flex-col'>
          ID Venta
          <input 
          name='idVenta'
          className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' 
          type='text' 
          />
        </label>
       
       <label htmlFor="nombre cliente" className='flex flex-col'>
         Nombre Cliente
         <input className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' 
         type='text' 
         name = 'nombreCl'
         />
       </label>

       <label htmlFor="estado venta" className='flex flex-col'>
         Estado venta
          <select 
            className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='Estado'
            defaultValue={0}
            >

           <option disabled value={0}>Seleccione una opción</option>
           <option >Embalaje</option>
           <option >Entregado</option>
         </select>
       </label>

       <label htmlFor="correo" className='flex flex-col'>
         Correo Cliente
         <input className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' 
         type='text'
         name='correo'
         />
       </label>

       <label htmlFor="valor" className='flex flex-col'>
         Valor venta
         <input className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
          type='number' min = '0' 
          name='valor'
         />
       </label>

       <label htmlFor="fecha inicial" className='flex flex-col'>
         Fecha inicial
         <input className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' 
         type='date' 
         name='fechaI'
         />
       </label>

       <label htmlFor="fecha final" className='flex flex-col'>
         Fecha final
         <input className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
         type='date' 
         name='fechaF'
         />
       </label>

       <label htmlFor="" className='flex flex-col'>
         Responsable
         <input className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' 
         type='text'
         name='responsable'
         />
       </label>

       <label htmlFor="" className='flex flex-col'>
         Producto
         <input className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' 
         type='text' 
         name='producto'
         />
       </label>
        
        <button 
           type='submit' 
          className= 'col-span-3 bg-indigo-400 p-2 rounded-full shadow-md hover:bg-indigo-600 text-white'
        > Registrar venta
        </button>
      </form>
      
    </div>
  )
}



  export default RegistroPedido;