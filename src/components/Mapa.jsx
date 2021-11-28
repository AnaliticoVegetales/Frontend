import React from 'react';
import '../styles/styles.css'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker} from 'react-leaflet'


const Mapa = () => {
  const position = [6.2443695,-75.651252]

  return (
    <div className="Map">
      <MapContainer className="Map-container"  center={position} zoom={13} scrollWheelZoom={true}>
    <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={position}>
  
  </Marker>
</MapContainer>
      
    </div>

  );

};

export default Mapa;