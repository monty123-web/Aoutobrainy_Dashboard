const { v4: uuidv4 } = require("uuid");
const { readDB, writeDB } = require("../db");

class Campaign {
  static create(data) {
    const id = uuidv4();
    const now = new Date().toISOString();

    const db = readDB();
    const campaign = {
      id,
      name: data.name,
      message: data.message,
      templateName: data.templateName || null,
      status: data.status || "Draft",
      scheduledAt: data.scheduledAt || null,
      targetSegment: data.targetSegment || "All",
      totalRecipients: data.totalRecipients || 0,
      sent: data.sent || 0,
      delivered: data.delivered || 0,
      read: data.read || 0,
      replied: data.replied || 0,
      failed: data.failed || 0,
      createdBy: data.createdBy || "admin",
      createdAt: now,
      updatedAt: now,
    };

    db.campaigns.push(campaign);
    writeDB(db);
    return this.findById(id);
  }

  static findById(id) {
    const db = readDB();
    return db.campaigns.find((c) => c.id === id);
  }

  static findAll() {
    const db = readDB();
    return db.campaigns.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  static update(id, data) {
    const db = readDB();
    const now = new Date().toISOString();
    const campaignIndex = db.campaigns.findIndex((c) => c.id === id);

    if (campaignIndex === -1) return null;

    const campaign = db.campaigns[campaignIndex];
    for (const [key, value] of Object.entries(data)) {
      if (key !== "id" && key !== "createdAt") {
        campaign[key] = value;
      }
    }
    campaign.updatedAt = now;

    db.campaigns[campaignIndex] = campaign;
    writeDB(db);
    return this.findById(id);
  }

  static delete(id) {
    const db = readDB();
    db.campaigns = db.campaigns.filter((c) => c.id !== id);
    writeDB(db);
  }

  static getStats() {
    const db = readDB();
    return {
      total: db.campaigns.length,
      active: db.campaigns.filter((c) => c.status === "Active").length,
      scheduled: db.campaigns.filter((c) => c.status === "Scheduled").length,
      completed: db.campaigns.filter((c) => c.status === "Completed").length,
    };
  }
}

module.exports = Campaign;


