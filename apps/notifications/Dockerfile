FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY tsconfig.json nest-cli.json ./

RUN npm ci

COPY apps/notifications apps/notifications
COPY libs libs

RUN cd apps/notifications && npm install 

RUN npm run build -- notifications

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY apps/notifications/package.json apps/notifications/package.json

RUN npm ci --omit=dev

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/notifications/main"]