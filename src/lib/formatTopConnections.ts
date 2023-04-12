export default function formatTopConnections(connections: TopConnectionRaw[]) {
  const topReturns: TopConnection[] = [];
  const topDepartures: TopConnection[] = [];

  connections.forEach((ride) => {
    if (
      ride.currentStationId === ride.returnStationId &&
      ride.departureRank < 6
    ) {
      topReturns.push({
        rank: ride.departureRank,
        stationId: ride.departureStationId,
        stationName: ride.departureStationName,
        count: ride.departureCount,
      });
    }

    if (
      ride.currentStationId === ride.departureStationId &&
      ride.returnRank < 6
    ) {
      topDepartures.push({
        rank: ride.returnRank,
        stationId: ride.returnStationId,
        stationName: ride.returnStationName,
        count: ride.returnCount,
      });
    }
  });

  topReturns.sort((a, b) => a.rank - b.rank);
  topDepartures.sort((a, b) => a.rank - b.rank);

  return { topReturns, topDepartures };
}
