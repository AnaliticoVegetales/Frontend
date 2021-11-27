import React from "react";
import { useState} from 'react';
import { Auth0Provider } from "@auth0/auth0-react";

//Layouts
import PrivateLayout from './layouts/PrivateLayout';
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';

//Pages
import Index from './pages/Index';
import Perfil from './pages/admin/Perfil';
import Productos from './pages/admin/Productos';
import Pedidos from './pages/admin/Pedidos';
import Usuarios from './pages/admin/Usuarios';
import Error404 from "pages/auth/Error404";


//Styles
import './styles/styles.css'

//Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserContext } from "context/userContext";





function App() {
  const [userData, setUserData] = useState({});
  return (
    <Auth0Provider
      domain='analitico-vegetales.us.auth0.com'
      clientId='IZkpsqvoTM4kxJM9010Zc8IIh4HdO3Jq'
      redirectUri="http://localhost:3000/admin"
      audience='autenticacion-analitico-vegetales'>

      <div className='App'>
        
      <UserContext.Provider value={{ userData, setUserData }}>

        <Router>
          <Switch>
            
            <Route path={['/admin', '/admin/productos', '/admin/usuarios' ]}>
              <PrivateLayout>
                <Switch>
                  <Route path='/admin/productos'>
                    <Productos/>
                  </Route>  
                  <Route path='/admin/pedidos'>
                    <Pedidos/>
                  </Route>
                  <Route path='/admin/usuarios'>
                    <Usuarios/>
                  </Route>
                  <Route path='/admin'>
                    <Perfil/>
                  </Route>
                </Switch>
              </PrivateLayout>
            </Route>
            
            <Route exact path={['/']}>
              <PublicLayout>
                <Route exact path='/'>
                  <Index />
                </Route>
              </PublicLayout>
            </Route>
            
            <Route path={['*']}>
              <AuthLayout>
                <Route path='*'>
                  <Error404/>
                </Route>
              </AuthLayout>
            </Route>

          </Switch>
        </Router>
      </UserContext.Provider>

      </div>

  </Auth0Provider>
  );
}

export default App;
              