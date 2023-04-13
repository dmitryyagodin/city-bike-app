'use client';

import type { NextPage } from 'next';
import { MapContainer, TileLayer, Marker, Popup, useMap, Rectangle} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useEffect, useState } from 'react';
import calculateMapBounds from 'src/lib/calculateMapBounds';
import { LatLngBounds } from 'leaflet';

type Props = {
  stations: Station[] | [];
  bounds: LatLngBounds;
};

const OpenStreetMap: NextPage<Props> = ({ stations }) => {
  const bounds = calculateMapBounds(stations);
  const [mapBounds, setMapBounds] = useState(bounds);
  const [center, setCenter] = useState(bounds.getCenter());

 
  function SetBounds() {
    const map = useMap();
    map.fitBounds(mapBounds);
    return <Rectangle bounds={mapBounds}></Rectangle>;
  }


  useEffect(() => {
    setMapBounds(calculateMapBounds(stations));

  }, [stations]);

  return (
    <MapContainer
      bounds= {mapBounds}
      // center={center}
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '100vw' }}
      >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        {stations.map((station) => {
          return (
            <Marker position={[station.latitude, station.longitude]} key={station.station_id}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          );
        })}
        <SetBounds />
    </MapContainer>
  );
};

export default OpenStreetMap;
