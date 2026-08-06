const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(ENQUIRIES_FILE)) {
  fs.writeFileSync(ENQUIRIES_FILE, '[]', 'utf8');
}

app.use(cors());
app.use(express.json({ limit: '100kb' }));

const rateMap = new Map();

function rateLimit(req, res, next) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60_000;
  const max = 8;
  const entry = rateMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > windowMs) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  rateMap.set(ip, entry);
  if (entry.count > max) {
    return res.status(429).json({ ok: false, message: 'Too many requests. Please try again shortly.' });
  }
  next();
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'legal-cyber-api' });
});

app.post('/api/contact', rateLimit, (req, res) => {
  const {
    name,
    phone,
    email,
    city,
    clientType,
    matterType,
    urgency,
    description,
    consent,
    website,
  } = req.body || {};

  // Honeypot — bots fill this; humans never see it
  if (website) {
    return res.json({ ok: true, message: 'Thank you. Your enquiry has been received.' });
  }

  if (!name || !phone || !email || !city || !matterType || !description) {
    return res.status(400).json({
      ok: false,
      message: 'Please complete all required fields.',
    });
  }

  if (!consent) {
    return res.status(400).json({
      ok: false,
      message: 'Please accept the Disclaimer and Privacy Policy to continue.',
    });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
  if (!emailOk) {
    return res.status(400).json({ ok: false, message: 'Please provide a valid email address.' });
  }

  const enquiry = {
    id: `LC-${Date.now()}`,
    createdAt: new Date().toISOString(),
    name: String(name).trim().slice(0, 120),
    phone: String(phone).trim().slice(0, 40),
    email: String(email).trim().slice(0, 120),
    city: String(city).trim().slice(0, 120),
    clientType: String(clientType || 'Individual').trim().slice(0, 80),
    matterType: String(matterType).trim().slice(0, 120),
    urgency: String(urgency || 'Exploratory').trim().slice(0, 80),
    description: String(description).trim().slice(0, 4000),
  };

  try {
    const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf8');
    const list = JSON.parse(raw || '[]');
    list.push(enquiry);
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to store enquiry', err);
    return res.status(500).json({
      ok: false,
      message: 'Unable to save your enquiry right now. Please WhatsApp us instead.',
    });
  }

  console.log(`[enquiry] ${enquiry.id} | ${enquiry.urgency} | ${enquiry.matterType}`);

  return res.json({
    ok: true,
    id: enquiry.id,
    message:
      'Thank you. Your enquiry has been received and will be reviewed shortly. If your matter is urgent, please also WhatsApp +91 93951 59957 with the word URGENT.',
  });
});

const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Legal-Cyber API running on http://localhost:${PORT}`);
});
