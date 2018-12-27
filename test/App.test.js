import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/src/index.jsx';
// import puppeteer from 'puppeteer';
// Two reservations on 2/13/19

let page;
let browser;
const width = 1920;
const height = 1080;
const APP = 'http://localhost:3002/restaurants/1/';

// beforeAll(async () => {
//   browser = await puppeteer.launch({
//     headless: false,
//     slowMo: 80,
//     args: [`--window-size=${width},${height}`]
//   });
//   page = await browser.newPage();
//   await page.setViewport({ width, height });
// });

// afterAll(() => {
//   browser.close();
// });

// describe("App", () => {
//   test("can submit a contact request", async () => {
//     await page.goto(APP);
//     await page.waitForSelector("[data-test=contact-form]");
//     await page.click("input[name=name]");
//     await page.type("input[name=name]", lead.name);
//     await page.click("input[name=email]");
//     await page.type("input[name=email]", lead.email);
//     await page.click("input[name=tel]");
//     await page.type("input[name=tel]", lead.phone);
//     await page.click("textarea[name=message]");
//     await page.type("textarea[name=message]", lead.message);
//     await page.click("input[type=checkbox]");
//     await page.click("button[type=submit]");
//     await page.waitForSelector(".modal");
//   }, 16000);
// });


function setup() {
  const wrapper = shallow(<App />);
  return { wrapper };
}

describe('App', () => {
  it('should render a form on load', () => {
    const { wrapper } = setup();
    expect(wrapper.find('#widgetForm').exists()).toBe(true);
  });
  it("should default to a party size of 2", () => {
    const { wrapper } = setup();
    expect(wrapper.find('.selectedPartySize').value).toBe('2');
  })
})

// expect(stateProps.hasOwnProperty('photos')).toBe(true);
// expect(stateProps.hasOwnProperty('currImage')).toBe(true);