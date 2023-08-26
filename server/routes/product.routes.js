const express = require("express");
const Product = require("../models/Product");
const router = express.Router({ mergeParams: true });

// api/product
router.get("/", async (req, res) => {
  try {
    const list = await Product.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json("На сервере произошла ошибка. Попробуйте позже");
  }
});
router
  .route("/:productId")
  .get(async (req, res) => {
    const { productId } = req.params;
    try {
      const list = await Product.findById(productId);
      res.status(200).send(list);
    } catch (error) {
      res.status(500).json("На сервере произошла ошибка. Попробуйте позже");
    }
  })
  .patch(async (req, res) => {
    try {
      const { productId } = req.params;

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        req.body,
        {
          new: true,
        }
      );
      res.send(updatedProduct);
    } catch (error) {
      res.status(500).json("На сервере произошла ошибка. Попробуйте позже");
    }
  });

module.exports = router;
