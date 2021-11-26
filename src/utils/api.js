import axios from 'axios';


const baseURL = 'http://localhost:5000';
const getToken = () => {
  return `Bearer ${localStorage.getItem('token')}`;
};

export const obtenerProductos = async (setProductos, setEjecutarConsulta) => {
  const options = { method: 'GET', url: 'http://localhost:5000/productos/' };
  await axios
    .request(options)
    .then(function (response) {
      setProductos(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setEjecutarConsulta(false);
};

export const obtenerUsuarios = async (setUsuarios, setEjecutarConsulta) => {
  const options = { method: 'GET', url: 'http://localhost:5000/usuarios/' };
  await axios
    .request(options)
    .then(function (response) {
      setUsuarios(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setEjecutarConsulta(false);
};

export const obtenerDatosUsuario = async (successCallback, errorCallback) => {
  const options = {
    method: 'GET',
    url: `${baseURL}/usuarios/self/`,
    headers: {
      Authorization: getToken(), 
      // Enviarle el token a backend
    },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};


export const crearUsuario = async(data,successCallback,errorCallback)=>{
  const options = {
    method: 'POST',
    url: 'http://localhost:5000/usuarios/',
    headers: {  Authorization: getToken(),'Content-Type': 'application/json',
   },data,
  }
  await axios
    .request(options)
    .then(
      successCallback
    )
    .catch(
     errorCallback
    );

};