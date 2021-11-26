import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";

const RegistroP = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [textoBoton, setTextoBoton] = useState("Registrar nuevo producto");

  useEffect(() => {
    if (mostrarTabla) {
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton("Registrar nuevo Producto");
    } else {
      setTextoBoton("Lista de productos");
    }
  }, [mostrarTabla]);

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-700">
        Pagina de administración de productos
      </h2>
      {mostrarTabla ? (
        <TablaProductos />
      ) : (
        <FormularioCrecionProductos setMostrarTabla={setMostrarTabla} />
      )}

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

      <button
        type="button"
        onClick={() => setMostrarTabla(!mostrarTabla)}
        className="sm:auto mx-auto ml-8 whitespace-nowrap px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-900 hover:bg-indigo-700"
      >
        {textoBoton}
      </button>
    </div>
  );
};

const TablaProductos = ({}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Buscar"
        className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
      />
      {
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Id
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Producto
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Cantidad
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Valor
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Estado
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Editar/Eliminar
            </th>
          </thead>

          <tbody></tbody>
        </table>
      }
    </div>
  );
};

const FormularioCrecionProductos = ({setMostrarTabla}) => {
    setMostrarTabla(true);
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-extrabold text-gray-500 p-2">
        Registar nuevo producto
      </h2>

      <form ref={form} onSubmit={submitForm} className="grid grid-cols-3">
        <label htmlFor="id producto" className="flex flex-col">
          ID
          <input
            name="idProducto"
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            type="text"
          />
        </label>

        <label htmlFor="nombre producto" className="flex flex-col">
          Nombre Producto
          <input
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            type="text"
            name="Producto"
          />
        </label>

        <label htmlFor="estado producto" className="flex flex-col">
          Estado producto
          <select
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            name="Estado"
            defaultValue={0}
          >
            <option disabled value={0}>
              Seleccione una opción
            </option>
            <option>Disponible</option>
            <option>Agotado</option>
          </select>
        </label>

        <label htmlFor="valor" className="flex flex-col">
          Valor
          <input
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            type="number"
            min="0"
            name="Valor"
          />
        </label>

        <label htmlFor="cantidad" className="flex flex-col">
          Cantidad
          <input
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            type="number"
            min="0"
            name="Cantidad"
          />
        </label>

        <button
          type="submit"
          className="col-span-3 bg-indigo-400 p-2 rounded-full shadow-md hover:bg-indigo-600 text-white"
        >
          {" "}
          Registrar producto
        </button>
      </form>
    </div>
  );
};

export default RegistroP;
