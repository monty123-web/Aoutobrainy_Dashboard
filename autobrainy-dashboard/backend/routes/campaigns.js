const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");

// GET all campaigns
router.get("/", (req, res) => {
  try {
    const campaigns = Campaign.findAll();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create campaign
router.post("/", (req, res) => {
  try {
    const campaign = Campaign.create(req.body);
    res.status(201).json(campaign);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update campaign
router.put("/:id", (req, res) => {
  try {
    const campaign = Campaign.update(req.params.id, req.body);
    res.json(campaign);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE campaign
router.delete("/:id", (req, res) => {
  try {
    Campaign.delete(req.params.id);
    res.json({ message: "Campaign deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET stats
router.get("/stats/overview", (req, res) => {
  try {
    const stats = Campaign.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

