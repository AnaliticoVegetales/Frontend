import React from "react";
import { useState} from 'react';
import { Auth0Provider } from "@auth0/auth0-react";

//Layouts
import PrivateLayout from './layouts/PrivateLayout';
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';

//Pages
import Index from './pages/index';
import Perfil from './pages/admin/Perfil';
import Clientes from './pages/admin/Clientes';
import Empleados from './pages/admin/Empleados';
import Usuarios from './pages/admin/Usuarios';
import Error404 from "pages/Error404";
import Productos from './pages/admin/Producto';


//Styles
import './styles/styles.css'

//Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContext } from "context/userContext";





function App() {
  const [userData, setUserData] = useState({});
  return (
    <Auth0Provider
      domain="ezequiellr.us.auth0.com"
      clientId="0b1BbovaR2Sm4kaPTWwnNgr13Fayd0fV"
      redirectUri="https://focus-tech.herokuapp.com/admin"
      audience='autenticacion-focus-tech'>

      <div className='App'>
        
      <UserContext.Provider value={{ userData, setUserData }}>

      <Router>

        <Routes>

          <Route exact path='/' element={<PublicLayout/>}>
            <Route path='' element={<Index/>} />
          </Route>

          <Route path='/admin' element={<PrivateLayout/>}>
            <Route path='' element={<Perfil/>}/>
            <Route path='clientes' element={<Clientes/>}/>
            <Route path='empleados' element={<Empleados/>}/>
            <Route path='usuarios' element={<Usuarios/>}/>
            <Route path='productos' element={<Productos/>}/>

          </Route>

          <Route path='*' element={<Error404/>}/>
            
        </Routes>

      </Router>
        
      </UserContext.Provider>

      </div>

  </Auth0Provider>
  );
}

export default App;
              