import { LatLngBounds, divIcon } from 'leaflet';
import type { NextPage } from 'next';
import { useContext, useMemo } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import BikeIcon from './icon';
import { renderToString } from 'react-dom/server';
import { StationContext } from 'src/context/stationContext';
import Link from 'next/link';

type Props = {
  station: Station;
  bounds: LatLngBounds;
};

const MapMarker: NextPage<Props> = ({ station, bounds }) => {
  const { activeStation, setActiveStation } = useContext(StationContext);
  const thisIsActive = activeStation === station.station_id;

  const map = useMap();
  // const center = bounds.getCenter();

  const icon = divIcon({
    className: `custom-icon ${thisIsActive ? 'active' : 'custom icon'}`,
    html: renderToString(<BikeIcon />),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const eventHandlers = useMemo(
    () => ({
      click: () => {
        setActiveStation(station.station_id);
        map.flyTo([station.latitude, station.longitude], 16, {
          animate: true,
          duration: 1,
        });
      },
      // popupclose: () => {
      //   map.flyTo(center, 12, {
      //     animate: true,
      //     duration: 1,
      //   });
      // },
      mouseover: () => {
        setActiveStation(station.station_id);
      },
      mouseout: () => {
        setActiveStation(0);
      },
    }),
    [map, station, setActiveStation]
  );

  return (
    <Marker
      eventHandlers={eventHandlers}
      position={[station.latitude, station.longitude]}
      icon={icon}
    >
      <Popup>
        <h3>{station.station_name}</h3>
        <p>
          Address: <strong>{station.station_address}</strong>
          <br />
          Capacity: <strong>{station.capacity}</strong>
        </p>
        <Link href={`stations/${station.station_id}`}>To station page</Link>
      </Popup>
    </Marker>
  );
};
export default MapMarker;
