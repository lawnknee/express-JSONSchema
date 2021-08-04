"use strict";

const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);

const {shipProduct, shipProducts, SHIPIT_SHIP_URL } = 
require("./shipItApi");

test("shipProduct", async function () {

  const responseData = { receipt: {
    itemId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
    shipId: 2000
  }};

  axiosMock.onPost(SHIPIT_SHIP_URL)
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


test("shipProducts", async function () {

  const responseData = { receipt: {
    itemIds: [1000, 1001, 1002, 1003],
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
    shipIds: [2000, 2001, 2002, 2003]
  }};

  axiosMock.onPost(SHIPIT_SHIP_URL)
    .reply(201, responseData);

    const shipIds = await shipProducts({
      productIds: [1000, 1001, 1002, 1003],
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

  expect(shipIds).toEqual([2000, 2001, 2002, 2003]);
  expect(responseData.receipt.shipIds).toEqual(shipIds);
});