import { nanoid } from 'nanoid';
import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { obtenerVentas, crearVenta, editarVenta, eliminarVenta } from 'utils/api';
import { obtenerProductos } from 'utils/api';
import { obtenerUsuarios } from 'utils/api';
import PrivateComponent from 'components/PrivateComponent';

const Ventas = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [ventas, setVentas] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Agregar Nueva Venta');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [mostrarRastreo, setMostrarRastreo] = useState(false);
  
  
  useEffect(() => {
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
      obtenerVentas(
        (response) => {
          console.log('la respuesta Obtener Ventas', response);
          setVentas(response.data);
          setEjecutarConsulta(false);
          
        },
        (error) => {
          console.error('Salio un error:', error);}
      );
    }
    
  }, [ejecutarConsulta]);

  useEffect(() => {
    //obtener lista de ventas desde el backend
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Agregar Nuevo Pedido');
      
    } else {
      setTextoBoton('Mostrar Todos Los Pedidos');
      
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
        <TablaVentas listaVentas={ventas} setEjecutarConsulta={setEjecutarConsulta} />
      ) : mostrarRastreo ?(<Rastreo/>):
       ( 
        <FormularioCreacionVentas
          setMostrarTabla={setMostrarTabla}
          listaVentas={ventas}
          setVentas={setVentas}
        />
      )}
      
      <ToastContainer position='bottom-center' autoClose={3000} />
    </div>
  );
};

const TablaVentas = ({listaVentas, setEjecutarConsulta}) => {
  const [busqueda, setBusqueda] = useState('');
  const [ventasFiltrados, setVentasFiltrados] = useState(listaVentas);
  const [sumaVentas,setSumaVentas] = useState (0);
  
  
  
  useEffect(() => {
    setVentasFiltrados(
      listaVentas.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaVentas]);
  
  console.log('lista ventas', listaVentas)

//  useEffect(()=>{ 
//   const handlesumar =()=>{
//     let totales = listaVentas.parse(listaVentas);
//     const suma = totales.map((total)=>parseFloat(total.TOTALVENTAS))
//     .reduce ((previous, current)=>{
//       return previous+current;
//     },0);
//     setSumaVentas (suma);
//   };
//   handlesumar();
// });

// useEffect(()=>{ 
  
//   let totales = JSON.parse(listaVentas);
//   console.log('Totales', totales)
//   let suma=0;
//     totales.forEach((s)=>{
//        suma = suma + totales.total;
//      });
//      setSumaVentas (suma);
//      console.log ('Suma Ventas', suma);
//   }, );



  // function sumaVentas (listaVentas, fn){
    
  //   listaVentas = JSON.parse(listaVentas);
  //   return  listaVentas.map(typeof fn === 'function' ? fn : d => d[fn]).reduce((acomulador, valor) => acomulador + valor, 0);
  // };

//   try {
//     console.log('Suma Ventas', sumaVentas(listaVentas, 'total'));
       
// } catch (e) {
//     console.log(`Error: ${e.message}`);
// }
// const sumaVentas =()=>{
//   let totales = listaVentas.parse(listaVentas);
//   var suma = 0;

// }
    
// let totales = JSON.parse(listaVentas) ;

// const sumaVentas = totales.reduce((sum, value)=>(typeof value.total == "number"? sum + value.total : sum), 0);
// console.log ('Sumatoria',sumaVentas);
  

  

  
  
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
              <th className="fondo1  text-gray-300 w-28">Factura</th>
              <th className="fondo1  text-gray-300 w-32">Fecha</th>
              <th className="fondo1  text-gray-300 w-44">Producto</th>
              <th className="fondo1  text-gray-300 w-32">Cantidad</th>
              <th className="fondo1  text-gray-300 w-32">Valor Unidad</th>
              <th className="fondo1  text-gray-300 w-44">Cliente</th>
              <th className="fondo1  text-gray-300 w-36">Vendedor</th>
              <th className="fondo1  text-gray-300 w-32">Estado</th>
              <th className="fondo1  text-gray-300 w-36">Total</th>
              <th className="fondo1  text-gray-300 w-32">Acciones</th>  
            </tr>
          </thead>
          <tbody>
            {ventasFiltrados.map((venta) => {
              console.log('Ventas Filtardo', ventasFiltrados)
              return <FilaVentas 
                key={nanoid()} 
                venta={venta}
                setEjecutarConsulta={setEjecutarConsulta}
                setMostrarTabla
                setMostrarRastreo
                mostrarTabla
                mostrarRastreo/>;
            })}
          </tbody>
        </table>
       {/* <div className='flex font-extrabold pb-10 pt-6'>
      <h1 >Total Ventas:</h1>
      <span>{sumaVentas}</span>
         </div>  */}
    </div>
  );
};

