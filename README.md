# City-bike-app

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