import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../media/logo.png';


const NavBar = () => {
  return (

  <div className="fondo1 mt-0 ml-0 mr-2 text-center w-full"> 

    <nav className="flex items-center justify-between flex-wrap fondo1 font-bold w-100">
                  
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img className="fill-current ml-2 w-6 items-center" src={logo} alt="logo" />
        <span className="fuente text-xl p-2 m-2 tracking-tight">Analitico Vegetales</span>
      </div>
      
      <div id='menu' className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
            <a href="#inicio" className="block mt-4 lg:inline-block lg:mt-0 transform hover:translate-y-1 transition-transform ease-in duration-200 text-gray-100 hover:text-gray-400 m-2 p-2">Inicio</a>
            <a href="#proyectos" className="block mt-4 lg:inline-block lg:mt-0 transform hover:translate-y-1 transition-transform ease-in duration-200 text-gray-100 hover:text-gray-400 m-2 p-2">Productos</a>
            <a href="#equipo" className="block mt-4 lg:inline-block lg:mt-0 transform hover:translate-y-1 transition-transform ease-in duration-200 text-gray-100 hover:text-gray-400 m-2 p-2">Equipo</a>
            <a href="#contacto" className="block mt-4 lg:inline-block lg:mt-0 transform hover:translate-y-1 transition-transform ease-in duration-200 text-gray-100 hover:text-gray-400 m-2 p-2">Contacto</a>
        </div>

        <div>
          <Link to='/admin'>
            <a href="#" className="inline-block items-center transform hover:translate-y-1 transition-transform ease-in duration-200 hover:bg-gray-600 text-white px-3 py-2 rounded-md text-sm font-mediump-2 m-2  ring-2 ring-gray-400"><i class="fas fa-sign-in-alt w-6"></i>Acceder</a>
          </Link>
        </div>
            
      </div>

    </nav>

  </div>
    )
}

export default NavBar
