FROM node:alpine

RUN apk add ffmpeg git
COPY . /app
WORKDIR /app
RUN npm i

CMD ["node", "main.js"]