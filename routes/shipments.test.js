"use strict";

const shipItAPI = require("../shipItApi");
shipItAPI.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");

describe("POST /shipments", function () {
  test("valid", async function () {
    shipItAPI.shipProduct.mockReturnValue(2000);

    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zipcode: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: 2000 });
  });

  test("invalid input", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send({
        productId: 0,
        name: "Test Tester",
        addr: "100 Test St",
        zipcode: "12345-6789",
      });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toEqual({ 
      error: { 
        message: ["instance.productId must be greater than or equal to 1000"], 
        status: 400 }
      })
  })
});
