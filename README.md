# Reserve.me

> Restaurant reservation calendar component built on React, Node, and MySQL deployed to EC2.

## Related Projects

  - https://github.com/reserveMe/reviews-service
  - https://github.com/reserveMe/photo-carousel-service
  - https://github.com/reserveMe/menu-cards-service
  - https://github.com/reserveMe/reservation-calendar-proxy

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

- Run 'npm install'.
- Ensure mySQL is running.
- Run 'npm run schema' and enter in mySQL password to generate database and tables.
- Run 'npm run seed' to seed database with 100 entries in restaurants and reservations tables.
- Run 'npm run react-dev' to start webpack OR 'npm run react' for minified webpack bundle.
- Run 'npm run server-dev' to start Express server.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.1

## Development

### Installing Dependencies

From within the root directory:

npm install -g webpack
npm install

