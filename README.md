# node-video-select-cli

## Basic Testing

```
npm start

curl -X POST localhost:3131/video-select/denon/10.0.1.101 -H 'Content-Type: application/json' -d '{"mode":"DVD"}'
{"video-select-mode":"DVD"}

curl localhost:3131/video-select/denon/10.0.1.101
{"video-select-mode":"CBL/SAT"}
```

## Docker instructions

Mostly based off:
https://www.bogotobogo.com/DevOps/Docker/Docker-React-App.php


```
docker build -t node-video-select:latest .
docker run -p 3131:3131 node-video-select

docker run -it --rm \
-v ${PWD}:/app \
-v /app/node_modules \
-p 3000:3000 \
-e CHOKIDAR_USEPOLLING=true \
node-video-select:latest 
```

Docker compose

```
# don't always need --build
docker-compose up -d --build
docker-compose ps
docker-compose logs node-video-select
docker-compose exec -it node-video-select /bin/sh
docker-compose stop
```
