import React from "react";
import { useState} from 'react';
import { Auth0Provider } from "@auth0/auth0-react";

//Layouts
import PrivateLayout from './layouts/PrivateLayout';
import PublicLayout from './layouts/PublicLayout';

//Pages
import Index from './pages/index';
import Perfil from './pages/admin/Perfil';
import Clientes from './pages/admin/Clientes';
import Empleados from './pages/admin/Empleados';
import Error404 from "pages/Error404";


//Styles
import './styles/styles.css'

//Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContext } from "context/userContext";

function App() {
  const [userData, setUserData] = useState({});
  return (
    <Auth0Provider
      domain='analitico-vegetales.us.auth0.com'
      clientId='IZkpsqvoTM4kxJM9010Zc8IIh4HdO3Jq'
      redirectUri={window.location.origin}>

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
              