FROM node:21-alpine3.17

RUN mkdir /my_app

COPY index.js /my_app

COPY package.json /my_app

COPY .env /my_app

COPY firebase.js /my_app

COPY myfirebase.json /my_app

WORKDIR /my_app

RUN apk --no-cache add --virtual build-deps build-base python3

RUN npm install

EXPOSE 3026

CMD node index.js