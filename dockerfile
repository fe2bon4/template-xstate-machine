FROM node:12-slim

RUN apt-get update;
RUN apt-get install git;

WORKDIR /var/app
COPY ./package.json /var/app/package.json
COPY ./package-lock.json /var/app/package-lock.json
RUN npm install --silent
COPY ./ /var/app/
RUN tsc

CMD npm start