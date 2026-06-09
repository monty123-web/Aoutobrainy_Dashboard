const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// GET all leads
router.get("/", (req, res) => {
  try {
    const { status, source, search, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (source) filter.source = source;
    if (search) filter.search = search;

    const result = Lead.find(filter, parseInt(page), parseInt(limit));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single lead
router.get("/:id", (req, res) => {
  try {
    const lead = Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create lead
router.post("/", (req, res) => {
  try {
    const lead = Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update lead
router.put("/:id", (req, res) => {
  try {
    const lead = Lead.update(req.params.id, req.body);
    res.json(lead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE lead
router.delete("/:id", (req, res) => {
  try {
    Lead.delete(req.params.id);
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET stats
router.get("/stats/overview", (req, res) => {
  try {
    const stats = Lead.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

