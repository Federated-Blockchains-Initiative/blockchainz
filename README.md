# [Blockchain Example](http://158.37.63.52:8009/)

For ICA02 in the course IS-213, Open Source Software.

A task on Distributed Systems.

[Docker Image](https://hub.docker.com/r/mortea15/blockchainz/)

## How to get started

_You'll need Node.js if you haven't got it yet._


```sh
npm install
```

#### To Dockerize the server:

```sh
docker build -t mortea15/blockchainz .
```
and then
```sh
docker run -d --name blockchainz -e PORT=8009 -p 8009:8009 blockchainz-img:latest
```

#### To start the server without Docker:
```sh
NODE_ENV=dev nodejs --use_strict src/server.js
```
If you'd like to specify a port to use:
```sh
NODE_ENV=dev PORT=8020 nodejs --use_strict src/server.js
```
