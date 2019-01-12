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

-- For the sake of COPY speed, Foreign Key has been removed. Run the command :
-- ALTER TABLE reservations ADD CONSTRAINT constraint_fk FOREIGN KEY (restaurantid) REFERENCES restaurants ON DELETE CASCADE;
-- After COPY to re-create FK constraints.
CREATE TABLE reservations (
  id SERIAL,
  restaurantID int NOT NULL,
  date varchar(6) NOT NULL,
  time varchar(4) NOT NULL,
  party varchar(2) NOT NULL,
  PRIMARY KEY (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root -p < server/schema.sql
 *  to create the database and the tables.*/

