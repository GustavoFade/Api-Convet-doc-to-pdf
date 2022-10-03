FROM alpine:latest

WORKDIR /usr/appconverte
COPY package*.json ./
RUN apk add nodejs npm

RUN npm install && apk update && apk add libreoffice

COPY . .
EXPOSE 80
CMD [ "npm", "run", "dev"]