const FilaVentas = ({venta, setEjecutarConsulta,setMostrarTabla,setMostrarRastreo,mostrarTabla,mostrarRastreo})  => {
  const [edit, setEdit] = useState(false)
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
   
  
  
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
        fetchUsuarios();
        fetchProductos();
    
  }, []);
  
  const listaVendedores = usuarios.filter(v => (v.rol === 'Vendedor') && (v.estado === 'Activo'));
  const listaClientes = usuarios.filter(c => (c.rol === 'Cliente') && (c.estado === 'Activo'));
  const listaProductos = productos.filter(p => (p.estado === 'Disponible'));

  
  
  const [infoNuevaVenta, setInfoNuevaVenta] = useState({
    _id: venta._id,
    fecha: venta.fecha,
    producto: venta.producto,
    cantidad: venta.cantidad,
    unidad: venta.unidad,
    cliente: venta.cliente,
    vendedor: venta.vendedor,
    estado: venta.estado,
    total: venta.total,
  });

  
  

  const actualizarVenta = async () => {

    await editarVenta(
      venta._id,
      {
        fecha: infoNuevaVenta.fecha,
        producto: infoNuevaVenta.producto,
        cantidad: infoNuevaVenta.cantidad,
        unidad: infoNuevaVenta.unidad,
        cliente: infoNuevaVenta.cliente,
        vendedor: infoNuevaVenta.vendedor,
        estado: infoNuevaVenta.estado,
        total: infoNuevaVenta.total,
        
      },
      (response) => {
        console.log('Venta Editada',response.data);
        toast.success('Venta Modificada Exitosamente');
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error('Error Modificando Venta');
        console.error(error);
      }
    );
  };
  
  const borrarVenta = async () => {
    await eliminarVenta(
      venta._id,
      (response) => {
        console.log('Venta Eliminada',response.data);
        toast.success('Venta Eliminada Exitosamente');
        setEjecutarConsulta(true);
        
      },
      (error) => {
        console.error(error);
        toast.error('Error Eliminando Venta');
      }
    );  
  };


  
    

  // const [sumaVentas, setSumaVentas] = useState([]);{
  //     const totalVentas =()=>{
  //       useEffect(()=>{  
  //           setSumaVentas (infoNuevaVenta);
  //           let suma=0;
  //           sumaVentas.forEach((s)=>{
  //           suma= suma+sumaVentas.total;
  //           });
  //           setSumaVentas (suma);
  //           console.log ('Total Ventas', totalVentas);
  //           console.log ('Suma Ventas', suma);
  //           return suma;
  //         }, [sumaVentas]);
  //     };
  // };
    
  // sumaVentas =()=>{
  //     setSumaVentas (infoNuevaVenta);

  //   }
  
    // const sumaVentas = ()=> {
    //   infoNuevaVenta.map(item => item.total).reduce((prev, curr) => prev + curr, 0);
    //   console.log('Esta es la Suma de las ventas',sumaVentas);
    //   return sumaVentas;
    //};   
      

  
 
    
  return (
    <tr >
      {edit? (

        <>
          <td className='text-center'>{infoNuevaVenta._id.slice(20)}</td>
          <td><input 
            type="date" 
            className="bg-gray-50 border border-gray-600 p-1 rounded m-1 w-32"
            value={infoNuevaVenta.fecha}
            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, fecha: e.target.value })}/>
          </td>

          <td>
          <select
              className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
              name='producto'
              onChange ={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, producto: e.target.value })}
              defaultValue={infoNuevaVenta.producto}>
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
            value={infoNuevaVenta.cantidad}
            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, cantidad: e.target.value })}/>
          </td>

          <td>
            <input 
            type="number" 
            className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
            value={infoNuevaVenta.unidad}
            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, unidad: e.target.value })}/>
          </td>

          <td>
            <select
              className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
              name='cliente'
              onChange ={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, cliente: e.target.value })}
              defaultValue={infoNuevaVenta.cliente}>
                {listaClientes.map((el) => {
              return <option key={nanoid()}  value={el.name}>{`${el.name}`}</option>;
              })}
            </select>
          </td>
          
          <td>
            <select
              className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
              name='vendedor'
              onChange ={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, vendedor: e.target.value })}
              defaultValue={infoNuevaVenta.vendedor}>
              {listaVendedores.map((el) => {
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
              defaultValue={infoNuevaVenta.estado}
              onChange ={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, estado: e.target.value })}>
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
            {(infoNuevaVenta.unidad)*(infoNuevaVenta.cantidad)}
          </td> 
           
        </>
                
      ) :(
      <>
          <td className=" text-center text-gray-800">{venta._id.slice(20)}</td>
          <td className=" text-center text-gray-800">{venta.fecha}</td>
          <td className=" text-center text-gray-800">{venta.producto}</td>
          <td className=" text-center text-gray-800">{venta.cantidad}</td>
          <td className=" text-center text-gray-800">{venta.unidad}</td>
          <td className=" text-center text-gray-800">{venta.cliente}</td>
          <td className=" text-center text-gray-800">{venta.vendedor}</td>
          <td className=" text-center text-gray-800">{venta.estado}</td>
          <td className=" text-center text-gray-800">{venta.total=(venta.cantidad*venta.unidad)}</td>
      </>  

        )}
        <td>
          <div className="flex w-full justify-around text-gray-800 ">
          {edit? (
              <>
                <i
                  onClick={() => actualizarVenta()} 
                  className="fas fa-check hover:text-green-600"/>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-ban hover:text-yellow-700'/>
              </>
            ):(
              <>
              <i
                onClick={() => {
                setMostrarTabla(!mostrarTabla);
                setMostrarRastreo(!mostrarRastreo);
              }}
              className={"fas fa-map-marked-alt text-sm"}
            >
            </i>
                <i
                  onClick={() => setEdit(!edit)}
                  className="fas fa-edit hover:text-yellow-600"/>
              
                <PrivateComponent roleList={['Administrador']}>    
                <i
                    onClick={() => borrarVenta()}
                    class="fas fa-trash text-gray-800 hover:text-red-500"/>
                </PrivateComponent>
              </>
            )} 
          </div>
        </td>
    </tr>
  );
   
};

