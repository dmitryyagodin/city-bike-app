# City-bike-app

## Quick start

Running the app requires docker and docker compose to be installed. 


1. Download the following data files
The data is owned by City Bike Finland. (see more about [License and information](https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902))

  - <https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv>
  - <https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv>
  - <https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv>
  - <https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv>

2. place them inside the ``db`` folder
    - 2021-05.csv
    - 2021-06.csv
    - 2021-07.csv
    - stations.csv (__rename the last file to exactly this name__)
3. Start docker containers with ``docker compose up -D``
4. Open browser on ``localhost:3000``
## Data import

npm install

docker compose up -d

Init prisma-schema
npx prisma init

Push database shemes to postgres:
npx prisma db push

Seed transformed data to the database
npx prisma db seed

Check types wihout compiling the code to js
tsc --noEmit

## Testing


```bash
# Start the app containers and exist after completing the cypress tests
docker-compose up --exit-code-from cypress
```

Read more:
[E2E testing in Next.js with Cypress and TypeScript](https://blog.logrocket.com/end-to-end-testing-next-js-apps-cypress-typescript/)