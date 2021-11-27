
// import React, { useEffect, useState } from 'react';
// import Sidebar from 'components/Sidebar';
// import { useAuth0 } from '@auth0/auth0-react';
// import ReactLoading from 'react-loading';
// import { obtenerDatosUsuario } from 'utils/api';
// import { useUser } from 'context/userContext';
// import AuthLayout from './AuthLayout'; 

// const PrivateLayout = ({ children }) => {
//    const { isAuthenticated, isLoading, getAccessTokenSilently, logout } =
//      useAuth0();
//    const [loadingUserInformation, setLoadingUserInformation] = useState(false);
//    const { setUserData } = useUser();

//    useEffect(() => {
//      const fetchAuth0Token = async () => {
      
//         // 1. pedir token a auth0
//       setLoadingUserInformation(true);
//       const accessToken = await getAccessTokenSilently({
//         audience: `autenticacion-focus-tech`,
//       });
//       // 2. recibir token de auth0
//       localStorage.setItem('token', accessToken);
//       console.log(accessToken);
//       // 3. enviarle el token a el backend
//       await obtenerDatosUsuario(
//         (response) => {
//           console.log('response con datos del usuario', response);
//           setUserData(response.data);
//           setLoadingUserInformation(false);
//         },
//         (err) => {
//           console.log('err', err);
//           setLoadingUserInformation(false);
//           logout({ returnTo: 'https://polar-anchorage-11845.herokuapp.com/' });
//         }
//       );     
//     };    
//     if (isAuthenticated) {
//       fetchAuth0Token();
//     }
//   }, [isAuthenticated, getAccessTokenSilently, logout, setUserData]);

//    if (isLoading || loadingUserInformation)
//      return <div><h1 className='text-3xl font-extrabold py-4'>Cargando...</h1><ReactLoading type='spin' color='#11172d' height={467} width={175} /></div>;

//    if (!isAuthenticated) {
//      return <div>
//        <AuthLayout>
//        <div className='flex flex-col justify-center pt-40  w-full py-4 text-center font-bold'>
//          <div className="pb-6 text-6xl text-red-600">
//            <h1>ERROR DE AUTENTICACIÓN</h1>
//          </div>
//          <div className="text-3xl text-white">
//            <h2> No Puedes Acceder A Este Sitio</h2>
//            <h2>Sin Autenticarte Primero.</h2>
//          </div>
//        </div>
//      </AuthLayout>
//    </div>;
//    }

//    return (
//      <div className='flex w-screen h-screen'>
//        <div className='flex flex-col lg:flex-row flex-nowrap h-full w-full'>
//          <Sidebar />
//          <main className='flex w-full  overflow-y-scroll items-center justify-center'>
//            {children}
//          </main>
//        </div>
//      </div>
//    );
//  };

// export default PrivateLayout;

import React from 'react';
import Sidebar from '../components/Sidebar';
import PrivateRoute from 'components/PrivateRoute';

const PrivateLayout = ({ children }) => {
  return (
    <PrivateRoute>
      <div className='flex w-screen h-screen'>
        <div className='flex flex-nowrap h-full w-full'>
          <Sidebar />
          <main className='flex w-full  overflow-auto items-center justify-center pr-0 '>
            {children}
          </main>
        </div>
      </div>
    </PrivateRoute> 
  );
};

export default PrivateLayout;
