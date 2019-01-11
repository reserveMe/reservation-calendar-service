# Reserve.me

> An implementation of a React calendar and reservation component based on OpenTable's Reservation component.

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

> Run 'npm install'.
> Ensure mySQL is running.
> Run 'npm run schema' and enter in mySQL password to generate database and tables.
> Run 'npm run seed' to seed database with 100 entries in restaurants and reservations tables.
> Run 'npm run react-dev' to start webpack.
> Run 'npm run server-dev' to start Express server.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.1

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
### Routes
Create
app.post('/restaurant/:id')
  This would be used to create a reservation. This route would need to look up the restaurant in the DB by ID, check if the reservation is valid and then post the reservation. To safeguard against datatype I would do data type assertions here.
  
Update
 app.patch('/restaurant/:id')
 This would need to pass in query strings to specifiy which record to update
 This route would be used to update a reservation. The front end has no way to do this as of now but this would be the equivalent action of changing your reservation time
 
Read All
  app.get('/restaurant/:id')
  
  This route would be used to read all the reservations of a single restaurant for all dates
Read One
  app.get('restaurant/:id=?date')
  
   This route, while the end point may not be exactly correct, this would return all the reservations for a certain restaurant at a certain date.

Delete
  app.delete('restaurant/:id')
  
  This route would need to pass in a query string in the request to specify which record to update
  
  This route would be used to delete a specific reservation at a specific restaurant. It will need to find one record with the specified date and time.
