-- DROP DATABASE IF EXISTS opentable;
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS restaurants;

-- CREATE DATABASE openTable;

-- USE openTable;

/* Create other tables and define schemas for them here! */

CREATE TABLE restaurants (
  id SERIAL,
  name varchar(40) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE reservations (
  id SERIAL,
  restaurantID int NOT NULL,
  date varchar(6) NOT NULL,
  time varchar(4) NOT NULL,
  party varchar(2) NOT NULL,
  PRIMARY KEY (id)
);

-- INSERT INTO restaurants (restaurantName) VALUES ('The Saratoga');
-- INSERT INTO reservations (restaurantID, dateToReserve, timeToReserve, partySize) VALUES (1, '021319', '1530', '4');
-- INSERT INTO reservations (restaurantID, dateToReserve, timeToReserve, partySize) VALUES (1, '021319', '1230', '2');

/*  Execute this file from the command line by typing:
 *    mysql -u root -p < server/schema.sql
 *  to create the database and the tables.*/

