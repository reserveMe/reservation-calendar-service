/* eslint-disable no-console */
const faker = require('faker');
const moment = require('moment');
const fs = require('fs');

// ---------------------------- GENERATE DATA TO SEED ---------------------------- //
const generateName = () => `${faker.commerce.productAdjective()} ${faker.commerce.department()} ${faker.commerce.product()}`;

const generateDate = (daysToAdd) => {
  const startDate = moment();
  return startDate.add(daysToAdd, 'days').format('MMDDYY');
};
// between 10AM and 11PM
const generateTime = (i) => {
  if (i % 2) {
    return (Math.floor(Math.random() * (18 - 10) + 10) * 100)
      + (Math.floor(Math.random() * 2) * 30);
  }
  return (Math.floor(Math.random() * (23 - 19) + 19) * 100)
    + (Math.floor(Math.random() * 2) * 30);
};

const generatePartySize = () => Math.floor(Math.random() * 19 + 1);

let primaryKey = 1;
const generateReservations = (restaurantID) => {
  const data = [];
  for (let day = 0; day < 10; day += 1) {
    const date = generateDate(day);
    for (let i = 0; i < 2; i += 1) {
      const entry = `${primaryKey},${restaurantID},${date},${generateTime(i)},${generatePartySize()}`;
      primaryKey += 1;
      data.push(`${entry}\n`);
    }
  }
  return data.join('');
};
// ---------------------- WRITE TO FILE WITH GENERATED DATA ---------------------- //

const numberOfEntries = 10000000;
const writeDataToFile = (writeStream, generateData, fileName) => {
  let counter = 1;
  let progressPercent = 0;
  const writeChunksToFile = () => {
    const data = generateData(counter);
    if (counter > numberOfEntries) {
      console.timeEnd(`Write ${fileName} Completed! Time:`);
      writeStream.end();
      return;
    }
    const proceed = writeStream.write(data);
    if (proceed) {
      counter += 1;
      writeChunksToFile(generateData);
    } else {
      writeStream.once('drain', () => {
        counter += 1;
        const newProgressPercent = Math.floor(counter * 100 / numberOfEntries);
        if (newProgressPercent !== progressPercent) {
          console.log(`${fileName} --- ${Math.floor(counter * 100 / numberOfEntries)}% Done`);
          progressPercent = newProgressPercent;
        }
        writeChunksToFile(generateData);
      });
    }
  };
  writeChunksToFile(generateData);
};
const writeFile = (fileName, headers, generateData) => {
  console.time(`Write ${fileName} Completed! Time:`);
  const writeStream = fs.createWriteStream(fileName);
  writeStream.write(headers, () => {
    writeDataToFile(writeStream, generateData, fileName);
  });
};
writeFile('restaurants.csv', 'id,name\n', restaurantID => `${restaurantID},${generateName()}\n`);
writeFile('reservations.csv', 'id,restaurantID,date,time,party\n', generateReservations);
