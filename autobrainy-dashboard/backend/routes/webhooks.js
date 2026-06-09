const express = require("express");
const router = express.Router();
const axios = require("axios");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const { readDB, writeDB } = require("../db");

// GET all webhooks
router.get("/", (req, res) => {
  try {
    const db = readDB();
    res.json(db.webhooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single webhook
router.get("/:id", (req, res) => {
  try {
    const db = readDB();
    const webhook = db.webhooks.find((w) => w.id === req.params.id);
    if (!webhook) return res.status(404).json({ error: "Webhook not found" });
    res.json(webhook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create webhook
router.post("/", (req, res) => {
  try {
    const { name, url, events } = req.body;

    if (!name || !url || !events) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const id = uuidv4();
    const secret = crypto.randomBytes(32).toString("hex");
    const now = new Date().toISOString();

    const db = readDB();
    const webhook = {
      id,
      name,
      url,
      events: Array.isArray(events) ? events : [events],
      secret,
      active: true,
      lastTriggered: null,
      createdAt: now,
      updatedAt: now,
    };

    db.webhooks.push(webhook);
    writeDB(db);

    res.status(201).json(webhook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update webhook
router.put("/:id", (req, res) => {
  try {
    const { name, url, events, active } = req.body;
    const now = new Date().toISOString();

    const db = readDB();
    const webhookIndex = db.webhooks.findIndex((w) => w.id === req.params.id);

    if (webhookIndex === -1) {
      return res.status(404).json({ error: "Webhook not found" });
    }

    const webhook = db.webhooks[webhookIndex];

    if (name !== undefined) webhook.name = name;
    if (url !== undefined) webhook.url = url;
    if (events !== undefined) webhook.events = Array.isArray(events) ? events : [events];
    if (active !== undefined) webhook.active = active;

    webhook.updatedAt = now;
    db.webhooks[webhookIndex] = webhook;
    writeDB(db);

    res.json(webhook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE webhook
router.delete("/:id", (req, res) => {
  try {
    const db = readDB();
    db.webhooks = db.webhooks.filter((w) => w.id !== req.params.id);
    db.webhook_logs = db.webhook_logs.filter((log) => log.webhookId !== req.params.id);
    writeDB(db);
    res.json({ message: "Webhook deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET webhook logs
router.get("/:id/logs", (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const db = readDB();

    const logs = db.webhook_logs
      .filter((log) => log.webhookId === req.params.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice((parseInt(page) - 1) * parseInt(limit), parseInt(page) * parseInt(limit));

    const total = db.webhook_logs.filter((log) => log.webhookId === req.params.id).length;

    res.json({ logs, total, page: parseInt(page) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Trigger webhook manually
router.post("/:id/trigger", async (req, res) => {
  try {
    const db = readDB();
    const webhook = db.webhooks.find((w) => w.id === req.params.id);

    if (!webhook) {
      return res.status(404).json({ error: "Webhook not found" });
    }

    if (!webhook.active) {
      return res.status(400).json({ error: "Webhook is not active" });
    }

    const payload = req.body.payload || { test: true };
    const signature = crypto.createHmac("sha256", webhook.secret).update(JSON.stringify(payload)).digest("hex");

    try {
      const response = await axios.post(webhook.url, payload, {
        headers: {
          "X-Webhook-Signature": signature,
          "Content-Type": "application/json",
        },
        timeout: 5000,
      });

      // Log successful webhook call
      const logId = uuidv4();
      const now = new Date().toISOString();
      const log = {
        id: logId,
        webhookId: webhook.id,
        event: "manual_trigger",
        payload: JSON.stringify(payload),
        status: response.status,
        response: JSON.stringify(response.data),
        createdAt: now,
      };

      db.webhook_logs.push(log);
      webhook.lastTriggered = now;
      writeDB(db);

      res.json({
        success: true,
        status: response.status,
        data: response.data,
      });
    } catch (error) {
      // Log failed webhook call
      const logId = uuidv4();
      const now = new Date().toISOString();
      const errorResponse = error.response?.data || error.message;
      const log = {
        id: logId,
        webhookId: webhook.id,
        event: "manual_trigger",
        payload: JSON.stringify(payload),
        status: error.response?.status || 500,
        response: JSON.stringify(errorResponse),
        createdAt: now,
      };

      db.webhook_logs.push(log);
      writeDB(db);

      res.status(500).json({
        success: false,
        error: errorResponse,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send webhook notification internally
async function triggerWebhook(event, data) {
  try {
    const db = readDB();
    const webhooks = db.webhooks.filter((w) => w.active && w.events.includes(event));

    for (const webhook of webhooks) {
      const payload = {
        event,
        data,
        timestamp: new Date().toISOString(),
      };

      const signature = crypto.createHmac("sha256", webhook.secret).update(JSON.stringify(payload)).digest("hex");

      try {
        const response = await axios.post(webhook.url, payload, {
          headers: {
            "X-Webhook-Signature": signature,
            "Content-Type": "application/json",
          },
          timeout: 5000,
        });

        // Log successful call
        const logId = uuidv4();
        const log = {
          id: logId,
          webhookId: webhook.id,
          event,
          payload: JSON.stringify(payload),
          status: response.status,
          response: JSON.stringify(response.data),
          createdAt: new Date().toISOString(),
        };

        db.webhook_logs.push(log);
        webhook.lastTriggered = new Date().toISOString();
      } catch (error) {
        // Log failed call
        const logId = uuidv4();
        const errorResponse = error.response?.data || error.message;
        const log = {
          id: logId,
          webhookId: webhook.id,
          event,
          payload: JSON.stringify(payload),
          status: error.response?.status || 500,
          response: JSON.stringify(errorResponse),
          createdAt: new Date().toISOString(),
        };

        db.webhook_logs.push(log);
      }
    }

    writeDB(db);
  } catch (err) {
    console.error("Error triggering webhooks:", err.message);
  }
}

module.exports = router;
module.exports.triggerWebhook = triggerWebhook;

