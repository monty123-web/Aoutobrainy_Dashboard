const express = require("express");
const router = express.Router();
const axios = require("axios");
const { readDB } = require("../db");

function getWhatsAppConfig() {
  const db = readDB();

  return {
    phoneId: db.whatsappSettings?.phoneNumberId || "",
    token: db.whatsappSettings?.accessToken || "",
    wabaId: db.whatsappSettings?.businessAccountId || "",
    verifyToken: db.whatsappSettings?.webhookVerifyToken || "",
  };
}

// Send a single WhatsApp message
router.post("/send", async (req, res) => {
  try {
    const { to, message } = req.body;

    const config = getWhatsAppConfig();

    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${config.phoneId}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: {
          body: message,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      success: true,
      data: response.data,
    });
  } catch (err) {
    res.status(500).json({
      error: err.response?.data || err.message,
    });
  }
});

// Send template message
router.post("/send-template", async (req, res) => {
  try {
    const {
      to,
      templateName,
      language = "en",
      components = [],
    } = req.body;

    const config = getWhatsAppConfig();

    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${config.phoneId}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: language,
          },
          components,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      success: true,
      data: response.data,
    });
  } catch (err) {
    res.status(500).json({
      error: err.response?.data || err.message,
    });
  }
});

// Webhook Verification
router.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  const config = getWhatsAppConfig();

  if (
    mode === "subscribe" &&
    token === config.verifyToken
  ) {
    console.log("✅ WhatsApp Webhook Verified");
    return res.status(200).send(challenge);
  }

  res.sendStatus(403);
});

// Webhook Receiver
router.post("/webhook", (req, res) => {
  const body = req.body;

  if (body.object === "whatsapp_business_account") {
    body.entry?.forEach((entry) => {
      entry.changes?.forEach((change) => {
        change.value?.messages?.forEach((msg) => {
          console.log("📩 Incoming Message:", {
            from: msg.from,
            type: msg.type,
            text: msg.text?.body,
          });

          // Future:
          // Save message to DB
          // Trigger automation
          // Create lead
          // Reply automatically
        });
      });
    });

    return res.sendStatus(200);
  }

  res.sendStatus(404);
});

// Get Templates
router.get("/templates", async (req, res) => {
  try {
    const config = getWhatsAppConfig();

    const response = await axios.get(
      `https://graph.facebook.com/v18.0/${config.wabaId}/message_templates`,
      {
        headers: {
          Authorization: `Bearer ${config.token}`,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      error: err.response?.data || err.message,
    });
  }
});

module.exports = router;