const express = require("express");
const router = express.Router();
const { readDB, writeDB } = require("../db");

// Get WhatsApp Settings
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

// Save WhatsApp Settings
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