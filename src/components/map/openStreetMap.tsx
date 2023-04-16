import type { NextPage } from 'next';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import MapBoundsByStations from './mapBounds';

type Props = {
  stations: Station[] | [];
};

const OpenStreetMap: NextPage<Props> = ({ stations }) => {
  return (
    <MapContainer scrollWheelZoom={true} style={{ height: '50vh', width: '50vw' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapBoundsByStations stations={stations} />
    </MapContainer>
  );
};
export default OpenStreetMap;
