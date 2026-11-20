FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY tsconfig.json nest-cli.json ./

RUN npm ci

COPY apps/reservation apps/reservation
COPY libs libs

RUN cd apps/reservation && npm install 

RUN npm run build -- reservation

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/reservation/main"]