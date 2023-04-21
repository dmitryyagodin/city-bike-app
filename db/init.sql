CREATE TABLE
    IF NOT EXISTS "stations" (
        "FID" TEXT,
        "ID" INTEGER NOT NULL,
        "Nimi" TEXT,
        "Namn" TEXT,
        "Name" TEXT,
        "Osoite" TEXT,
        "Address" TEXT,
        "Kaupunki" TEXT,
        "Stad" TEXT,
        "Operaattor" TEXT,
        "Kapasiteet" INTEGER,
        "x" DECIMAL(10, 6),
        "y" DECIMAL(11, 6),
        CONSTRAINT "stations_pkey" PRIMARY KEY ("ID")
    );

CREATE TABLE
    IF NOT EXISTS "rides" (
        "Departure" TIMESTAMP(3) NOT NULL,
        "Return" TIMESTAMP(3) NOT NULL,
        "Departure station id" INTEGER NOT NULL,
        "Departure station name" TEXT NOT NULL,
        "Return station id" INTEGER NOT NULL,
        "Return station name" TEXT NOT NULL,
        "Covered distance (m)" DECIMAL(10,0) NOT NULL,
        "Duration (sec.)" INTEGER NOT NULL
    );

COPY stations
FROM
    '/tmp/stations.csv' CSV HEADER QUOTE '"' DELIMITER ',';

COPY rides
FROM
    '/tmp/2021-05.csv' CSV HEADER QUOTE '"' DELIMITER ','
WHERE
    "Covered distance (m)" >= 10    
    AND "Duration (sec.)" >= 10;

COPY rides
FROM
    '/tmp/2021-06.csv' CSV HEADER QUOTE '"' DELIMITER ','
WHERE
    "Covered distance (m)" >= 10    
    AND "Duration (sec.)" >= 10;

COPY rides
FROM
    '/tmp/2021-07.csv' CSV HEADER QUOTE '"' DELIMITER ','
WHERE
    "Covered distance (m)" >= 10    
    AND "Duration (sec.)" >= 10;

/*
 Rename column names on stations table
 */

ALTER TABLE "stations" RENAME "ID" TO "station_id";

ALTER TABLE "stations" RENAME "Nimi" TO "station_name";

ALTER TABLE "stations" RENAME "Osoite" TO "station_address";

ALTER TABLE "stations" RENAME "Kaupunki" TO "city";

ALTER TABLE "stations" RENAME "Kapasiteet" TO "capacity";

ALTER TABLE "stations" RENAME "x" TO "longitude";

ALTER TABLE "stations" RENAME "y" TO "latitude";

/*
 Rename column names on rides table
 */

ALTER TABLE "rides" RENAME "Departure" TO "departure_time";

ALTER TABLE "rides" RENAME "Return" TO "return_time";

ALTER TABLE
    "rides" RENAME "Departure station id" TO "departure_station_id";

ALTER TABLE
    "rides" RENAME "Departure station name" TO "departure_station_name";

ALTER TABLE
    "rides" RENAME "Return station id" TO "return_station_id";

ALTER TABLE
    "rides" RENAME "Return station name" TO "return_station_name";

ALTER TABLE "rides" RENAME "Covered distance (m)" TO "distance";

ALTER TABLE "rides" RENAME "Duration (sec.)" TO "duration";

ALTER TABLE "rides" ADD COLUMN "id" SERIAL PRIMARY KEY;

/*
 Remove those rides whose departure_station_id cannot be found in the stations table 
 */

DELETE FROM rides r
WHERE NOT EXISTS (
        SELECT
        FROM stations s
        WHERE
            r.departure_station_id = s.station_id
    );

/*
 Remove those rides whose return_station_id cannot be found in the stations table 
 */

DELETE FROM rides r
WHERE NOT EXISTS (
        SELECT
        FROM stations s
        WHERE
            r.return_station_id = s.station_id
    );

/*
 Delete duplicates - rows with similar values across all columns (highly unlikely situation)
 */

DELETE FROM rides
WHERE id IN (
        SELECT id
        FROM (
                SELECT
                    id,
                    ROW_NUMBER() OVER(
                        PARTITION BY departure_time,
                        return_time,
                        departure_station_id,
                        return_station_id,
                        distance
                        ORDER BY
                            id
                    ) AS row_num
                FROM rides
            ) t
        WHERE t.row_num > 1
    );

ALTER TABLE "rides"
ADD
    CONSTRAINT departure_station FOREIGN KEY("departure_station_id") REFERENCES stations("station_id") ON DELETE RESTRICT;

ALTER TABLE "rides"
ADD
    CONSTRAINT return_station FOREIGN KEY("return_station_id") REFERENCES stations("station_id") ON DELETE RESTRICT;

-- CreateIndex

CREATE UNIQUE INDEX "stations_id_key" ON "stations"("station_id");

-- CreateIndex

CREATE INDEX
    "rides_departure_station_id_idx" ON "rides"("departure_station_id");

-- CreateIndex

CREATE INDEX
    "rides_return_station_id_idx" ON "rides"("return_station_id");