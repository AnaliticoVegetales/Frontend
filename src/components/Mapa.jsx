import React from 'react';
import '../styles/styles.css'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker} from 'react-leaflet'


const Mapa = ({sed,pedi,}) => {
  var lon = null
  var lat = null
  if (pedi.sede ==="Bogotá") {
    var lon = 4.6299325
    var lat = -74.1870014
 } if (pedi.sede ==="Barranquilla"){
  var lon = 10.9838099
  var lat = -74.8530371
 }
 if (pedi.sede ==="Buenaventura"){
  var lon = 3.8756618
  var lat = -77.0582216
 } if (pedi.sede ==="Arauca"){
  var lon = 6.5676499
  var lat = -71.4566415
 }if (pedi.sede ==="Medellín"){
  var lon = 6.2442023
  var lat = -75.616231
 }

  return (
    <div className="Map">
      <MapContainer className="Map-container"  center={[lon,lat]} zoom={13} scrollWheelZoom={true}>
    <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[lon,lat]}>
  
  </Marker>
</MapContainer>
      
    </div>

  );

};

export default Mapa;