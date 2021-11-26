import React, {useEffect, useState, useRef} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { obtenerProductos } from 'utils/api'
import {Dialog, Tooltip} from '@material-ui/core'


const RegistroP = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true)
  const [productos, setProductos] = useState([])
  const [textoBoton, setTextoBoton] = useState("Registrar nuevo producto")
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true)

  useEffect(() => {
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
      obtenerProductos(setProductos, setEjecutarConsulta);
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
      setTextoBoton("Registrar nuevo Producto")
    }else{
      setTextoBoton("Lista de productos")
    }

  },[mostrarTabla])

  return(
    <div>
      <h2 className="text-3xl font-extrabold text-gray-700">Pagina de administración de productos</h2>
      {mostrarTabla ? (<TablaProductos listaProductos = {productos} setEjecutarConsulta={setEjecutarConsulta} />) :( <FormularioCrecionProductos 
      setMostrarTabla ={setMostrarTabla} 
      listaProductos={productos}
      setProducos={setProductos}/>)}

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

const FilaProducto= ({ producto, setEjecutarConsulta }) => {

  const [edit, setEdit] = useState(false)
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoProducto, setInfoNuevoProducto] = useState({
    idProducto: producto.idProducto,
    Producto: producto.Producto,
    Cantidad: producto.Cantidad,
    Valor: producto.Valor,
    Estado: producto.Estado
  });

  const actualizarProducto = async () => {
    //enviar la info al backend
    const options = {
      method: 'PATCH',
      url: `http://localhost:5000/productos/${producto._id}/`,
      headers: { 'Content-Type': 'application/json' },
      data: { ...infoNuevoProducto},
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('Producto modificado con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        toast.error('Error al modificar el poducto');
        console.error(error);
      });
  };

  const eliminarProducto = async () => {
    const options = {
      method: 'DELETE',
      url: `http://localhost:5000/Productos/${producto._id}/`,
      headers: { 'Content-Type': 'application/json' },
      data: { id: producto._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('producto eliminada con éxito');
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        console.error(error);
        toast.error('Error al eliminar el producto');
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
              value={infoNuevoProducto.idProducto}
              onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, name: e.target.value })}
            />
          </td>
          <td>
            <input 
              className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' 
              type='text' 
              value={infoNuevoProducto.Producto}
              onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, Producto: e.target.value })}
            />
          </td>

          <td>
            <input 
              className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' 
              type='text' 
              value={infoNuevoProducto.Cantidad}
              onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, Cantidad: e.target.value })} 
            />
          </td>


          <td>
            <input 
              className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' 
              type='text' 
              value={infoNuevoProducto.Valor}
              onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, Valor: e.target.value })} 
            />
          </td>


          <td>
          <select 
            className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='Estado'
            value={infoNuevoProducto.Estado}
            onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, Estado: e.target.value })}
            >

           <option disabled value={0}>Seleccione una opción</option>
           <option >Disponible</option>
           <option >Agotado</option>
         </select>
          </td>
    
        
        </>
      ) : (
        <>

            <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-500">{producto.idProducto}</p>
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {producto.Producto}
                  </div>
                </div>
              </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {producto.Cantidad}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {producto.Valor}
            </td>


            <td className="px-6 py-4 whitespace-nowrap">
                { producto.Estado === "Embalaje" ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {producto.Estado}
                    </span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    {producto.Estado}
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
                  onClick={() => actualizarProducto()}
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
              <Tooltip title='Editar Producto' arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-pencil-alt hover:text-blue-500'
                />
              </Tooltip>
              <Tooltip title='Eliminar Producto' arrow>
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
              ¿Está seguro de querer eliminar el producto?
            </h1>
            <div className='flex w-full items-center justify-center my-4'>
              <button
                onClick={() => eliminarProducto()}
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


  /*useEffect(()=>{
    console.log("listado de ventas", listaVentas)
  },[listaVentas])*/

  return(
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
             Producto
           </th>
     
           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             Cantidad
           </th>
     
           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             Valor
           </th>
           
           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             Estado
           </th>
     
           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             Editar/Eliminar
           </th>

           </thead>

           <tbody>
            {productosFiltrados.map((producto)=>{
              return(
                <FilaProducto key={nanoid()} producto={producto} setEjecutarConsulta = {setEjecutarConsulta} />

              )

            })}



          </tbody>
     
          
     
          
          </table>


    </div>


 
  )
}


const FormularioCrecionProductos = ({setMostrarTabla, listaProductos, setProductos  }) => {

  const form = useRef(null);
  
  const submitForm = async (e) => {
    
    e.preventDefault();
    const fd = new FormData(form.current);
    const nuevoProducto = {};
    fd.forEach((value, key) => {
      nuevoProducto[key] = value;
      console.log(nuevoProducto[key], key)
    });

    const options = {
      method: 'POST',
      url: 'http://localhost:5000/productos/',
      headers: { 'Content-Type': 'application/json' },
      //data la informacion que pide del backend
      data: {  
        idProducto: nuevoProducto.idProducto,
        Producto: nuevoProducto.Producto,
        Cantidad: nuevoProducto.Cantidad,
        Valor: nuevoProducto.Valor,
        Estado: nuevoProducto.Estado },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('Productocreado con exito');
      })
      .catch(function (error) {
        console.error(error);
        toast.error('Error al registrar el producto');
      });

    setMostrarTabla(true);
  };

    return(
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-extrabold text-gray-500 p-2' >Registar nuevo producto</h2>
  
        <form ref={form} onSubmit={submitForm} className = 'grid grid-cols-3'>
  
          <label htmlFor="id producto" className='flex flex-col'>
            ID 
            <input 
            name='idProducto'
            className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' 
            type='text' 
            />
          </label>
         
         <label htmlFor="nombre producto" className='flex flex-col'>
           Nombre Producto
           <input className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' 
           type='text' 
           name = 'Producto'
           />
         </label>
  
         <label htmlFor="estado producto" className='flex flex-col'>
           Estado producto
            <select 
              className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              name='Estado'
              defaultValue={0}
              >
  
             <option disabled value={0}>Seleccione una opción</option>
             <option >Disponible</option>
             <option >Agotado</option>
           </select>
         </label>
  
         <label htmlFor="valor" className='flex flex-col'>
           Valor
           <input className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number' min = '0' 
            name='Valor'
           />
         </label>
   
         <label htmlFor="cantidad" className='flex flex-col'>
           Cantidad
           <input className = 'bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number' min = '0' 
            name='Cantidad'
           />
         </label>
  
  
          
          <button 
             type='submit' 
            className= 'col-span-3 bg-indigo-400 p-2 rounded-full shadow-md hover:bg-indigo-600 text-white'
          > Registrar producto
          </button>
        </form>
        
      </div>
    )
}



  export default RegistroP;