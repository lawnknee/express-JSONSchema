"use strict";

const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);

const {shipProduct, SHIPIT_SHIP_URL, SHIPIT_API_KEY } = 
require("./shipItApi");

const { response } = require("express");

test("shipProduct", async function () {

  const responseData = { receipt: {
    itemId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
    shipId: 2000
  }};

  axiosMock.onPost(`${SHIPIT_SHIP_URL}`)
    .reply(201, responseData);

    const shipId = await shipProduct({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

  expect(shipId).toEqual(2000);
  expect(responseData.receipt.shipId).toEqual(shipId);
});