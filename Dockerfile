FROM docker.io/library/node:current-alpine

RUN apk add ffmpeg

ENV HOME /app
COPY ./package.json /app/package.json
WORKDIR /app
RUN apk add --no-cache --virtual .build-deps git bash && \
    npm install --omit=dev && \
    apk del .build-deps
COPY . /app
USER nobody

CMD ["node", "."]