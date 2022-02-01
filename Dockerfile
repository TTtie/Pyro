FROM node:current-alpine

RUN apk add git ffmpeg bash 

ENV HOME /app
COPY ./package.json /app/package.json
WORKDIR /app
RUN npm install --only=production
COPY . /app
USER nobody

CMD ["node", "main.js"]