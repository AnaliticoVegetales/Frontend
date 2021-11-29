import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { crearMensaje} from 'utils/api';
import 'react-toastify/dist/ReactToastify.css';

const FormularioCreacionMensajes =()=>{
    const form = useRef(null);

    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
    
        const nuevoMensaje = {};
        fd.forEach((value, key) => {
          nuevoMensaje[key] = value;
        });
    
        await crearMensaje(
          {
            fecha: new Date.now,
            nombre: nuevoProducto.nombre,
            correo: nuevoProducto.correo,
            mensaje: nuevoProducto.mensaje,
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

};
export default FormularioCreacionMensajes;