const FormularioCreacionVentas = ({ setMostrarTabla, listaVentas, setVentas }) => {
  const form = useRef(null);
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  

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
        fetchUsuarios();
        fetchProductos();
       }, []);

  const listaVendedores = usuarios.filter(v => (v.rol === 'Vendedor') && (v.estado === 'Activo'));
  const listaClientes = usuarios.filter(c => (c.rol === 'Cliente') && (c.estado === 'Activo'));
  const listaProductos = productos.filter(p => (p.estado === 'Disponible'));

  

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    
    const nuevaVenta = {};
    fd.forEach((value, key) => {
      nuevaVenta[key] = value;
    });
    
    console.log('form data', nuevaVenta);

   await crearVenta(
      {
        fecha: nuevaVenta.fecha,
        producto: nuevaVenta.producto,
        cantidad: nuevaVenta.cantidad,
        unidad: nuevaVenta.unidad,
        cliente: nuevaVenta.cliente,
        vendedor: nuevaVenta.vendedor,
        estado: nuevaVenta.estado,
        total: (nuevaVenta.cantidad*nuevaVenta.unidad),
      },
      (response) => {
        console.log(response.data);
        toast.success('Venta Creada Exitosamente');
        setMostrarTabla(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error Creando Venta');
      }
    );
    setMostrarTabla(true);
  }; 

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-2xl font-extrabold pb-4 text-gray-800'>Nueva Venta</h2>
      <form ref={form} onSubmit={submitForm} className=''>
      <label className='flex flex-col py-2 text-gray-800' htmlFor='fecha'>
          Fecha del pedido
          <input
            name='fecha'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 '
            type='date'
            placeholder='Ej: dd/mm/aaaa'
            required/>
        </label>
      <div className= "flex flex-row">
     
        
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
                 value={p.producto}
               >{p.producto}</option>
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
            placeholder='Ej: 2'
            required/>
        </label>
        
        <label className='flex flex-col py-2 text-gray-800' htmlFor='unidad'>    
          Valor Unitario
          <input
            name='unidad'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={100}
            max={10000}
            placeholder='Ej: 350'
            required/>
        </label>

      </div>
      

     

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

        <label className='flex flex-col py-2 text-gray-800' htmlFor='estado'>
          Estado del pedido
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
        </label>
        
        {/* <label className='flex flex-col py-2 text-gray-800' htmlFor='total'>    
          Total Venta
          <input
            name='total'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={200}
            max={5000}
            placeholder='Ej: 230'
            required/> 
        </label> */}
        
        <button
          type='submit'
          className='col-span-2 py-3 fondo1 font-bold  text-gray-300 p-2 rounded-full shadow-md hover:bg-black'>
          Crear Venta
        </button>

      </form>
    </div>
  );
};

