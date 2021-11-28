import { nanoid } from "nanoid";
import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  obtenerPedidos,
  crearPedido,
  editarPedido,
  eliminarPedido,
} from "utils/api";
import { obtenerProductos } from "utils/api";
import { obtenerUsuarios } from "utils/api";
import { obtenerSedes } from "utils/api";
import { buscarPedido } from "utils/api";
import Rastreo from "components/Rastreo";
import PrivateComponent from "components/PrivateComponent";

const Pedidos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [mostrarRas, setMostrarRas] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [textoBoton, setTextoBoton] = useState("Agregar Pedido");
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
const [pedi,setPedi]=useState({});
  useEffect(() => {
    console.log("consulta", ejecutarConsulta);
    if (ejecutarConsulta) {
      obtenerPedidos(
        (response) => {
          console.log("la respuesta Obtener Pedidos", response);
          setPedidos(response.data);
          setEjecutarConsulta(false);
        },
        (error) => {
          console.error("Salio un error:", error);
        }
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
    if (mostrarRas) {
      setMostrarTabla(false);
    } else {
      setMostrarTabla(true);
    }
  }, [mostrarRas]);
  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton("Agregar Pedido");
    } else {
      setTextoBoton("Todos Los Pedidos");
    }
  }, [mostrarTabla]);
  return (
    <div className="flex h-full w-full flex-col items-center justify-start p-8">
      <div className="flex flex-col">
        <h2 className="text-3xl pt-12 pb-8 font-extrabold text-gray-800">
          Administración de Pedidos
        </h2>
        {mostrarRas & !mostrarTabla ? (
          <></>
        ) : (
          <PrivateComponent roleList={['Administrador', 'Vendedor']}>
          <button
            onClick={() => {
              setMostrarTabla(!mostrarTabla);
            }}
            className={`shadow-md fondo1 text-gray-200 font-bold p-2 rounded m-6  self-center hover:bg-black`}>
            {textoBoton}
          </button>
          </PrivateComponent>
        )}
      </div>
      {mostrarRas & !mostrarTabla ? (
        <Rastreo setMostrarRas={setMostrarRas} pedi = {pedi}/>
      ) : mostrarTabla ? (
        <TablaPedidos
          listaPedidos={pedidos}
          setEjecutarConsulta={setEjecutarConsulta}
          setMostrarTabla={setMostrarTabla}
          mostrarTabla={mostrarTabla}
          setMostrarRas={setMostrarRas}
          mostrarRas={mostrarRas}
          setPedi = {setPedi}
        />
      ) : (
        <FormularioCreacionPedidos
          setMostrarTabla={setMostrarTabla}
          listaPedidos={pedidos}
          setPedidos={setPedidos}
        />
      )}
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
};

