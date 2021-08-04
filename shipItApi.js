"use strict";

const SHIPIT_SHIP_URL = "http://localhost:3001/ship";
const SHIPIT_API_KEY = "SUPER-DUPER-SECRET";

const axios = require("axios");


/** Ship a single product through the shipit API.
 *
 * Returns shipId from shipit.
 */

async function shipProduct({ productId, name, addr, zip }) {
  // console.warn("Called our real shipProduct function");

  const resp = await axios({
    method: "POST",
    url: SHIPIT_SHIP_URL,
    data: {
      itemId: productId,
      name: name,
      addr: addr,
      zip: zip,
      key: SHIPIT_API_KEY
    },
  });

  return resp.data.receipt.shipId;
}


/** Ships multiple products through the shipit API.
 *
 * Returns an array of shipIds from shipit.
 */

//  async function shipProducts({ productIds, name, addr, zip }) {

//   console.log(`productIds are `, productIds);

//   let results = [];

//   for (let id of productIds) {
//     let result = await shipProduct({ id, name, addr, zip });

//     console.log(`result is `, result);
//     results.push(result);
//   }

//   // const resultsPromise = Promise.all(promises);

//   // console.log(`resultsPromise is`, resultsPromise);

//   // const result = await resultsPromise;

//   // const result = [];

//   // for (let p of promises) {
//   //   let res = await p;
//   //   result.push(res);
//   // }

//   console.log(`results are `, results);

//   return results;
// }

async function shipProducts({ productIds, name, addr, zip }) {
  let shipPromises = productIds.map(
      productId => shipProduct({ productId, name, addr, zip }),
  );

  return await Promise.all(shipPromises);
}

module.exports = { shipProduct, shipProducts, SHIPIT_SHIP_URL, SHIPIT_API_KEY };
