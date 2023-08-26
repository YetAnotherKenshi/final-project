const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/auth.middleware");

const router = express.Router({ mergeParams: true });

// api/order
router
  .route("/:orderId")
  .get(auth, async (req, res) => {
    try {
      const { orderId } = req.params;
      const list = await Order.findById(orderId);
      res.send(list);
    } catch (error) {
      res.status(500).json("На сервере произошла ошибка. Попробуйте позже");
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newOrder = await Order.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newOrder);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("На сервере произошла ошибка. Попробуйте позже");
    }
  })
  .patch(auth, async (req, res) => {
    try {
      const { orderId } = req.params;
      const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
        new: true,
      });
      res.send(updatedOrder);
    } catch (error) {
      res.status(500).json("На сервере произошла ошибка. Попробуйте позже");
    }
  })
  .delete(auth, async (req, res) => {
    try {
      const { orderId } = req.params;
      const removedOrder = await Order.findById(orderId);
      if (removedOrder.userId.toString() === req.user._id) {
        await removedOrder.deleteOne();
        return res.send(null);
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      res.status(500).json("На сервере произошла ошибка. Попробуйте позже");
    }
  });

module.exports = router;
