import { LatLngBounds, divIcon } from 'leaflet';
import type { NextPage } from 'next';
import { useMemo } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import BikeIcon from './icon';
import { renderToString } from 'react-dom/server';

type Props = {
  station: Station;
  bounds: LatLngBounds;
  active: boolean;
};

const MapMarker: NextPage<Props> = ({ station, bounds, active }) => {
  const map = useMap();
  const center = bounds.getCenter();

  const icon = divIcon({
    className: `custom-icon ${active ? 'active' : 'custom icon'}`,
    html: renderToString(<BikeIcon />),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const eventHandlers = useMemo(
    () => ({
      click: () => {
        map.flyTo([station.latitude, station.longitude], 16, {
          animate: true,
          duration: 1,
        });
      },
      popupclose: () => {
        map.flyTo(center, 12, {
          animate: true,
          duration: 1,
        });
      }
    }),
    [map, station, center]
  );

  return (
    <Marker
      eventHandlers={eventHandlers}
      position={[station.latitude, station.longitude]}
      icon={icon}
      zIndexOffset={active ? 200 : 0}
    >
      <Popup>
        <h3>{station.station_name}</h3>
        <p>
          Address: <strong>{station.station_address}</strong>
          <br />
          Capacity: <strong>{station.capacity}</strong>
        </p>
      </Popup>
    </Marker>
  );
};
export default MapMarker;
