import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { obtenerProductos, crearProducto, editarProducto, eliminarProducto } from 'utils/api';
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from 'components/PrivateComponent';

const Productos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [productos, setProductos] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Agregar Producto');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  useEffect(() => {
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
      obtenerProductos(
        (response) => {
          console.log('la respuesta que se recibio fue', response);
          setProductos(response.data);
          setEjecutarConsulta(false);
        },
        (error) => {
          console.error('Salio un error:', error);
        }
      );
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    //obtener lista de vehículos desde el backend
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Agregar Producto');
      
    } else {
      setTextoBoton('Todos Los Productos');
      
    }
  }, [mostrarTabla]);

  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col'>
        <h2 className='text-3xl pt-12 pb-8 font-extrabold fuenteColor'>
          Administración de Productos
        </h2>
        {/* <PrivateComponent roleList={['Administrador']}> */}
        <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`shadow-md fondo1 text-gray-200 font-bold p-2 rounded m-6  self-center hover:bg-gray-300`}>
          {textoBoton}
        </button>
        {/* </PrivateComponent> */}
      </div>
      {mostrarTabla ? (
        <TablaProductos listaProductos={productos} setEjecutarConsulta={setEjecutarConsulta} />
        ) : (
          <FormularioCreacionProductos
            setMostrarTabla={setMostrarTabla}
            listaProductos={productos}
            setProductos={setProductos}
          />
        )}
        <ToastContainer position='bottom-center' autoClose={3000} />
      </div>
    );
  };

  const TablaProductos = ({ listaProductos, setEjecutarConsulta }) => {
    const [busqueda, setBusqueda] = useState('');
    const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);
  
    useEffect(() => {
      setProductosFiltrados(
        listaProductos.filter((elemento) => {
          return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
        })
      );
    }, [busqueda, listaProductos]);

  return (
  <div>
    <body className="antialiased font-sans bg-white">
      <div class="container mx-auto px-4 sm:px-8">
        <div class="py-8">

          {/* BUSCADOR */}
          <div class="my-2 mx-2 flex sm:flex-row flex-col">
            <div class="block relative">
              <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                  </path>
                </svg>
              </span>
              <input 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar"
                class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"/>
            </div>
          </div>
          
            {/* HEADERS TABLA */}
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
              
              <table className="tabla w-full">
                <thead>
                  <tr>
                    
                    <th class="px-3 py-3 border-b-2 border-gray-400 fondo1 text-center text-xs font-extrabold text-gray-200 uppercase tracking-wider w-24">
                        Código
                    </th>
                    <th class="px-3 py-3 border-b-2 border-gray-400 fondo1 text-center text-xs font-extrabold text-gray-200 uppercase tracking-wider w-32">
                        Producto
                    </th>
                    <th class="px-3 py-3 border-b-2 border-gray-400 fondo1 text-center text-xs font-extrabold text-gray-200 uppercase tracking-wider w-24">
                        Cantidad
                    </th>
                    <th class="px-3 py-3 border-b-2 border-gray-400 fondo1 text-center text-xs font-extrabold text-gray-200 uppercase tracking-wider w-32">
                        Precio
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-400 fondo1 text-center text-xs font-extrabold text-gray-200 uppercase tracking-wider w-32">
                        Estado
                    </th>
                    
                    <PrivateComponent roleList={['Administrador']}>
                    <th class="px-5 py-3 border-b-2 border-gray-400 fondo1 text-center text-xs font-extrabold text-gray-200 uppercase tracking-wider w-24">
                        Acciones
                    </th> 
                    </PrivateComponent>
                  </tr>
                </thead>
                <tbody>
                  {productosFiltrados.map((producto) => {
                    return <FilaProductos 
                      key={nanoid()} 
                      producto={producto}
                      setEjecutarConsulta={setEjecutarConsulta}/>;
                  })}
                </tbody>
              </table>
              </div>

            </div>
        </div>
      </div>
    </body>

        


  </div>  
  );
};

