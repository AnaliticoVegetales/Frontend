import React from 'react';

//imagenes



const Index = () => {
  return <div>
  <body id="inicio" className="text-gray-800 antialiased">
    <main>

      {/* //BANNER */}
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center altura-cover">
        <div className="absolute top-0 w-full h-full bg-center bg-cover fondo-cover">
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-75 bg-black">
          </span>
        </div>
      
        <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    El Campo a tu Alcance.
                  </h1>
                  <p className="mt-4 text-lg text-gray-300">
                  En organizaciones del sector agro que cuentan con múltiples sitios de producción se requiere transportar productos entre los distintos sitios de producción a destinos externos. 
                  Este portal permite coordinar a todos los actores para que la entrega del producto sea exitosa considerando variables como hora de recogida, hora de entrega, responsables y registro de la operación. 
                  </p>
                </div>
              </div>
            </div>
        </div>

        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden svg1">
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0">
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100">
            </polygon>
          </svg>
        </div>

      </div>

      
    </main>
  </body>
  </div>;
};

export default Index;
