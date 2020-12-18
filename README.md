# ADR API

ADR Api is a node.js backend for storing/managing Architectural Decision Records (ADRs).

## Stack

- postgres
- node
- typeorm
- typescript
- type-graphql
- apollo-sever

## System Requirements

- MacOS
- Node >= 10

## Getting Started

1. Clone the repo
2. Install system dependencies: `brew bundle`
3. Create a .env file with the following values:
   - POSTGRES_DB=adr
   - POSTGRES_USER=app
   - POSTGRES_PASSWORD
4. Start up docker desktop: `open -a Docker`
5. Start the dev DB container: `docker-compose up -D db`
6. Run migrations: `npx ts-node ./node_modules/.bin/typeorm migration:run`
