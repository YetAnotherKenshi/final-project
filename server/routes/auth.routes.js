const express = require("express");
const router = express.Router({ mergeParams: true });

// api/auth/signUp
router.post("/signUp", (req, res) => {});

// api/auth/signInWithPassword
router.post("/signInWithPassword", (req, res) => {});

// api/auth/token
router.post("/token", (req, res) => {});

module.exports = router;
