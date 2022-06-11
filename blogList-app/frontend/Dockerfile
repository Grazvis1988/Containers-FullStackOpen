FROM node:16 AS front-build

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

FROM front-build AS test

CMD CI=true npm test
