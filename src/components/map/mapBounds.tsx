import { LatLngBounds } from 'leaflet';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import MapMarker from './mapMarker';
import { useMap } from 'react-leaflet';

type Props = {
  stations: Station[] | [];
};

const getBounds = (stations: Station[] | []) => {
  if (!stations.length) {
    return null;
  }
  return new LatLngBounds(
    stations.map((station) => {
      return [Number(station.latitude), Number(station.longitude)];
    })
    ).pad(0.1);
};

const MapBounds: NextPage<Props> = ({ stations }) => {
  const map = useMap();
  const [bounds, setBounds] = useState(getBounds(stations));

  useEffect(() => {
    if (stations.length) {
      const newBounds = getBounds(stations);
      if (newBounds) {
        setBounds(newBounds);
        map.fitBounds(newBounds);
      }
    }
  }, [map, stations]);

  if (!stations.length) {
    return null;
  }

  return (
    <>
      {bounds &&
        stations.map((station) => (
          <MapMarker key={station.station_id} station={station} bounds={bounds} />
        ))}
      ;
    </>
  );
};

export default MapBounds;
