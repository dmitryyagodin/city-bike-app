
import type { NextPage } from 'next';
import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-defaulticon-compatibility";


type Props = {
  stations: Station[];
};

const Map: NextPage<Props> = ({stations}) => {
  return (
    <MapContainer center={[60.2211, 24.9392]} zoom={12} scrollWheelZoom={true} style={{height: "100vh", width: "100vw"}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
      stations.map(station => {
      return (
      <Marker position={[station.latitude, station.longitude]} key={station.station_id}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      );
    })
      
    }
    </MapContainer>
  );
};

export default Map;