const TablaPedidos = ({
  listaPedidos,
  setEjecutarConsulta,
  setMostrarTabla,
  mostrarTabla,
  setMostrarRas,
  mostrarRas,
  setPedi,
}) => {
  const [busqueda, setBusqueda] = useState("");
  const [pedidosFiltrados, setPedidosFiltrados] = useState(listaPedidos);
  const [sumaPedidos, setSumaPedidos] = useState(0);

  useEffect(() => {
    setPedidosFiltrados(
      listaPedidos.filter((elemento) => {
        return JSON.stringify(elemento)
          .toLowerCase()
          .includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaPedidos]);

  console.log("lista pedidos", listaPedidos);

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
                      <th class="px-3 py-3 border-b-2 border-gray-400 fondo1 text-center text-xs font-extrabold text-gray-200 uppercase tracking-wider w-24">
                        Fecha
                      </th>
                      <th class="px-3 py-3 border-b-2 border-gray-400 fondo1 text-center text-xs font-extrabold text-gray-200 uppercase tracking-wider w-24">
                        Producto
                      </th>
                      <th class="px-3 py-3 border-b-2 border-gray-400 fondo1 text-center text-xs font-extrabold text-gray-200 uppercase tracking-wider w-16">
                        Cantidad
                      </th>
                      <th class="px-3 py-3 border-b-2 border-gray-400 fondo1 text-center text-xs font-extrabold text-gray-200 uppercase tracking-wider w-24">
                        Precio
                      </th>
                      <th class="px-3 py-3 border-b-2 border-gray-400 fondo1 text-center text-xs font-extrabold text-gray-200 uppercase tracking-wider w-24">
                        Cliente
                      </th>
                      <th class="px-3 py-3 border-b-2 border-gray-400 fondo1 text-center text-xs font-extrabold text-gray-200 uppercase tracking-wider w-24">
                        Vendedor
                      </th>
                      <th class="px-3 py-3 border-b-2 border-gray-400 fondo1 text-center text-xs font-extrabold text-gray-200 uppercase tracking-wider w-24">
                        Transportador
                      </th>
                      <th class="px-3 py-3 border-b-2 border-gray-400 fondo1 text-center text-xs font-extrabold text-gray-200 uppercase tracking-wider w-24">
                        Estado
                      </th>
                      <th class="px-3 py-3 border-b-2 border-gray-400 fondo1 text-center text-xs font-extrabold text-gray-200 uppercase tracking-wider w-24">
                        Total
                      </th>
                      <th class="px-3 py-3 border-b-2 border-gray-400 fondo1 text-center text-xs font-extrabold text-gray-200 uppercase tracking-wider w-24">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidosFiltrados.map((pedido) => {
                      console.log("Pedidos Filtardo", pedidosFiltrados);
                      return (
                        <FilaPedidos
                          key={nanoid()}
                          pedido={pedido}
                          setEjecutarConsulta={setEjecutarConsulta}
                          setMostrarTabla={setMostrarTabla}
                          mostrarTabla={mostrarTabla}
                          setMostrarRas={setMostrarRas}
                          mostrarRas={mostrarRas}
                          setPedi = {setPedi}
                        />
                      );
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

const FilaPedidos = ({
  pedido,
  setEjecutarConsulta,
  setMostrarTabla,
  mostrarTabla,
  setMostrarRas,
  mostrarRas,
  setPedi
}) => {
  const [edit, setEdit] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [pedio, setPedido] = useState({});

  useEffect(() => {
    const fetchUsuarios = async () => {
      await obtenerUsuarios(
        (response) => {
          console.log("respuesta de usuarios", response);
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
          console.log("Sedes", response.data);
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

  const listaVendedores = usuarios.filter(
    (v) => v.rol === "Vendedor" && v.estado === "Activo"
  );
  const listaClientes = usuarios.filter(
    (c) => c.rol === "Cliente" && c.estado === "Activo"
  );
  const listaTransportador = usuarios.filter(
    (c) => c.rol === "Transportador" && c.estado === "Activo"
  );
  const listaProductos = productos.filter((p) => p.estado === "Disponible");

  const [infoNuevaPedido, setInfoNuevaPedido] = useState({
    _id: pedido._id,
    fecha: pedido.fecha,
    producto: pedido.producto,
    cantidad: pedido.cantidad,
    precio: pedido.precio,
    cliente: pedido.cliente,
    vendedor: pedido.vendedor,
    transportador: pedido.transportador,
    estado: pedido.estado,
    total: pedido.total,
  });

  

  const actualizarPedido = async () => {
    //enviar la info al backend
       console.log("este es el pedido",pedido);
    await editarPedido(
      pedido._id,
      {
        fecha: infoNuevaPedido.fecha,
        producto: infoNuevaPedido.producto,
        cantidad: infoNuevaPedido.cantidad,
        precio: infoNuevaPedido.precio,
        cliente: infoNuevaPedido.cliente,
        vendedor: infoNuevaPedido.vendedor,
        transportador: infoNuevaPedido.transportador,
        estado: infoNuevaPedido.estado,
        total: infoNuevaPedido.precio * infoNuevaPedido.cantidad,
      },
      (response) => {
        console.log("Pedido Editada", response.data);
        toast.success("Pedido Modificada Exitosamente");
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error("Error Modificando Pedido");
        console.error(error);
      }
    );
  };

  const borrarPedido = async () => {
    await eliminarPedido(
      pedido._id,
      (response) => {
        console.log("Pedido Eliminada", response.data);
        toast.success("Pedido Eliminada Exitosamente");
        setEjecutarConsulta(true);
      },
      (error) => {
        console.error(error);
        toast.error("Error Eliminando Pedido");
      }
    );
  };
  const buscaPedido = async () => {
    await buscarPedido(
      pedido._id,
      (response) => {
        console.log("PEDIDO", response.data);
        setMostrarRas(!mostrarRas);
        setPedi(response.data);
      },
      (error) => {
        toast.error("Error Modificando Pedido");
        console.error(error);
      }
    );
  };
  return (
    <tr>
      {edit ? (
        <>
          <td className="text-center">{infoNuevaPedido._id.slice(20)}</td>
          <td>
            <input
              type="date"
              className="bg-gray-50 border border-gray-600 p-1 rounded m-1 w-32"
              value={infoNuevaPedido.fecha}
              onChange={(e) =>
                setInfoNuevaPedido({
                  ...infoNuevaPedido,
                  fecha: e.target.value,
                })
              }
            />
          </td>

          <td>
            <select
              className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
              name="producto"
              onChange={(e) =>
                setInfoNuevaPedido({
                  ...infoNuevaPedido,
                  producto: e.target.value,
                })
              }
              value={infoNuevaPedido.producto}
            >
              {listaProductos.map((p) => {
                return (
                  <option key={nanoid()} value={p.nombre}>
                    {p.nombre}
                  </option>
                );
              })}
            </select>
          </td>

          <td>
            <input
              type="number"
              className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
              value={infoNuevaPedido.cantidad}
              onChange={(e) =>
                setInfoNuevaPedido({
                  ...infoNuevaPedido,
                  cantidad: e.target.value,
                })
              }
            />
          </td>

          <td>
            <input
              type="number"
              className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
              value={infoNuevaPedido.precio}
              onChange={(e) =>
                setInfoNuevaPedido({
                  ...infoNuevaPedido,
                  precio: e.target.value,
                })
              }
            />
          </td>

          <td>
            <select
              className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
              name="cliente"
              onChange={(e) =>
                setInfoNuevaPedido({
                  ...infoNuevaPedido,
                  cliente: e.target.value,
                })
              }
              value ={infoNuevaPedido.cliente}
            >
              {listaClientes.map((el) => {
                return (
                  <option key={nanoid()} value={el.name}>{`${el.name}`}</option>
                );
              })}
            </select>
          </td>

          <td>
            <select
              className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
              name="vendedor"
              onChange={(e) =>
                setInfoNuevaPedido({
                  ...infoNuevaPedido,
                  vendedor: e.target.value,
                })
              }
              value ={infoNuevaPedido.vendedor}
            >
              {listaVendedores.map((el) => {
                return (
                  <option key={nanoid()} value={el.name}>{`${el.name}`}</option>
                );
              })}
            </select>
          </td>

          <td>
            <select
              className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
              name="transportador"
              onChange={(e) =>
                setInfoNuevaPedido({
                  ...infoNuevaPedido,
                  transportador: e.target.value,
                })
              }
              value ={infoNuevaPedido.transportador}
            >
              {listaTransportador.map((el) => {
                return (
                  <option key={nanoid()} value={el.name}>{`${el.name}`}</option>
                );
              })}
            </select>
          </td>

          <td>
            <label
              className="flex flex-col py-2 text-gray-800"
              htmlFor="estado"
            >
              <select
                className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
                name="estado"
                required
                value={infoNuevaPedido.estado}
                onChange={(e) =>
                  setInfoNuevaPedido({
                    ...infoNuevaPedido,
                    estado: e.target.value,
                  })
                }
              >
                <option disabled value={0}>
                  Seleccione Una Opción
                </option>
                <option value="En Proceso">En Proceso</option>
                <option value="Entregada">Entregada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </label>
          </td>

          <td>{infoNuevaPedido.precio * infoNuevaPedido.cantidad}</td>
        </>
      ) : (
        <>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{pedido._id.slice(20)}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{pedido.fecha}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{pedido.producto}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{pedido.cantidad}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{pedido.precio}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{pedido.cliente}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{pedido.vendedor}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{pedido.transportador}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{pedido.estado}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">
            {(pedido.total = pedido.cantidad * pedido.precio)}
          </td>
        </>
      )}
      <td>
        <div className="flex w-full justify-around text-gray-800 ">
          {edit ? (
            <>
              <i
                onClick={(() => actualizarPedido())}
                className="fas fa-check hover:text-green-600"
              />
              <i
                onClick={() => setEdit(!edit)}
                className="fas fa-ban hover:text-yellow-700"
              />
            </>
          ) : (
            <>
              <i
                onClick={() => setEdit(!edit)}
                className="fas fa-edit hover:text-yellow-600"
              />

              <i
                onClick={() => buscaPedido()}
                className="fas fa-map-marked-alt hover:text-green-600"
              />
              <PrivateComponent roleList={["Administrador"]}>
                <i
                  onClick={() => borrarPedido()}
                  class="fas fa-trash text-gray-800 hover:text-red-500"
                />
              </PrivateComponent>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

const FormularioCreacionPedidos = ({
  setMostrarTabla,
  listaPedidos,
  setPedidos,
}) => {
  const form = useRef(null);
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [sedes, setSedes] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      await obtenerUsuarios(
        (response) => {
          console.log("respuesta de usuarios", response);
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
          console.log("Sedes", response.data);
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

  const listaVendedores = usuarios.filter(
    (v) => v.rol === "Vendedor" && v.estado === "Activo"
  );
  const listaClientes = usuarios.filter(
    (c) => c.rol === "Cliente" && c.estado === "Activo"
  );
  const listaTransportadores = usuarios.filter(
    (c) => c.rol === "Transportador" && c.estado === "Activo"
  );
  const listaProductos = productos.filter((p) => p.estado === "Disponible");
  console.log("Productos Filtrados", listaProductos);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevaPedido = {};
    fd.forEach((value, key) => {
      nuevaPedido[key] = value;
    });

    console.log("Info Nuevo Pedido ", nuevaPedido);

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
        estado: "En Proceso",
        total: nuevaPedido.cantidad * nuevaPedido.precio,
      },
      (response) => {
        console.log(response.data);
        toast.success("Pedido Creado Exitosamente");
        setMostrarTabla(true);
      },
      (error) => {
        console.error(error);
        toast.error("Error Creando Pedido");
      }
    );
    setMostrarTabla(true);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-extrabold pb-4 text-gray-800">
        Nueva Pedido
      </h2>
      <form
        ref={form}
        onSubmit={submitForm}
        className="flex flex-col justify-center text-center pb-10"
      >
        <label className="flex flex-col py-2 text-gray-800" htmlFor="fecha">
          Fecha de Pedido
          <input
            name="fecha"
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 "
            type="date"
            placeholder="Ej: dd/mm/aaaa"
            required
          />
        </label>

        <label className="flex flex-col py-2 text-gray-800" htmlFor="producto">
          Producto
          <select
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            name="producto"
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Elija una Opción
            </option>
            {listaProductos.map((p) => {
              return (
                <option key={nanoid()} value={p.nombre}>
                  {p.nombre}
                </option>
              );
            })}
          </select>
        </label>

        <label className="flex flex-col py-2 text-gray-800" htmlFor="cantidad">
          Cantidad
          <input
            name="cantidad"
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            type="number"
            min={1}
            max={100}
            placeholder="Ej: 10"
            required
          />
        </label>

        <label className="flex flex-col py-2 text-gray-800" htmlFor="precio">
          Precio
          <input
            name="precio"
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            type="number"
            min={100}
            max={10000}
            placeholder="Ej: 350"
            required
          />
        </label>

        <label className="flex flex-col py-2 text-gray-800" htmlFor="cliente">
          Cliente
          <select
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            name="cliente"
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Elija una Opción
            </option>
            {listaClientes.map((el) => {
              return (
                <option key={nanoid()} value={el.name}>{`${el.name}`}</option>
              );
            })}
          </select>
        </label>

        <label className="flex flex-col py-2 text-gray-800" htmlFor="vendedor">
          Vendedor
          <select
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            name="vendedor"
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Elija una Opción
            </option>
            {listaVendedores.map((el) => {
              return (
                <option key={nanoid()} value={el.name}>{`${el.name}`}</option>
              );
            })}
          </select>
        </label>

        <label
          className="flex flex-col py-2 text-gray-800"
          htmlFor="transportador"
        >
          Transportador
          <select
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            name="transportador"
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Elija una Opción
            </option>
            {listaTransportadores.map((el) => {
              return (
                <option key={nanoid()} value={el.name}>{`${el.name}`}</option>
              );
            })}
          </select>
        </label>

        <label className="flex flex-col py-2 text-gray-800" htmlFor="sede">
          Sede
          <select
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            name="sede"
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Elija una Opción
            </option>
            {sedes.map((el) => {
              return (
                <option
                  key={nanoid()}
                  value={el.nombre}
                >{`${el.nombre}`}</option>
              );
            })}
          </select>
        </label>

        {}

        <button
          type="submit"
          className="col-span-2 py-3 fondo1 font-bold  text-gray-300 p-2 rounded-full shadow-md hover:bg-black"
        >
          Crear Pedido
        </button>
      </form>
    </div>
  );
};

export default Pedidos;
