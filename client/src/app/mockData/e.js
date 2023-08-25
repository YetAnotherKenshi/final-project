const products = require("./products.json");
const fs = require("fs");

const newProducts = products;
const newData = Object.keys(newProducts).map((i) => newProducts[i]);

fs.writeFileSync("products-2.json", JSON.stringify(newData));

// console.log(newData);
