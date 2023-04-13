import prisma from '@db';

export default async function getDateRange() {
  const dateRange = await prisma.$queryRaw`
      SELECT MIN(departure_time) AS "minDate", MAX(departure_time) AS "maxDate" FROM rides;`;

  return Array.isArray(dateRange) ? JSON.stringify(dateRange[0]) : '';
}
