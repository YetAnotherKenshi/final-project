const express = require("express");
const router = express.Router({ mergeParams: true });

// api/auth/
router.use("/auth", require("./auth.routes"));

// api/brand/
router.use("/brand", require("./brand.routes"));

// api/type/
router.use("/type", require("./type.routes"));

// // api/user/
// router.use("/user", require("./user.routes"));

// // api/product/
// router.use("/product", require("./product.routes"));

// // api/comment/
// router.use("/comment", require("./comment.routes"));

module.exports = router;
