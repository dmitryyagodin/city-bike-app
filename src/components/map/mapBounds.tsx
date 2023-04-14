import { LatLngBounds } from 'leaflet';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import MapMarker from './mapMarker';
import { useMap } from 'react-leaflet';

type Props = {
  stations: Station[] | [];
  hovered: number;
};

const getBounds = (stations: Station[]) => {
  return new LatLngBounds(
    stations.map((station) => {
      return [Number(station.latitude), Number(station.longitude)];
    })
  ).pad(0.1);
};

const MapBounds: NextPage<Props> = ({ stations, hovered }) => {
  const map = useMap();
  const [bounds, setBounds] = useState(getBounds(stations));

  useEffect(() => {
    if (stations.length) {
      const newBounds = getBounds(stations);
      setBounds(newBounds);
      map.fitBounds(newBounds);
    }
  }, [map, stations]);

  if (!stations.length) {
    return null;
  }

  return (
    <>
      {stations.map((station) => (
        <MapMarker
          key={station.station_id}
          station={station}
          bounds={bounds}
          hovered={station.station_id === hovered}
        />
      ))}
      ;
    </>
  );
};

export default MapBounds;
