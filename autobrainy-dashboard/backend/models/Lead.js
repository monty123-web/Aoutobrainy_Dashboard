const { v4: uuidv4 } = require("uuid");
const { readDB, writeDB } = require("../db");

class Lead {
  static create(data) {
    const id = uuidv4();
    const now = new Date().toISOString();

    const db = readDB();
    const lead = {
      id,
      name: data.name,
      mobile: data.mobile,
      email: data.email || null,
      source: data.source || "Manual",
      status: data.status || "Warm",
      city: data.city || null,
      tags: Array.isArray(data.tags) ? data.tags : [],
      optedIn: data.optedIn !== false,
      lastMessageAt: null,
      notes: data.notes || null,
      createdAt: now,
      updatedAt: now,
    };

    db.leads.push(lead);
    writeDB(db);
    return this.findById(id);
  }

  static findById(id) {
    const db = readDB();
    return db.leads.find((l) => l.id === id);
  }

  static find(filter = {}, page = 1, limit = 20) {
    const db = readDB();
    let filtered = [...db.leads];

    if (filter.status) {
      filtered = filtered.filter((l) => l.status === filter.status);
    }

    if (filter.source) {
      filtered = filtered.filter((l) => l.source === filter.source);
    }

    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.name.toLowerCase().includes(searchLower) ||
          l.mobile.toLowerCase().includes(searchLower)
      );
    }

    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const total = filtered.length;
    const leads = filtered.slice((page - 1) * limit, page * limit);

    return { leads, total, page };
  }

  static update(id, data) {
    const db = readDB();
    const now = new Date().toISOString();
    const leadIndex = db.leads.findIndex((l) => l.id === id);

    if (leadIndex === -1) return null;

    const lead = db.leads[leadIndex];
    for (const [key, value] of Object.entries(data)) {
      if (key !== "id" && key !== "createdAt") {
        if (key === "tags" && Array.isArray(value)) {
          lead.tags = value;
        } else if (key !== "tags") {
          lead[key] = value;
        }
      }
    }
    lead.updatedAt = now;

    db.leads[leadIndex] = lead;
    writeDB(db);
    return this.findById(id);
  }

  static delete(id) {
    const db = readDB();
    db.leads = db.leads.filter((l) => l.id !== id);
    writeDB(db);
  }

  static getStats() {
    const db = readDB();
    return {
      total: db.leads.length,
      hot: db.leads.filter((l) => l.status === "Hot").length,
      warm: db.leads.filter((l) => l.status === "Warm").length,
      optedIn: db.leads.filter((l) => l.optedIn === true).length,
    };
  }
}

module.exports = Lead;


