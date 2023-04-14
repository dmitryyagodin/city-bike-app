import { LatLngBounds, divIcon } from 'leaflet';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import StyledBikeIcon from './icon';
import { renderToString } from 'react-dom/server';

type Props = {
  station: Station;
  bounds: LatLngBounds;
  hovered: boolean;
};

const MapMarker: NextPage<Props> = ({ station, bounds, hovered }) => {
  const map = useMap();
  const center = bounds.getCenter();

  const icon = divIcon({
    className: 'custom icon',
    html: renderToString(<StyledBikeIcon active={hovered} />),
    iconSize: [64, 64],
    iconAnchor: [32, 64],
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
      },
    }),
    [map, station, center]
  );

  // const markerRef = useRef(null);

  useEffect(() => {
    console.log(hovered);
  }, [hovered]);

  return (
    <Marker
      // ref={markerRef}
      eventHandlers={eventHandlers}
      position={[station.latitude, station.longitude]}
      icon={icon}
    >
      <Popup>
        <Link href={`stations/${station.station_id}`}>
          <h3>{station.station_name}</h3>
        </Link>
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
