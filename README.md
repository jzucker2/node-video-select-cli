# node-video-select-cli

## Basic Testing

```
npm start

curl -X POST localhost:3131/video-select/denon/10.0.1.101 -H 'Content-Type: application/json' -d '{"mode":"DVD"}'
{"video-select-mode":"DVD"}

curl localhost:3131/video-select/denon/10.0.1.101
{"video-select-mode":"CBL/SAT"}
```
