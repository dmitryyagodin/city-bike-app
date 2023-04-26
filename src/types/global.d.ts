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
        departureTime: string | Date;
        returnTime: string | Date;
        departureStationId: number;
        departureStationName: string;
        returnStationId: number;
        returnStationName: string;
        duration: string | number;
        distance: number;
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

    type RidesPaginationProps = {
      prevHref: string;
      nextPageNumber: number;
      totalPages: number;
      nextHref: string;
      shallow: boolean;
    };

    type DateFormatOptions = {
      day: '2-digit';
      month: 'short';
      weekday?: 'short';
      hour: 'numeric';
      minute: 'numeric';
      second?: 'numeric';
      hour12: true | false;
      hourCycle: 'h23';
    };

    type HandleFilterEventFunction = ({
        topConnections,
        station,
    }: {
        topConnections: TopConnectionRaw[];
        station: Station & StationStats;
    }) => void;

    type OrderBy = {
        departureTime?: 'asc' | 'desc';
        departureStation?: 'asc' | 'desc';
        distance?: 'asc' | 'desc';
        duration?: 'asc' | 'desc';
        returnStation?: 'asc' | 'desc';
        returnTime?: 'asc' | 'desc';
    };

    type WhereClause = {
        AND: AndClause[];
    };

    type AndClause = {
      departureStationName?: string;
      returnStationName?: string;
      distance?: {gte: number} | {lte: number};
      duration?: {gte: number} | {lte: number};
    };
      
    type SearchParams = {
        orderBy?: OrderBy;
        skip?: number;
        where?: WhereClause;
    };

    type RideQuery = {
        orderBy?: OrderBy[];
        skip?: number;
        where?: WhereClause
    };
}
