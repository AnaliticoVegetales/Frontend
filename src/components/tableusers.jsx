import React, {useEffect, useState, useRef} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';

 const RegistroU = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true)
  const [textoBoton, setTextoBoton] = useState("Registrar nuevo usuario")




  useEffect(() => {
    if (mostrarTabla) {
    }
  }, [mostrarTabla]);


  useEffect(()=>{
    if(mostrarTabla){
      setTextoBoton("Registrar nuevo Usuario")
    }else{
      setTextoBoton("Lista de Usuarios")
    }

  },[mostrarTabla])

  return(
    <div>
       
      {mostrarTabla ? (<TablaUsuaios  />) :( <FormularioCrecionUsuarios setMostrarTabla ={setMostrarTabla} />)}

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
      
      <button  type = "button" onClick={()=>setMostrarTabla(!mostrarTabla)} 
        className="sm:auto mx-auto ml-8 whitespace-nowrap px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-900 hover:bg-indigo-700">
      {textoBoton}
      </button>
    </div>
    
  )
}


          
          const TablaUsuaios = ({ }) => {

            return(
              <div>
                  <input 
                  type="text" 
                  placeholder="Buscar" 
                  className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                  />
          
                  <table className="min-w-full divide-y divide-gray-200">
          
                    <thead className="bg-gray-50">
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Id 
                    </th>
          
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Usuario
                    </th>
          
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol
                    </th>
          
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Editar/Eliminar
                    </th>
          
                    </thead>
                    </table>
          
                    <tbody></tbody>
              </div>
          
          
           
            )
          }
          const FormularioCrecionUsuarios = ({setMostrarTabla }) => {
            return(
              <div className='flex flex-col items-center justify-center'>
                <h2 className='text-2xl font-extrabold text-gray-500 p-2' >Registar nuevo Usuario</h2>
          
                <form className = 'grid grid-cols-3'>
          
                  <label htmlFor="id Usuario" className='flex flex-col'>
                    ID usuario
                    <input 
                    name='idUsuario'
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
          
                 <label htmlFor="estado usuario" className='flex flex-col'>
                   Estado usuario
                    <select 
                      className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                      name='Estado'
                      defaultValue={0}
                      >
                     <option disabled value={0}>Seleccione una opción</option>
                     <option >Activo</option>
                     <option >Inactivo</option>
                     <option >Pendiente</option>
                   </select>
                 </label>
                 <label htmlFor="rol usuario" className='flex flex-col'>
                   Rol usuario
                    <select 
                      className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                      name='rol'
                      defaultValue={0}
                      >
          
                     <option disabled value={0}>Seleccione una opción</option>
                     <option >Sin rol</option>
                     <option >Admin</option>
                     <option >Vendedor</option>
                   </select>
                 </label>
                 <label htmlFor="correo" className='flex flex-col'>
                   Correo Usuario
                   <input className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' 
                   type='text'
                   name='correo'
                   />
                 </label>
  
                  <button 
                     type='submit' 
                    className= 'col-span-3 bg-indigo-400 p-2 rounded-full shadow-md hover:bg-indigo-600 text-white'
                  > Registrar Usuario
                  </button>
                </form>
                
              </div>
            )
          }
          
  export default RegistroU;
