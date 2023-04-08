export default function formatTopConnections(connections: TopConnectionRaw[]) {
  const topReturns = [];
  const topDepartures = [];

  connections.forEach((ride) => {
    if (ride.currentStationId === ride.returnStationId) {
      topReturns.push({
        rank: ride.departureRank,
        stationId: ride.departureStationId,
        stationName: ride.departureStationName,
        count: ride.departureCount,
      });
    } else if (ride.currentStationId === ride.departureStationId) {
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
