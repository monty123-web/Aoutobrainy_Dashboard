# Database Setup

## MongoDB Installation

### Option 1: Local MongoDB
```bash
# Ubuntu/Debian
sudo apt-get install -y mongodb

# macOS (Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
sudo systemctl start mongod
```

### Option 2: MongoDB Atlas (Cloud - Recommended)
1. Go to https://cloud.mongodb.com
2. Create a free cluster
3. Get your connection string
4. Set in backend/.env:
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/autobrainy

## Collections

- `users` — Admin/agent accounts
- `leads` — WhatsApp contacts
- `campaigns` — Marketing campaigns

## Seed Data (Optional)

Run this in MongoDB shell to add test data:

```js
use autobrainy

db.leads.insertMany([
  { name: "Rahul Sharma", mobile: "+919876543210", source: "Website", status: "Hot", city: "Mumbai", optedIn: true },
  { name: "Priya Patel", mobile: "+918765432109", source: "Campaign", status: "Warm", city: "Ahmedabad", optedIn: true },
  { name: "Amit Kumar", mobile: "+917654321098", source: "Referral", status: "Cold", city: "Delhi", optedIn: false }
])

db.campaigns.insertMany([
  { name: "Diwali Sale Blast", message: "Happy Diwali! Get 50% off!", status: "Completed", sent: 12400, delivered: 11800, read: 10200, replied: 3210 },
  { name: "New Year Offers", message: "New Year New Deals!", status: "Scheduled", scheduledAt: new Date("2025-01-01") }
])
```
