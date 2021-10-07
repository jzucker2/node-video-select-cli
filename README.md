# node-ps5-actor

## Integration Guide

Sparse info but something here: https://github.com/dhleong/playactor/discussions/22

## Basic Testing

```
npm start

curl -X POST localhost:3131/video-select/denon/10.0.1.101 -H 'Content-Type: application/json' -d '{"mode":"DVD"}'
{"video-select-mode":"DVD"}

curl http://localhost:5454/playactor/ps5/10.0.0.1
{"video-select-mode":"CBL/SAT"}
```

## Docker instructions

Mostly based off:
https://www.bogotobogo.com/DevOps/Docker/Docker-React-App.php


```
docker build -t node-ps5-actor:latest .
docker run -p 3131:3131 node-ps5-actor

docker run -it --rm \
-v ${PWD}:/app \
-v /app/node_modules \
-p 5454:5454 \
-e CHOKIDAR_USEPOLLING=true \
node-ps5-actor:latest 
```

Docker compose

```
# don't always need --build
docker-compose up -d --build
docker-compose ps
docker-compose logs node-ps5-actor
docker-compose exec -it node-ps5-actor /bin/sh
docker-compose stop
```
