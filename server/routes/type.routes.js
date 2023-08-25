const express = require("express");
const Type = require("../models/Type");
const router = express.Router({ mergeParams: true });

// api/type
router.get("/", async (req, res) => {
  try {
    const list = await Type.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json("На сервере произошла ошибка. Попробуйте позже");
  }
});

module.exports = router;
