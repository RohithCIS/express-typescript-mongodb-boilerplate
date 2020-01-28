FROM node:alpine

WORKDIR /var/www/template-container

COPY . /var/www/template-container

RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm install

EXPOSE 3001

CMD [ "node", "build/app.js" ]
