import { LatLngBounds, LatLngTuple } from 'leaflet';

type Point = {
  minLong?: number;
  maxLat?: number;
  maxLong?: number;
  minLat?: number;
};

function calculateMapBounds(stations: Station[]): LatLngBounds | never {
  const coords: number[][] = stations.map((station) => [
    Number(station.longitude),
    Number(station.latitude),
  ]);

  const p1: Point = {};
  const p2: Point = {};

  coords.forEach((d) => {
    if (!p1.minLong || p1.minLong > Number(d[0])) {
      p1.minLong = Number(d[0]);
    }
    if (!p1.maxLat || p1.maxLat < Number(d[1])) {
      p1.maxLat = Number(d[1]);
    }
    if (!p2.maxLong || p2.maxLong < Number(d[0])) {
      p2.maxLong = Number(d[0]);
    }
    if (!p2.minLat || p2.minLat > Number(d[1])) {
      p2.minLat = Number(d[1]);
    }
  });

  if (p1.minLong && p1.maxLat && p2.maxLong && p2.minLat) {
    const NorthEast: LatLngTuple = [p1.minLong, p1.maxLat];
    const SouthWest: LatLngTuple = [p2.maxLong, p2.minLat];
    return new LatLngBounds([NorthEast, SouthWest]);
  } else {
    throw new Error('Map bounds calculation failed');
  }
}

export default calculateMapBounds;
