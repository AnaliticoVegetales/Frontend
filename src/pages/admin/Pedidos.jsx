import { nanoid } from 'nanoid';
import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { obtenerPedidos, crearPedido, editarPedido, eliminarPedido } from 'utils/api';
import { obtenerProductos} from 'utils/api';
import { obtenerUsuarios } from 'utils/api';
import { obtenerSedes } from 'utils/api';

import PrivateComponent from 'components/PrivateComponent';


const Pedidos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [pedidos, setPedidos] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Agregar Nueva Pedido');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  
  
  
  useEffect(() => {
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
      obtenerPedidos(
        (response) => {
          console.log('la respuesta Obtener Pedidos', response);
          setPedidos(response.data);
          setEjecutarConsulta(false);
          
        },
        (error) => {
          console.error('Salio un error:', error);}
      );
    }
    
  }, [ejecutarConsulta]);

  useEffect(() => {
    //obtener lista de pedidos desde el backend
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Agregar Nueva Pedido');
      
    } else {
      setTextoBoton('Mostrar Todos Las Pedidos');
      
    }
  }, [mostrarTabla]);
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col'>
        <h2 className='text-3xl pt-12 pb-8 font-extrabold text-gray-800'>
          Administración de Pedidos
        </h2>
        <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`shadow-md fondo1 text-gray-300 font-bold p-2 rounded m-6  self-center hover:bg-black`}
        >
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? (
        <TablaPedidos listaPedidos={pedidos} setEjecutarConsulta={setEjecutarConsulta} />
      ) : (
        <FormularioCreacionPedidos
          setMostrarTabla={setMostrarTabla}
          listaPedidos={pedidos}
          setPedidos={setPedidos}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={3000} />
    </div>
  );
};

const TablaPedidos = ({listaPedidos, setEjecutarConsulta}) => {
  const [busqueda, setBusqueda] = useState('');
  const [pedidosFiltrados, setPedidosFiltrados] = useState(listaPedidos);
  const [sumaPedidos,setSumaPedidos] = useState (0);
  
  
  
  useEffect(() => {
    setPedidosFiltrados(
      listaPedidos.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaPedidos]);
  
  console.log('lista pedidos', listaPedidos)

//  useEffect(()=>{ 
//   const handlesumar =()=>{
//     let totales = listaPedidos.parse(listaPedidos);
//     const suma = totales.map((total)=>parseFloat(total.TOTALVENTAS))
//     .reduce ((previous, current)=>{
//       return previous+current;
//     },0);
//     setSumaPedidos (suma);
//   };
//   handlesumar();
// });

// useEffect(()=>{ 
  
//   let totales = JSON.parse(listaPedidos);
//   console.log('Totales', totales)
//   let suma=0;
//     totales.forEach((s)=>{
//        suma = suma + totales.total;
//      });
//      setSumaPedidos (suma);
//      console.log ('Suma Pedidos', suma);
//   }, );



  // function sumaPedidos (listaPedidos, fn){
    
  //   listaPedidos = JSON.parse(listaPedidos);
  //   return  listaPedidos.map(typeof fn === 'function' ? fn : d => d[fn]).reduce((acomulador, valor) => acomulador + valor, 0);
  // };

//   try {
//     console.log('Suma Pedidos', sumaPedidos(listaPedidos, 'total'));
       
// } catch (e) {
//     console.log(`Error: ${e.message}`);
// }
// const sumaPedidos =()=>{
//   let totales = listaPedidos.parse(listaPedidos);
//   var suma = 0;

// }
    
// let totales = JSON.parse(listaPedidos) ;

// const sumaPedidos = totales.reduce((sum, value)=>(typeof value.total == "number"? sum + value.total : sum), 0);
// console.log ('Sumatoria',sumaPedidos);
  

  

  
  
  return (
    <div className='flex flex-col items-center justify-center'>
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder='Buscar'
        className='border-2 border-gray-700 ml-3 mb-2 px-3 py-1 w-40 self-start rounded-md focus:outline-none focus:border-gray-500'
      />
       
        <table className="tabla w-full">
          <thead>
            <tr>
              <th className="fondo1  text-gray-300 w-28">ID</th>
              <th className="fondo1  text-gray-300 w-32">Fecha</th>
              <th className="fondo1  text-gray-300 w-44">Producto</th>
              <th className="fondo1  text-gray-300 w-32">Cantidad</th>
              <th className="fondo1  text-gray-300 w-32">Valor Unidad</th>
              <th className="fondo1  text-gray-300 w-44">Cliente</th>
              <th className="fondo1  text-gray-300 w-36">Vendedor</th>
              <th className="fondo1  text-gray-300 w-36">Transportador</th>
              <th className="fondo1  text-gray-300 w-32">Estado</th>
              <th className="fondo1  text-gray-300 w-36">Total</th>
              <th className="fondo1  text-gray-300 w-32">Acciones</th>  
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.map((pedido) => {
              console.log('Pedidos Filtardo', pedidosFiltrados)
              return <FilaPedidos 
                key={nanoid()} 
                pedido={pedido}
                setEjecutarConsulta={setEjecutarConsulta}/>;
            })}
          </tbody>
        </table>
       {/* <div className='flex font-extrabold pb-10 pt-6'>
      <h1 >Total Pedidos:</h1>
      <span>{sumaPedidos}</span>
         </div>  */}
    </div>
  );
};

