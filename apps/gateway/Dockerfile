FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY tsconfig.json nest-cli.json ./

RUN npm ci

COPY apps/gateway apps/gateway
COPY libs libs

RUN cd apps/gateway && npm install 

RUN npm run build -- gateway

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY apps/gateway/package.json apps/gateway/package.json

RUN npm ci --omit=dev

COPY --from=development /usr/src/app/dist ./dist

COPY proto proto

CMD ["node", "dist/apps/gateway/main"]