const Rastreo = () => {
  const [mostrarMapa, setMostrarMapa] = useState(false);
  return (
    <div class="w-11/12 min-h-screen flex justify">
      <div class="w-full bg-white rounded-lg shadow-sm p-8 mx-64">
        <h1 class="font-extrabold tracking-wider text-center">Pedido #</h1>

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
                    <p class="text-gray-400 text-sm"> Fecha: </p>
                    <p class="text-gray-400 text-sm"> 26/11/2021 </p>
                  </div>
                  <div className="flex justify-start items-center gap-2">
                    <p className="text-gray-400 text-sm"> Hora: </p>
                    <p class="text-gray-400 text-sm"> 16:52</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p class="text-gray-700 font-bold tracking-wider">Encargado</p>
              <p class="text-gray-400 text-sm">
                {" "}
                David Camilo Serrato Trujillo
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
                <p class="text-gray-700 font-bold tracking-wider">Enviado - En curso</p>
                <div className="flex justify-start items-center gap-2">
                  <p class="text-gray-400 text-sm"> Fecha: </p>
                  <p class="text-gray-400 text-sm"> 26/11/2021 </p>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <p className="text-gray-400 text-sm"> Hora: </p>
                  <p class="text-gray-400 text-sm"> 16:52</p>
                </div>
              </div>
            </div>
            <div>
              <p class="text-gray-700 font-bold tracking-wider">Encargado</p>
              <p class="text-gray-400 text-sm">
                {" "}
                David Camilo Serrato Trujillo
              </p>
            </div>
            <span className="font-bold text-yellow-500 text-3xl mr-3">
              <i className="fas fa-sync-alt"></i>
            </span>
          </div>
          <Rechazado/>
            <Enviado/>
          
        </div>
        <div className="flex justify-end items-center mt-8 mr-3">
          <span class="font-bold text-gray-400 height text-4xl hover:text-gray-500 hover:text-4xl">
          <i
                onClick={() => {
                setMostrarMapa(!mostrarMapa);
              }}
              className={"fas fa-map-marked-alt text-sm"}
            >
            </i>
          </span>
        </div>
        
      </div>
    </div>
  );
};

const Enviado = () => {
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
            <p class="text-gray-400 text-sm"> 26/11/2021 </p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <p className="text-gray-400 text-sm"> Hora: </p>
            <p class="text-gray-400 text-sm"> 16:52</p>
          </div>
        </div>
      </div>
      <div>
        <p class="text-gray-700 font-bold tracking-wider">Encargado</p>
        <p class="text-gray-400 text-sm"> David Camilo Serrato Trujillo</p>
      </div>
      <span class="font-bold text-green-500 text-3xl mr-3">
        <i className="fas fa-clipboard-check"></i>
      </span>
    </div>
  );
};
const Rechazado = () => {
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
                  <p class="text-gray-400 text-sm"> Fecha: </p>
                  <p class="text-gray-400 text-sm"> 26/11/2021 </p>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <p className="text-gray-400 text-sm"> Hora: </p>
                  <p class="text-gray-400 text-sm"> 16:52</p>
                </div>
              </div>
            </div>
            <div>
              <p class="text-gray-700 font-bold tracking-wider">Encargado</p>
              <p class="text-gray-400 text-sm">
                {" "}
                David Camilo Serrato Trujillo
              </p>
            </div>
            <span class="font-bold text-pink-500 text-3xl mr-3">
              <i className="fas fa-times"></i>
            </span>
            
          </div>
    );}


export default Ventas;