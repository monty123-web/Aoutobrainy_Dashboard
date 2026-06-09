const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Initialize SQLite Database
const db = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const settingsRoutes = require("./routes/settings");
const authRoutes = require("./routes/auth");
const leadsRoutes = require("./routes/leads");
const campaignsRoutes = require("./routes/campaigns");
const whatsappRoutes = require("./routes/whatsapp");
const webhooksRoutes = require("./routes/webhooks");

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/campaigns", campaignsRoutes);
app.use("/api/whatsapp", whatsappRoutes);
app.use("/api/webhooks", webhooksRoutes);
app.use("/api/settings", settingsRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Autobrainy API Running with SQLite" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Autobrainy Server running on http://localhost:${PORT}`);
  console.log(`📊 Using JSON file database`);
});

