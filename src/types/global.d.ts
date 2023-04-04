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

  type Ride = {
    departureTime: Date | string;
    returnTime: Date | string;
    departure_station_id: number;
    departure_station_name: string;
    return_station_id: number;
    return_station_name: string;
    duration: number | string;
    distance: number;
    id: number;
  };

  type prisma = PrismaClient;
}
