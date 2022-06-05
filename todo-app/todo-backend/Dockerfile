FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

USER node 

ENV MONGO_URL="mongodb://the_username:the_password@localhost:3456/the_database"
ENV REDIS_URL="//localhost:6378"

CMD npm start
