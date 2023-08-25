const express = require("express");
const Brand = require("../models/Brand");
const router = express.Router({ mergeParams: true });

// api/brand
router.get("/", async (req, res) => {
  try {
    const list = await Brand.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json("На сервере произошла ошибка. Попробуйте позже");
  }
});

module.exports = router;
