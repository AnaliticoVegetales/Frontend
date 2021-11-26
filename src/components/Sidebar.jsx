import React from 'react';
import Logo from '../media/logo.png';
import { Link} from 'react-router-dom';
// import PrivateComponent from 'components/PrivateComponent';

const Sidebar = () => {
  
  return (
    <div className="min-h-screen flex flex-row fondo1  text-gray-300">
      <div className="flex flex-col w-64 overflow-hidden">
        <div className="flex flex-col items-center justify-center h-20 ">
          <div ><img className="px-2 pt-40 mt-40 " src={Logo} alt="logo" width="120" /></div>
          
          <h1 className="text-xl  text-gray-200 font-bold mb-40 ">Analítico Vegetales</h1>
          
        </div>
        <ul className="flex flex-col py-10 mt-40 items-center content-center">
          <li>
            <Link to='/admin'>
              <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-500">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="fas fa-user"></i></span>
                <span className="text-sm font-medium">Perfil</span>
              </a>
            </Link> 
          </li>
          <li>
            {/* <PrivateComponent roleList={['Administrador']}> */}
              <Link to='/admin/clientes' >
                <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-500">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="fas fa-users"></i></span>
                  <span className="text-sm font-medium">Clientes</span>
                </a>
              </Link>
              {/* </PrivateComponent>   */}
          </li>
          <li>
          {/* <PrivateComponent roleList={['Administrador','Lider','Estudiante']}>   */}
            <Link to='/admin/empleados'>
                <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-500">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="fas fa-user-tie"></i></span>
                  <span className="text-sm font-medium">Empleados</span>
                </a>
            </Link>
          {/* </PrivateComponent>     */}
          </li>
          <li>
            {/* <PrivateComponent roleList={['Administrador','Lider','Estudiante']}> */} 
              <Link to='/admin'>
                <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-500">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="fa-shipping-fast"></i></span>
                  <span className="text-sm font-medium">Pedidos</span>
                </a>
              </Link>
              {/* </PrivateComponent> */}
          </li>

          <li>
          {/* <PrivateComponent roleList={['Administrador','Lider','Estudiante']}>   */}
            <Link to='/admin/usuarios'>
                <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-500">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="fas fa-user-tie"></i></span>
                  <span className="text-sm font-medium">Usuarios</span>
                </a>
            </Link>
          {/* </PrivateComponent>     */}
          </li>

          <li>
          {/* <PrivateComponent roleList={['Administrador','Lider','Estudiante']}>   */}
            <Link to='/admin/productos'>
                <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-500">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="fas fa-user-tie"></i></span>
                  <span className="text-sm font-medium">Productos</span>
                </a>
            </Link>
          {/* </PrivateComponent>     */}
          </li>
          
          
    
          
          <li>
            <Link to='/'>
              <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-red-500 mt-10">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="bx bx-log-out"></i></span>
                <span className="text-sm font-medium">Cerrar Sesión</span>
              </a>
            </Link>
          </li>
            
            
        </ul>
      </div>
    </div>
      
  );
};

export default Sidebar;
