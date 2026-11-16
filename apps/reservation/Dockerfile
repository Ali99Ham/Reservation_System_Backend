# Build Stage
FROM node:22-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build reservations


# Production Stage
FROM node:22-alpine AS production

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/reservations/main.js"]