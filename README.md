# Express TS MongoDB Boilerplate

This is a boilerplate for ExpressJS REST API in TypeScript with MongoDB.

## Style

- Async/Await instead of Promise Chaining
- Split folders for Controllers, Models and Middlewares.
- ES5 targeted TS
- Size 4 Tab Indent

## Setup

- [Click to use this Template](https://github.com/RohithCIS/express-typescript-mongodb-graphql-boilerplate/generate) and create a repository
- Clone it to your PC
- `cd project-foler` and run `npm install`

## Dev Server
- `npm run dev` to start Dev Server

## Deploy

- Edit `Dockerfile`, `docker-compose.yaml`, `dockerbuild.sh` and `package.json` scripts.
- Setup Traefik on Production server, copy the docker-compose.yaml and run `npm run deploy:update` to deploy the API