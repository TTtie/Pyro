FROM node:alpine

RUN apk add ffmpeg
COPY . /app
WORKDIR /app
RUN npm i

CMD ["node", "main.js"]