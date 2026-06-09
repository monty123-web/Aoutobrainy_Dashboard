const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { readDB, writeDB } = require("../db");

class User {
  static create(data) {
    const id = uuidv4();
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    const now = new Date().toISOString();

    const db = readDB();
    const user = {
      id,
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || "admin",
      businessName: data.businessName || null,
      whatsappPhoneId: null,
      whatsappToken: null,
      createdAt: now,
      updatedAt: now,
    };

    db.users.push(user);
    writeDB(db);
    return this.findById(id);
  }

  static findById(id) {
    const db = readDB();
    return db.users.find((u) => u.id === id);
  }

  static findByEmail(email) {
    const db = readDB();
    return db.users.find((u) => u.email === email);
  }

  static findAll() {
    const db = readDB();
    return db.users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      businessName: u.businessName,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    }));
  }

  static update(id, data) {
    const db = readDB();
    const now = new Date().toISOString();
    const userIndex = db.users.findIndex((u) => u.id === id);

    if (userIndex === -1) return null;

    const user = db.users[userIndex];
    for (const [key, value] of Object.entries(data)) {
      if (key !== "id" && key !== "password" && key !== "createdAt") {
        user[key] = value;
      }
    }
    user.updatedAt = now;

    db.users[userIndex] = user;
    writeDB(db);
    return this.findById(id);
  }

  static delete(id) {
    const db = readDB();
    db.users = db.users.filter((u) => u.id !== id);
    writeDB(db);
  }

  static comparePassword(user, password) {
    return bcrypt.compareSync(password, user.password);
  }
}

module.exports = User;


