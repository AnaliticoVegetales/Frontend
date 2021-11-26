import React from 'react';
import MinTic from '../media/logoMinTic.png'

const Footer = () => {
  return <div>
    <footer>
        <div className="flex flex-col sm:flex-row  justify-center items-center content-center fondo1  text-white w-full h-16 sm:h22 font-thin border-solid">
            <a 
              href="https://www.misiontic2022.gov.co/portal/" 
              className="mx-11 transform hover:translate-y-1 transition-transform ease-in duration-200">
                <img class="fill-current ml-2 w-14 items-center " src={MinTic} alt="MinTic logo" /></a>
            <a href="https://github.com/AnaliticoVegetales/" className="transform hover:translate-y-1 transition-transform ease-in duration-200 mx-11"><i class="fab fa-github w-6"></i>Equipo 5.</a>
            <a href="https://script.google.com/macros/s/AKfycbw1KPf0dKWupqnMXCegOlkVoaC-FHpuKOIuYasDpx1wr0iaHXO6oSvWHJfoDmn9H5c/exec" className="transform hover:translate-y-1 transition-transform ease-in duration-200 mx-11 font-bold">&copy; Hackathon 2021</a>
        </div>
    </footer>
  </div>;
};

export default Footer;
