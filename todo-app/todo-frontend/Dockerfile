FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV REACT_APP_BACKEND_URL="http://localhost:8080/api/"

RUN npm run build


FROM build-stage AS test

RUN CI=true npm test


FROM nginx

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
