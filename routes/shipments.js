"use strict";

const express = require("express");
const router = new express.Router();

const jsonschema = require("jsonschema");
const shipItSchema = require("../shipItSchema.json")
const shipItMultiSchema = require("../shipItMultiSchema.json")

const { shipProduct, shipProducts } = require("../shipItApi");
const { BadRequestError } = require("../expressError");

/** POST /shipments
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  const result = jsonschema.validate(req.body, shipItSchema);
  
  if (!result.valid) {
    let errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }
  
  const { productId, name, addr, zip } = req.body;
  const shipId = await shipProduct({ productId, name, addr, zip });
  return res.json({ shipped: shipId });
});


router.post("/multi", async function (req, res, next) {
  const result = jsonschema.validate(req.body, shipItMultiSchema);
  
  if (!result.valid) {
    let errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }
  
  const { productIds, name, addr, zip } = req.body;

  const shipIds = await shipProducts({ productIds, name, addr, zip });

  return res.json({ shipped: shipIds });
});


module.exports = router;