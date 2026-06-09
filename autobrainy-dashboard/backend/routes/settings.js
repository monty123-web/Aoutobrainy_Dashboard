const express = require("express");
const router = express.Router();
const { readDB, writeDB } = require("../db");

router.get("/whatsapp", (req, res) => {
  const db = readDB();

  res.json(
    db.whatsappSettings || {
      phoneNumberId: "",
      accessToken: "",
      businessAccountId: "",
      webhookVerifyToken: "",
    }
  );
});

router.post("/whatsapp", (req, res) => {
  const db = readDB();

  db.whatsappSettings = req.body;

  writeDB(db);

  res.json({
    success: true,
    settings: db.whatsappSettings,
  });
});

module.exports = router;