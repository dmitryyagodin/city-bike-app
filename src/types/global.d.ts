import { PrismaClient } from '@prisma/client';
export {};

declare global {
  type Station = {
    station_id: number;
    station_name: string;
    station_address: string;
    capacity: number;
    longitude: string | Decimal;
    latitude: string | Decimal;
  };

  type StationStats = {
    departuresCount: number;
    returnsCount: number;
    averageReturnDistance: number;
    averageDepartureDistance: number;
  };

  type Ride = {
    departureTime: Date | string;
    returnTime: Date | string;
    departure_station_id: number;
    departure_station_name: string;
    return_station_id: number;
    return_station_name: string;
    duration: number | string;
    distance: number | Decimal;
    id: number;
  };

  type TopConnectionRaw = {
    departureStationId: number;
    returnStationId: number;
    departureStationName: string;
    returnStationName: string;
    returnCount: number;
    departureCount: number;
    departureRank: number;
    returnRank: number;
    currentStationId: number;
  };

  type TopConnection = {
    rank: number;
    stationId: number;
    stationName: string;
    count: number;
  };

  type prisma = PrismaClient;

  type PaginationProps = {
    prevHref: string;
    nextPageNumber: number;
    totalPages: string;
    nextHref: string;
  };

  type DateFormatOptions = {
    day: '2-digit';
    month: 'short';
    weekday: 'short';
    hour: 'numeric';
    minute: 'numeric';
    second: 'numeric';
    hour12: true | false;
    hourCycle: 'h23';
  };
}
