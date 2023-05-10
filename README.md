# City-bike-app
- See it running on GCP's cloud run [city-bikes-cloudrun](https://city-bikes-cloudrun-7cnpdfqijq-lz.a.run.app/).
- Database is hosted on GCP's compute engine virtual machine.
- Stack
  -  PostgreSQL (database)
  -  [Prisma](https://www.prisma.io/) for data fetching
  -  [Next.js](https://nextjs.org/) for server-side rendering, static page generation, React client components
  -  Typescript
  -  [Styled Components](https://styled-components.com/) for css styles
  -  [React-leaflet](https://react-leaflet.js.org/docs/start-setup/) for maps

## Requirements
- The app is built and run in docker containers (tested on docker version 20.10.23).
- A testing container is not fully isolated and also needs dependencies to be installed locally (works at least with `node v16.13.2 (npm v8.1.2)` and `v18.16.0 (npm v9.5.1)`

## To run locally

1. Clone this repo as
```bash
git clone git@github.com:dmitryyagodin/city-bike-app.git
```

2. Download the data files
The data is owned by City Bike Finland. (see more about [License and information](https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902))

  - <https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv>
  - <https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv>
  - <https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv>
  - <https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv>

3. Copy the files to the repo's `db` folder
> :warning: **Make sure that the file names are exactly as follows**: needed for correct database seeding

    - 2021-05.csv
    - 2021-06.csv
    - 2021-07.csv
    - stations.csv

4. Create `.env` file and add the following database url:
```bash
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/city-bikes
```
5. Install dependencies (while the app will have everything it needs inside its own docker container, testing  with Cypress doesn't have that yet)  
```
npm install
```
6. Build and Start docker containers
```
docker compose up
```
8. Open browser on `localhost:3000`

## Testing

Cypress E2E tests are launched automatically in separate container whenever `docker compose up` is run

Re-run the tests **anytime** while app and db containers are running with:

```bash
npm run test
```

## Deployment
GitHub Actions is used to automatically rebuild and deploy the app to the GCP's cloud run [city-bikes-cloudrun](https://city-bikes-cloudrun-7cnpdfqijq-lz.a.run.app/). See details in `.github/workflows/cloud-run.yml` file.

> :warning: **Database querying speed is not optimal**: since the database is hosted on GCP's free tier virtual machine with limited memory allocation, minimal CPU capacity and high latency. 

## Static Site Generation (SSG)

The app benefits from Next's in-build SSG features to pre-generate some of the pages statically and speed up initial load. For example, each station's page is served as static with initial stats.

## Data import

The raw data contains many duplicates - pairs of entries with the same departure and return timestamps, same departure and return stations, same distance - a highly unlikely scenario. These were eventually excluded along with the required minimim duration (10 sec) and distance (10 min).
