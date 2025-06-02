# Market Master Backend

<p align="center">
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

A backend service built with [NestJS](https://nestjs.com/) for a trading platform. This service provides order management, backtesting, authentication, and user profile functionalities.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [License](#license)

## Description

This is the backend component of a trading application called **Market Master**. It manages orders, profiles, authentication, and backtesting functionality using NestJS, Prisma ORM, Redis, and PostgreSQL.

It supports both real-time trading and simulation (practise) modes, allowing users to test strategies without risking real money.

## Features

- JWT-based authentication system
- User registration and profile management
- Order creation, listing, and closing
- Backtesting module with Redis caching
- Support for different operation modes: `Practise` and `Blindbox`
- Big number precision handling using `big.js`
- Snowflake ID generation for unique order IDs

## Installation

```bash
# Install dependencies
$ npm install
```

Ensure you have a `.env` file configured with your database connection string and JWT secrets.

Example `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
JWT_SECRET="your_jwt_secret"
JWT_ACCESS_EXPIRATION="1h"
JWT_REFRESH_EXPIRATION="7d"
```

Run Prisma migration:

```bash
$ npx prisma migrate dev --name init
```

## Running the App

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Project Structure

The project follows a modular structure based on NestJS best practices:

```
src/
├── auth/               # Authentication module
├── users/              # User management
├── orders/             # Order management (create, list, close)
├── back-test/          # Backtesting functionality
├── k-line/             # K-line data and symbol management
├── prisma/             # Prisma ORM integration
├── redis/              # Redis cache utilities
├── profile/            # User profile management
└── main.ts             # Entry point
```

## Dependencies

### Core Dependencies

- [`@nestjs/core`](https://docs.nestjs.com/)
- [`@nestjs/common`](https://docs.nestjs.com/)
- [`@nestjs/jwt`](https://docs.nestjs.com/security/authentication)
- [`prisma`](https://www.prisma.io/)
- [`@prisma/client`](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client)
- [`ioredis`](https://github.com/luin/ioredis)
- [`big.js`](https://github.com/MikeMcl/big.js)

### Dev Dependencies

- Jest for testing
- Eslint & Prettier for code formatting and linting
- TypeScript

See full dependency list in `package.json`.

## License

Nest is [MIT licensed](LICENSE).
