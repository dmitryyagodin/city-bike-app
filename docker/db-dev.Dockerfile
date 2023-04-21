# dump build stage
FROM postgres:15-alpine3.17 as dumper

COPY ../db/init.sql /docker-entrypoint-initdb.d/

RUN ["sed", "-i", "s/exec \"$@\"/echo \"skipping...\"/", "/usr/local/bin/docker-entrypoint.sh"]
RUN apk --no-cache add curl

ENV POSTGRES_DB=city-bikes
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV PGDATA=/data

COPY ../db/stations.csv /tmp/stations.csv
COPY ../db/2021-05.csv /tmp/2021-05.csv
COPY ../db/2021-06.csv /tmp/2021-06.csv
COPY ../db/2021-07.csv /tmp/2021-07.csv

RUN ["/usr/local/bin/docker-entrypoint.sh", "postgres"]

# final build stage
FROM postgres:15-alpine3.17

COPY --from=dumper /data $PGDATA