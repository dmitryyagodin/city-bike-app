FROM node:16-alpine

WORKDIR /app
ENV DATABASE_URL ${{secrets.DATABASE_URL}}

COPY . .

RUN npm ci --only=production

COPY next.config.js ./next.config.js
COPY tsconfig.json ./tsconfig.json

COPY prisma ./prisma
COPY public ./public
COPY src ./src
RUN npx prisma generate
RUN npm run build
CMD ["npm", "start"]