const FilaPedidos = ({pedido, setEjecutarConsulta})  => {
  const [edit, setEdit] = useState(false)
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [sedes, setSedes] = useState([]);
   
  
  
  useEffect(() => { 
         const fetchUsuarios = async () => {
           await obtenerUsuarios(
             (response) => {
               console.log('respuesta de usuarios', response);
               setUsuarios(response.data);
             },
             (error) => {
               console.error(error);
             }
           );
         };
         const fetchProductos = async () => {
           await obtenerProductos(
             (response) => {
               setProductos(response.data);
             },
             (error) => {
               console.error(error);
             }
           );
         };
         const fetchSedes = async () => {
          await obtenerSedes(
            (response) => {
              setSedes(response.data);
              console.log ('Sedes', response.data)
            },
            (error) => {
              console.error(error);
            }
          );
        };
        fetchUsuarios();
        fetchProductos();
        fetchSedes();
    
  }, []);
  
  const listaVendedores = usuarios.filter(v => (v.rol === 'Vendedor') && (v.estado === 'Activo'));
  const listaClientes = usuarios.filter(c => (c.rol === 'Cliente') && (c.estado === 'Activo'));
  const listaTransportador = usuarios.filter(c => (c.rol === 'Transportador') && (c.estado === 'Activo'));
  const listaProductos = productos.filter(p => (p.estado === 'Disponible'));

  
  
  const [infoNuevaPedido, setInfoNuevaPedido] = useState({
    _id: pedido._id,
    fecha: pedido.fecha,
    producto: pedido.producto,
    cantidad: pedido.cantidad,
    unidad: pedido.unidad,
    cliente: pedido.cliente,
    vendedor: pedido.vendedor,
    transportador: pedido.transportador,
    estado: pedido.estado,
    total: pedido.total,
  });

  
  

  const actualizarPedido = async () => {
    //enviar la info al backend

    await editarPedido(
      pedido._id,
      {
        fecha: infoNuevaPedido.fecha,
        producto: infoNuevaPedido.producto,
        cantidad: infoNuevaPedido.cantidad,
        unidad: infoNuevaPedido.unidad,
        cliente: infoNuevaPedido.cliente,
        vendedor: infoNuevaPedido.vendedor,
        transportador: infoNuevaPedido.transportador,
        estado: infoNuevaPedido.estado,
        total: infoNuevaPedido.total,
        
      },
      (response) => {
        console.log('Pedido Editada',response.data);
        toast.success('Pedido Modificada Exitosamente');
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error('Error Modificando Pedido');
        console.error(error);
      }
    );
  };
  
  const borrarPedido = async () => {
    await eliminarPedido(
      pedido._id,
      (response) => {
        console.log('Pedido Eliminada',response.data);
        toast.success('Pedido Eliminada Exitosamente');
        setEjecutarConsulta(true);
        
      },
      (error) => {
        console.error(error);
        toast.error('Error Eliminando Pedido');
      }
    );  
  };

  
    
  return (
    <tr >
      {edit? (

        <>
          <td className='text-center'>{infoNuevaPedido._id.slice(20)}</td>
          <td><input 
            type="date" 
            className="bg-gray-50 border border-gray-600 p-1 rounded m-1 w-32"
            value={infoNuevaPedido.fecha}
            onChange={(e) => setInfoNuevaPedido({ ...infoNuevaPedido, fecha: e.target.value })}/>
          </td>

          <td>
          <select
              className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
              name='producto'
              onChange ={(e) => setInfoNuevaPedido({ ...infoNuevaPedido, producto: e.target.value })}
              defaultValue={infoNuevaPedido.producto}>
                {listaProductos.map((p) => {
             return (
               <option
                 key={nanoid()}
                 value={p.producto}
               >{p.producto}</option>
             );
           })}
            </select>
          </td>
            
          <td>
            <input 
            type="number" 
            className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
            value={infoNuevaPedido.cantidad}
            onChange={(e) => setInfoNuevaPedido({ ...infoNuevaPedido, cantidad: e.target.value })}/>
          </td>

          <td>
            <input 
            type="number" 
            className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
            value={infoNuevaPedido.unidad}
            onChange={(e) => setInfoNuevaPedido({ ...infoNuevaPedido, unidad: e.target.value })}/>
          </td>

          <td>
            <select
              className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
              name='cliente'
              onChange ={(e) => setInfoNuevaPedido({ ...infoNuevaPedido, cliente: e.target.value })}
              defaultValue={infoNuevaPedido.cliente}>
                {listaClientes.map((el) => {
              return <option key={nanoid()}  value={el.name}>{`${el.name}`}</option>;
              })}
            </select>
          </td>
          
          <td>
            <select
              className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
              name='vendedor'
              onChange ={(e) => setInfoNuevaPedido({ ...infoNuevaPedido, vendedor: e.target.value })}
              defaultValue={infoNuevaPedido.vendedor}>
              {listaVendedores.map((el) => {
              return <option key={nanoid()}  value={el.name}>{`${el.name}`}</option>;
            })}
            </select>
          </td>

          <td>
            <select
              className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
              name='transportador'
              onChange ={(e) => setInfoNuevaPedido({ ...infoNuevaPedido, transportador: e.target.value })}
              defaultValue={infoNuevaPedido.transportador}>
              {listaTransportador.map((el) => {
              return <option key={nanoid()}  value={el.name}>{`${el.name}`}</option>;
            })}
            </select>
          </td>
              
          <td>
          <label className='flex flex-col py-2 text-gray-800' htmlFor='estado'>  
            <select
              className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
              name='estado'
              required
              defaultValue={infoNuevaPedido.estado}
              onChange ={(e) => setInfoNuevaPedido({ ...infoNuevaPedido, estado: e.target.value })}>
                <option disabled value={0}>
                    Seleccione Una Opción
                  </option>
                <option value="En Proceso">En Proceso</option>
                <option value="Entregada">Entregada</option>
                <option value="Cancelada">Cancelada</option>
            </select>
          </label>
          </td>

          <td>
            {(infoNuevaPedido.unidad)*(infoNuevaPedido.cantidad)}
          </td> 
           
        </>
                
      ) :(
      <>
          <td className=" text-center text-gray-800">{pedido._id.slice(20)}</td>
          <td className=" text-center text-gray-800">{pedido.fecha}</td>
          <td className=" text-center text-gray-800">{pedido.producto}</td>
          <td className=" text-center text-gray-800">{pedido.cantidad}</td>
          <td className=" text-center text-gray-800">{pedido.precio}</td>
          <td className=" text-center text-gray-800">{pedido.cliente}</td>
          <td className=" text-center text-gray-800">{pedido.vendedor}</td>
          <td className=" text-center text-gray-800">{pedido.transportador}</td>
          <td className=" text-center text-gray-800">{pedido.estado}</td>
          <td className=" text-center text-gray-800">{pedido.total=(pedido.cantidad*pedido.precio)}</td>
      </>  

        )}
        <td>
          <div className="flex w-full justify-around text-gray-800 ">
          {edit? (
              <>
                <i
                  onClick={() => actualizarPedido()} 
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
              
                <PrivateComponent roleList={['Administrador']}>    
                <i
                    onClick={() => borrarPedido()}
                    class="fas fa-trash text-gray-800 hover:text-red-500"/>
                </PrivateComponent>
              </>
            )} 
          </div>
        </td>
    </tr>
  );
   
};

