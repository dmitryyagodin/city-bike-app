FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY next.config.js ./next.config.js
COPY tsconfig.json ./tsconfig.json

COPY prisma ./prisma
COPY public ./public
COPY src ./src
RUN npx prisma generate
CMD ["npm", "run", "dev"]