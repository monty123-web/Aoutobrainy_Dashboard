const fs = require("fs");
const path = require("path");

// Create database directory if it doesn't exist
const dbDir = path.join(__dirname, "../database");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, "autobrainy.json");

// Initialize database with default structure
function initializeDatabase() {
  if (!fs.existsSync(dbPath)) {
    const defaultData = {
      users: [],
      leads: [],
      campaigns: [],
      webhooks: [],
      webhook_logs: [],
    };
    fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2));
    console.log("✅ Database initialized successfully");
  }
}

// Read database
function readDB() {
  try {
    const data = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database:", error.message);
    return { users: [], leads: [], campaigns: [], webhooks: [], webhook_logs: [] };
  }
}

// Write database
function writeDB(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to database:", error.message);
  }
}

initializeDatabase();

module.exports = {
  readDB,
  writeDB,
  dbPath,
};