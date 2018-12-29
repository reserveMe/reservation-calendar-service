import React from 'react';
import { mount } from 'enzyme';
import puppeteer from 'puppeteer';
import regeneratorRuntime from 'regenerator-runtime';
// Two reservations on 2/13/19

let page;
let browser;
const width = 1920;
const height = 1080;
const APP = 'http://localhost:3002/restaurants/1/';

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});

afterAll(() => {
  browser.close();
});

describe("App", () => {
  test("should render the reservation form on load", async () => {
    await page.goto(APP);
    await page.waitForSelector('#widgetForm');
  }, 16000);
  test("should default to a party size of 2", async () => {
    await page.goto(APP);
    await page.waitForSelector('#widgetForm');
    const defaultPartySize = await page.$eval('select#selectedPartySize', e => e.value);
    expect(defaultPartySize).toEqual('2');
  }, 16000);
  test("should submit a request for available times near the requested time", async () => {
    await page.goto(APP);
    await page.waitForSelector('#widgetForm');
    await page.select('select#selectedPartySize', '2');
    await page.type("input[id=selectedDate]", "02132019");
    await page.select('select#selectedTime', '1530');
    await page.click('#findtable');
    await page.waitForSelector(".timeslot");
  }, 16000);
  test("should be able to create a reservation", async () => {
    await page.goto(APP);
    await page.waitForSelector('#widgetForm');
    await page.select('select#selectedPartySize', '2');
    await page.type("input[id=selectedDate]", "02132019");
    await page.select('select#selectedTime', '1500');
    await page.click('#findtable');
    await page.waitForSelector("button[id='1500']");
    await page.click("button[id='1500']");
    await page.waitForSelector('#createdReservation');
  }, 16000);
  test("should not show a time slot for a reservation that has been booked", async () => {
    await page.goto(APP);
    await page.waitForSelector('#widgetForm');
    await page.select('select#selectedPartySize', '2');
    await page.type("input[id=selectedDate]", "02132019");
    await page.select('select#selectedTime', '1500');
    await page.click('#findtable');
    let buttonForRequestedTime = await page.evaluate(() => {
      return document.getElementById('1500');
    });
    expect(buttonForRequestedTime).toBe(null);
  }, 16000);
  test("should show times near the requested time if the requested time is unavailable", async () => {
    await page.goto(APP);
    await page.waitForSelector('#widgetForm');
    await page.select('select#selectedPartySize', '2');
    await page.type("input[id=selectedDate]", "02132019");
    await page.select('select#selectedTime', '1500');
    await page.click('#findtable');
    let buttonsNearRequestedTime = await page.evaluate(() => {
      return document.getElementsByClassName('timeslot').length;
    });
    expect(buttonsNearRequestedTime).toBeGreaterThan(0);
  }, 16000);
});