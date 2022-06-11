FROM node:16 AS production

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm test


FROM production 

RUN npm run start:test

RUN npm run test:e2e


FROM production

CMD npm start