const FormularioCreacionPedidos = ({ setMostrarTabla, listaPedidos, setPedidos }) => {
  const form = useRef(null);
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [sedes, setSedes] = useState([]);
   
  
  
  useEffect(() => { 
         const fetchUsuarios = async () => {
           await obtenerUsuarios(
             (response) => {
               console.log('respuesta de usuarios', response);
               setUsuarios(response.data);
             },
             (error) => {
               console.error(error);
             }
           );
         };
         const fetchProductos = async () => {
           await obtenerProductos(
             (response) => {
               setProductos(response.data);
             },
             (error) => {
               console.error(error);
             }
           );
         };
         const fetchSedes = async () => {
          await obtenerSedes(
            (response) => {
              setSedes(response.data);
              console.log ('Sedes', response.data)
            },
            (error) => {
              console.error(error);
            }
          );
        };
        fetchUsuarios();
        fetchProductos();
        fetchSedes();
    
  }, []);

  const listaVendedores = usuarios.filter(v => (v.rol === 'Vendedor') && (v.estado === 'Activo'));
  const listaClientes = usuarios.filter(c => (c.rol === 'Cliente') && (c.estado === 'Activo'));
  const listaTransportadores = usuarios.filter(c => (c.rol === 'Transportador') && (c.estado === 'Activo'));
  const listaProductos = productos.filter(p => (p.estado === 'Disponible'));
       console.log('Productos Filtrados', listaProductos)
  

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    
    const nuevaPedido = {};
    fd.forEach((value, key) => {
      nuevaPedido[key] = value;
    });
    
    console.log('Info Nuevo Pedido ', nuevaPedido);

   await crearPedido(
      {
        fecha: nuevaPedido.fecha,
        producto: nuevaPedido.producto,
        cantidad: nuevaPedido.cantidad,
        precio: nuevaPedido.precio,
        cliente: nuevaPedido.cliente,
        vendedor: nuevaPedido.vendedor,
        transportador: nuevaPedido.transportador,
        sede: nuevaPedido.sede,
        estado: ('En Proceso'),
        total: (nuevaPedido.cantidad*nuevaPedido.unidad),
      },
      (response) => {
        console.log(response.data);
        toast.success('Pedido Creado Exitosamente');
        setMostrarTabla(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error Creando Pedido');
      }
    );
    setMostrarTabla(true);
  }; 

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold pb-4 text-gray-800'>Nueva Pedido</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col justify-center text-center pb-10'>
      
        <label className='flex flex-col py-2 text-gray-800' htmlFor='fecha'>
          Fecha de Pedido
          <input
            name='fecha'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 '
            type='date'
            placeholder='Ej: dd/mm/aaaa'
            required/>
        </label>
        
        <label className='flex flex-col py-2 text-gray-800' htmlFor='producto'>
         Producto
         <select
           className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
           name="producto"
           required
           defaultValue={0}>
           <option disabled value={0}>
             Elija una Opción
           </option>
           {listaProductos.map((p) => {
             return (
               <option
                 key={nanoid()}
                 value={p.nombre}
               >{p.nombre}</option>
             );
           })}
           </select>
         </label>

        <label className='flex flex-col py-2 text-gray-800' htmlFor='cantidad'>    
          Cantidad
          <input
            name='cantidad'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={1}
            max={100}
            placeholder='Ej: 10'
            required/>
        </label>

        <label className='flex flex-col py-2 text-gray-800' htmlFor='precio'>    
          Precio
          <input
            name='precio'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={100}
            max={10000}
            placeholder='Ej: 350'
            required/>
        </label>

        <label className='flex flex-col py-2 text-gray-800' htmlFor='cliente'>
          Cliente
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='cliente'
            required
            defaultValue={0}>
            <option disabled value={0}>
              Elija una Opción
            </option>
            {listaClientes.map((el) => {
              return <option key={nanoid()}  value={el.name}>{`${el.name}`}</option>;
            })} 
          </select>
        </label>

        <label className='flex flex-col py-2 text-gray-800' htmlFor='vendedor'>
          Vendedor
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='vendedor'
            required
            defaultValue={0}>
            <option disabled value={0}>
              Elija una Opción
            </option>
            {listaVendedores.map((el) => {
              return <option key={nanoid()}  value={el.name}>{`${el.name}`}</option>;
            })}
          </select>
        </label>

        <label className='flex flex-col py-2 text-gray-800' htmlFor='transportador'>
          Transportador
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='transportador'
            required
            defaultValue={0}>
            <option disabled value={0}>
              Elija una Opción
            </option>
            {listaTransportadores.map((el) => {
              return <option key={nanoid()}  value={el.name}>{`${el.name}`}</option>;
            })}
          </select>
        </label>

        <label className='flex flex-col py-2 text-gray-800' htmlFor='sede'>
          Sede
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='sede'
            required
            defaultValue={0}>
            <option disabled value={0}>
              Elija una Opción
            </option>
            {sedes.map((el) => {
              return <option key={nanoid()}  value={el.nombre}>{`${el.nombre}`}</option>;
            })}
          </select>
        </label>

        {/* <label className='flex flex-col py-2 text-gray-800' htmlFor='estado'>
          Estado de la Pedido
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='estado'
            required
            defaultValue={0}>
            <option disabled value={0}>
              Elija una Opción
            </option>
            <option>En Proceso</option>
            <option>Entregada</option>
            <option>Cancelada</option>            
          </select>
        </label> */}
        
        
        <button
          type='submit'
          className='col-span-2 py-3 fondo1 font-bold  text-gray-300 p-2 rounded-full shadow-md hover:bg-black'>
          Crear Pedido
        </button>

      </form>
    </div>
  );
};



export default Pedidos;