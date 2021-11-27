import React, {useEffect, useState, useRef} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { obtenerUsuarios } from 'utils/api'
import {Dialog, Tooltip} from '@material-ui/core'

 const RegistroU = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true)
  const [usuarios, setUsuarios] = useState([])
  const [textoBoton, setTextoBoton] = useState("Registrar nuevo usuario")
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true)

  useEffect(() => {
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
      obtenerUsuarios(setUsuarios, setEjecutarConsulta);
    }
  }, [ejecutarConsulta]);


  useEffect(() => {
    //obtener lista de ventas desde el backend
    if (mostrarTabla) {
      setEjecutarConsulta(true);
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
      <h2 className="text-3xl font-extrabold text-gray-700">Pagina de administración de usuarios</h2>
      {mostrarTabla ? (<TablaUsuaios listaUsuarios = {usuarios} setEjecutarConsulta={setEjecutarConsulta} />) :( <FormularioCrecionUsuarios 
      setMostrarTabla ={setMostrarTabla} 
      listaUsuarios={usuarios}
      setUsuarios={setUsuarios}/>)}

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
    </div>
  )
}

    



          const FilaUsuario= ({ usuario, setEjecutarConsulta }) => {

            const [edit, setEdit] = useState(false)
            const [openDialog, setOpenDialog] = useState(false);
            const [infoNuevoUsuario, setInfoNuevoUsuario] = useState({
              idUsuario:usuario.idUsuario,
              nombreCl:usuario.name,
              estado : usuario.estado,
              correo: usuario.email,
              rol: usuario.rol
            });
          
            const actualizarUsuario = async () => {
              //enviar la info al backend
              const options = {
                method: 'PATCH',
                url: `http://localhost:5000/usuarios/${usuario._id}/`,
                headers: { 'Content-Type': 'application/json' },
                data: { ...infoNuevoUsuario},
              };
          
              await axios
                .request(options)
                .then(function (response) {
                  console.log(response.data);
                  toast.success('Usuario modificada con éxito');
                  setEdit(false);
                  setEjecutarConsulta(true);
                })
                .catch(function (error) {
                  toast.error('Error al modificar la Usuario');
                  console.error(error);
                });
            };
          
            const eliminarUsuario = async () => {
              const options = {
                method: 'DELETE',
                url: `http://localhost:5000/usuarios/${usuario._id}/`,
                headers: { 'Content-Type': 'application/json' },
                data: { id: usuario._id },
              };
          
              await axios
                .request(options)
                .then(function (response) {
                  console.log(response.data);
                  toast.success('usuario eliminada con éxito');
                  setEjecutarConsulta(true);
                })
                .catch(function (error) {
                  console.error(error);
                  toast.error('Error al eliminar la usuarios');
                });
              setOpenDialog(false);
            };
            return(
              <tr>
                {edit ? (
                  <>
                    <td>
                      <input 
                        className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' 
                        type='text' 
                        value={infoNuevoUsuario.idUsuario}
                        onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, name: e.target.value })}
                      />
                    </td>
                    <td>
                      <input 
                        className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' 
                        type='text' 
                        value={infoNuevoUsuario.nombreCl}
                        onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, nombreCl: e.target.value })}
                      />
                    </td>
                    <td>
                      <input 
                        className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' 
                        type='text' 
                        value={infoNuevoUsuario.correo}
                        onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, correo: e.target.value })}
                      />
                    </td>
                    <td>
                      <select 
                        className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        name='Estado'
                        value={infoNuevoUsuario.Estado}
                        onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, estado: e.target.value })}
                        >

                        <option disabled value={0}>Seleccione una opción</option>
                        <option >Activo</option>
                        <option >Inactivo</option>
                      </select>
                    </td>
                    <td>
                      <select 
                        className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        name='rol'
                        value={infoNuevoUsuario.rol}
                        onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, rol: e.target.value })}
                        >

                        <option disabled value={0}>Seleccione una opción</option>
                        <option >Admin</option>
                        <option >Vendedor</option>
                      </select>
                    </td>
                  </>
                ) : (
                  <>
          
                      <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-500">{usuario.idUsuario}</p>
                      </td>
          
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" alt="" src = {usuario.picture}/>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {usuario.name}
                            </div>
                              <div className="text-sm text-gray-500">
                                {usuario.email}
                              </div>
                          </div>
                        </div>
                      </td>
          
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <p className="text-sm text-gray-500">{usuario.rol}</p>
                      </td>
          
                      <td className="px-6 py-4 whitespace-nowrap">
                          { usuario.estado === "Activo" ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {usuario.estado}
                              </span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              {usuario.estado}
                              </span>
                              }
                      </td>
                  </>
                )}
                <td>
                  <div className='flex w-full justify-around'>
                    {edit ? (
                      <>
                        <Tooltip title='Confirmar Edición' arrow>
                          <i
                            onClick={() => actualizarUsuario()}
                            className='fas fa-check text-green-700 hover:text-green-500'
                          />
                        </Tooltip>
                        <Tooltip title='Cancelar edición' arrow>
                          <i
                            onClick={() => setEdit(!edit)}
                            className='fas fa-ban text-yellow-700 hover:text-yellow-500'
                          />
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <Tooltip title='Editar Usuario' arrow>
                          <i
                            onClick={() => setEdit(!edit)}
                            className='fas fa-pencil-alt hover:text-blue-500'
                          />
                        </Tooltip>
                        <Tooltip title='Eliminar Usuario' arrow>
                          <i
                            onClick={() => setOpenDialog(true)}
                            className='fas fa-trash hover:text-red-500'
                          />
                        </Tooltip>
                      </>
                    )}
                  </div>
                  <Dialog open={openDialog}>
                    <div className='p-8 flex flex-col'>
                      <h1 className='text-gray-900 text-2xl font-bold'>
                        ¿Está seguro de querer eliminar el usuario?
                      </h1>
                      <div className='flex w-full items-center justify-center my-4'>
                        <button
                          onClick={() => eliminarUsuario()}
                          className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
                        >
                          Sí
                        </button>
                        <button
                          onClick={() => setOpenDialog(false)}
                          className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </Dialog>
                </td>
              </tr>
          
              
          
            )
          }
          
          
          const TablaUsuaios = ({ listaUsuarios, setEjecutarConsulta }) => {
            const [busqueda, setBusqueda] = useState('');
            const [UsuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);
          
            useEffect(() => {
              setUsuariosFiltrados(
                listaUsuarios.filter((elemento) => {
                  return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
                })
              );
            }, [busqueda, listaUsuarios]);
          
          
          
            return(
              <div>
              <div>
                  <input 
                  type="text" 
                  placeholder="Buscar" 
                  className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
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
          
                    <tbody>
                      {UsuariosFiltrados.map((usuario)=>{
                        return(
                          <FilaUsuario key={nanoid()} usuario={usuario} setEjecutarConsulta = {setEjecutarConsulta} />
          
                        )
          
                      })}
          
                    </tbody>
          
          
                    </table>
                      
          
              </div>
         </div>
          
           
            )
          }
          
          
          const FormularioCrecionUsuarios = ({setMostrarTabla, listaUsuarios, setUsuarios  }) => {
          
            const form = useRef(null);
        
            const submitForm = async (e) => {
              
              e.preventDefault();
              const fd = new FormData(form.current);
              const nuevoUsuario = {};
              fd.forEach((value, key) => {
                nuevoUsuario[key] = value;
                console.log(nuevoUsuario[key], key)
              });
          
              const options = {
                method: 'POST',
                url: 'http://localhost:5000/usuarios/',
                headers: { 'Content-Type': 'application/json' },
                //data la informacion que pide del backend
                data: {  

                  idUsuario: nuevoUsuario.idUsuario,
                  nombreCl:nuevoUsuario.nombreCl,
                  Estado : nuevoUsuario.Estado,
                  correo: nuevoUsuario.correo,
                  rol: nuevoUsuario.rol
                }
              };
          
              await axios
                .request(options)
                .then(function (response) {
                  console.log(response.data);
                  toast.success('Usuario creada con exito');
                })
                .catch(function (error) {
                  console.error(error);
                  toast.error('Error al registrar la Usuario');
                });
          
              setMostrarTabla(true);
            };
    
          
            return(
              <div className='flex flex-col items-center justify-center'>
                <h2 className='text-2xl font-extrabold text-gray-500 p-2' >Registar nuevo Usuario</h2>
          
                <form ref={form} onSubmit={submitForm} className = 'grid grid-cols-3'>
          
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
