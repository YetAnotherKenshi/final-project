const Product = require("../models/Product");
const Type = require("../models/Type");
const Brand = require("../models/Brand");
const productsMock = require("../mock/products.json");
const typesMock = require("../mock/types.json");
const brandsMock = require("../mock/brands.json");

module.exports = async () => {
  const products = await Product.find();
  const types = await Type.find();
  const brands = await Brand.find();
  if (types.length !== typesMock.length) {
    await createInitialEntity(Type, typesMock);
  }
  if (brands.length !== brandsMock.length) {
    await createInitialEntity(Brand, brandsMock);
  }
  if (products.length !== productsMock.length) {
    await createInitialEntity(Product, productsMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
