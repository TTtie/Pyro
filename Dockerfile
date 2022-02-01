FROM node:alpine

RUN apk add git

ENV HOME /app
COPY ./package.json /app/package.json
WORKDIR /app
RUN apk add --no-cache --virtual .build-deps ffmpeg bash \
 && npm install --only=production \
 && apk del .build-deps
COPY . /app
USER nobody

CMD ["node", "main.js"]