const FilaProductos = ({producto, setEjecutarConsulta})  => {
  const [edit, setEdit] = useState(false)
  const [infoNuevoProducto, setInfoNuevoProducto] = useState({
    _id: producto._id,
    nombre: producto.nombre,
    cantidad: producto.cantidad,
    precio: producto.precio,
    estado: producto.estado,    
  });

  const actualizarProducto = async () => {
    //enviar la info al backend

    await editarProducto(
      producto._id,
      {
        nombre: infoNuevoProducto.nombre,
        cantidad: infoNuevoProducto.cantidad,
        precio: infoNuevoProducto.precio,
        estado: infoNuevoProducto.estado,
        
      },
      (response) => {
        console.log(response.data);
        toast.success('Producto Modificado Exitosamente');
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error('Error Modificando Producto');
        console.error(error);
      }
    );
    
      
  };
  
  const borrarProducto = async () => {
    await eliminarProducto(
      producto._id,
      (response) => {
        console.log(response.data);
        toast.success('Producto Eliminado Exitosamente');
        setEjecutarConsulta(true);
        
      },
      (error) => {
        console.error(error);
        toast.error('Error Eliminando Producto');
      }
    );
  
    
  };

  return (
    <tr >
      {edit? (
        <>
        
          <td className='text-center'>{infoNuevoProducto._id.slice(20)}
          </td>
          <td><input 
            type="text" 
            className="bg-gray-50 border border-gray-600 p-1 text-center rounded-lg m-1 w-full"
            value={infoNuevoProducto.nombre}
            onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, nombre: e.target.value })}/>
          </td>
          <td><input 
            type="number" 
            className="bg-gray-50 border border-gray-600 p-1 text-center rounded-lg m-1 w-full"
            value={infoNuevoProducto.cantidad}
            onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, cantidad: e.target.value })}/>
            </td>
            
          
          <td><input 
            type="number" 
            className="bg-gray-50 border border-gray-600 p-1 text-center rounded-lg m-1 w-full"
            value={infoNuevoProducto.precio}
            onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, precio: e.target.value })}/>
          </td>
          <td>
            <label className='flex flex-col py-2 text-gray-800' htmlFor='estado'>
              <select
                className='bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full'
                name='estado'
                required
                defaultValue={infoNuevoProducto.estado}
                onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, estado: e.target.value })}>
                  <option disabled value={0}>
                    Seleccione Una Opción
                  </option>
                  <option value="Disponible">Disponible</option>
                  <option value="No Disponible">No Disponible</option>
              </select>
            </label> 
          </td>
            
            
            
        </>
        
      ) :(
      <>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{producto._id.slice(20)}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{producto.nombre}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{producto.cantidad}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{producto.precio}</td>
          <td className={producto.estado === 'Disponible'? 'relative inline-block m-4 px-4 py-2 leading-tight bg-green-900 text-white text-center text-sm font-semibold opacity-95 rounded-full':'relative inline-block m-4 px-2 py-0 leading-tight bg-red-500 text-white text-center text-sm font-semibold opacity-95 rounded-full'} >{producto.estado}</td>
      </>  
        )}
          <PrivateComponent roleList={['Administrador']}>
        <td>
            <div className="flex w-full justify-around text-gray-600 ">
              {edit? (
                <>
                  <i
                    onClick={() => actualizarProducto()} 
                    className="fas fa-check hover:text-green-600"/>
                  <i
                    onClick={() => setEdit(!edit)}
                    className='fas fa-ban hover:text-yellow-700'/>
                </>
              ):(
                <>
                  <i
                    onClick={() => setEdit(!edit)}
                    className="fas fa-edit hover:text-yellow-600"/>
                
                    
                  <i
                      onClick={() => borrarProducto()}
                      class="fas fa-trash text-gray-600 hover:text-red-500"/>
                </>
              )} 
              
            </div>
            

        </td>
          </PrivateComponent>
      
    </tr>

  );
};

const FormularioCreacionProductos = ({ setMostrarTabla, listaProductos, setProductos }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoProducto = {};
    fd.forEach((value, key) => {
      nuevoProducto[key] = value;
    });

    await crearProducto(
      {
        nombre: nuevoProducto.nombre,
        cantidad: nuevoProducto.cantidad,
        precio: nuevoProducto.precio,
        estado: nuevoProducto.estado,
      },
      (response) => {
        console.log(response.data);
        toast.success('Producto Creado Exitosamente');
        setMostrarTabla(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error Creando Producto');
      }
    );
    setMostrarTabla(true);
  };
    
  

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold pb-4 text-gray-800'>Nuevo Producto</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col justify-center text-center pb-10'>
        
        <label className='flex flex-col py-2 text-gray-800' htmlFor='nombre'>
          Nombre del Producto
          <input
            name='nombre'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 '
            type='text'
            placeholder='Ej: Tomante Cherry'
            required/>
        </label>
        
        <label className='flex flex-col py-2 text-gray-800' htmlFor='cantidad'>
          Cantidad del Producto
          <input
            name='cantidad'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            placeholder='Ej: 20'
            required/>
        </label>
        
        
        
        <label className='flex flex-col py-2 text-gray-800' htmlFor='precio'>    
          Precio de Venta
          <input
            name='precio'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={200}
            max={5000}
            placeholder='Ej: 500'
            required/>
        </label>
        <label className='flex flex-col py-2 text-gray-800' htmlFor='estado'>
          Estado del Producto
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='estado'
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Seleccione Una Opción
            </option>
            <option>Disponible</option>
            <option>No Disponible</option>
            
          </select>
        </label>
        <button
          type='submit'
          className='col-span-2 py-3 fondo1 font-bold  text-gray-300 p-2 rounded-full shadow-md hover:bg-gray-700'
        >
          Guardar Producto
        </button>
      </form>
    </div>
  );
};
            

export default Productos;