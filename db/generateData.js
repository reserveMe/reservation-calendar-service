const faker = require('faker');
const format = require('date-fns/format');
const moment = require('moment');
const fs = require('fs');
// const db = require('./index');

// ---------------------------- GENERATE DATA TO SEED ---------------------------- //
const generateName = () => `${faker.commerce.productAdjective()} ${faker.commerce.department()} ${faker.commerce.product()}`;

const generateRestaurantId = () => Math.floor(Math.random() * 100 + 1);

const generateDate = (daysToAdd) => {
  // const startDate = moment(new Date());
  const startDate = moment()
  return startDate.add(daysToAdd, 'days').format('MMDDYY')
}
  
// const generateDate = () => format(Date.parse(faker.date.future()), 'MMDDYY');

// between 10AM and 11PM
const generateTime = (i) => {
  if (i % 2) {
    return (Math.floor(Math.random() * (18 - 10) + 10) * 100)
      + (Math.floor(Math.random() * 2) * 30);
  } 
  return (Math.floor(Math.random() * (23 - 19) + 19) * 100)
    + (Math.floor(Math.random() * 2) * 30);
}

const generatePartySize = () => Math.floor(Math.random() * 19 + 1);

const generateReservations = (restaurant_id) => {
  let data = [];
  for (let day = 0; day < 10; day++) {
    const date = generateDate(day);
    for (let i = 0; i < 2; i += 1) {
      const entry = `${restaurant_id},${date},${generateTime(i)},${generatePartySize()}`
      data.push(entry + '\n');
    }
  }
return data.join('');
}
// ---------------------- WRITE TO FILE WITH GENERATED DATA ---------------------- //

const numberOfEntries = 10000000
const writeDataToFile = (writeStream, numberOfEntries, generateData, fileName) => {
  let counter = 1;
  let progressPercent = 0;
  const writeChunksToFile = (generateData) => {
    const data = generateData(counter);
    if (counter > numberOfEntries) {
      console.timeEnd(`Write ${fileName} Completed! Time:`);
      writeStream.end();
      return;
    }
    const proceed = writeStream.write(data)
    if (proceed) {
      counter++;
      writeChunksToFile(generateData);
    } else {
      writeStream.once('drain', () => {
        counter++;
        const newProgressPercent = Math.floor(counter*100/numberOfEntries);
        if (newProgressPercent !== progressPercent) {
          console.log(`${fileName} --- ${Math.floor(counter*100/numberOfEntries)}% Done`);
          progressPercent = newProgressPercent
        }
        writeChunksToFile(generateData)
      });
    }
  }
  writeChunksToFile(generateData);  
}
const writeFile = (fileName,numberOfEntries, generateData) => {
  console.time(`Write ${fileName} Completed! Time:`);
  const writeStream = fs.createWriteStream(fileName);
  writeStream.write('id,name\n', () => {
    writeDataToFile(writeStream, numberOfEntries, generateData, fileName)  
  });
}
writeFile('restaurants.csv', numberOfEntries, (restaurant_id) => `${restaurant_id},${generateName()}\n`);
writeFile('reservations.csv',numberOfEntries, generateReservations);