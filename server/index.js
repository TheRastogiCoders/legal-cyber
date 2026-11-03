const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');
const CMS_FILE = path.join(DATA_DIR, 'cms.json');
const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');
const PUBLIC_CMS = path.join(__dirname, '..', 'client', 'public', 'cms.json');
const PUBLIC_UPLOADS = path.join(__dirname, '..', 'client', 'public', 'uploads');
const ACTIVITY_FILE = path.join(DATA_DIR, 'activity.json');
const PAGE_REQUESTS_FILE = path.join(DATA_DIR, 'page-requests.json');
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD || 'lawsake-admin';

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}
if (!fs.existsSync(PUBLIC_UPLOADS)) {
  fs.mkdirSync(PUBLIC_UPLOADS, { recursive: true });
}
if (!fs.existsSync(ENQUIRIES_FILE)) {
  fs.writeFileSync(ENQUIRIES_FILE, '[]', 'utf8');
}
if (!fs.existsSync(ACTIVITY_FILE)) {
  fs.writeFileSync(ACTIVITY_FILE, '[]', 'utf8');
}
if (!fs.existsSync(PAGE_REQUESTS_FILE)) {
  fs.writeFileSync(PAGE_REQUESTS_FILE, '[]', 'utf8');
}

app.use(cors());
app.use(express.json({ limit: '12mb' }));
app.use('/uploads', express.static(UPLOAD_DIR));

function requireDashboard(req, res, next) {
  const key = req.headers['x-dashboard-key'];
  if (key !== DASHBOARD_PASSWORD) {
    return res.status(401).json({ ok: false, message: 'Dashboard password required.' });
  }
  next();
}

function writeCms(content) {
  const payload = JSON.stringify(content, null, 2);
  fs.writeFileSync(CMS_FILE, payload, 'utf8');
  try {
    fs.writeFileSync(PUBLIC_CMS, payload, 'utf8');
  } catch {
    /* public folder may be missing in some deploys */
  }
}

function extFromMime(mime, name) {
  const fromName = path.extname(String(name || '')).toLowerCase();
  if (fromName && fromName.length <= 5) return fromName;
  if (mime === 'image/png') return '.png';
  if (mime === 'image/webp') return '.webp';
  if (mime === 'image/gif') return '.gif';
  if (mime === 'image/svg+xml') return '.svg';
  return '.jpg';
}

function readActivity() {
  try {
    const list = JSON.parse(fs.readFileSync(ACTIVITY_FILE, 'utf8') || '[]');
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function readPageRequests() {
  try {
    const list = JSON.parse(fs.readFileSync(PAGE_REQUESTS_FILE, 'utf8') || '[]');
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

app.get('/api/page-requests', requireDashboard, (_req, res) => {
  return res.json({ ok: true, requests: readPageRequests() });
});

app.post('/api/page-requests', requireDashboard, (req, res) => {
  const { title, pathHint, description, urgency, requestedBy } = req.body || {};
  if (!title || !description) {
    return res.status(400).json({ ok: false, message: 'Please add a page name and a short brief for the developer.' });
  }
  const entry = {
    id: `PG-${Date.now()}`,
    createdAt: new Date().toISOString(),
    title: String(title).trim().slice(0, 160),
    pathHint: String(pathHint || '').trim().slice(0, 120),
    description: String(description).trim().slice(0, 4000),
    urgency: String(urgency || 'Normal').trim().slice(0, 40),
    requestedBy: String(requestedBy || 'Administrator').trim().slice(0, 80),
    status: 'sent',
  };
  try {
    const list = [entry, ...readPageRequests()].slice(0, 80);
    fs.writeFileSync(PAGE_REQUESTS_FILE, JSON.stringify(list, null, 2), 'utf8');
    console.log(`[page-request] ${entry.id} | ${entry.title} | ${entry.requestedBy}`);
    return res.json({ ok: true, request: entry, requests: list });
  } catch (err) {
    console.error('Failed to store page request', err);
    return res.status(500).json({ ok: false, message: 'Unable to save the request. Please email the developer instead.' });
  }
});

app.get('/api/activity', requireDashboard, (_req, res) => {
  return res.json({ ok: true, activity: readActivity() });
});

app.post('/api/activity', requireDashboard, (req, res) => {
  const { type, action, detail, actor, role, at, id } = req.body || {};
  if (!type || !action) {
    return res.status(400).json({ ok: false, message: 'Activity type and action are required.' });
  }
  const entry = {
    id: String(id || `ACT-${Date.now()}`).slice(0, 60),
    at: at || new Date().toISOString(),
    type: String(type).slice(0, 40),
    action: String(action).slice(0, 180),
    detail: String(detail || '').slice(0, 240),
    actor: String(actor || 'Administrator').slice(0, 80),
    role: String(role || 'Admin').slice(0, 40),
  };
  try {
    const list = [entry, ...readActivity().filter((item) => item.id !== entry.id)].slice(0, 120);
    fs.writeFileSync(ACTIVITY_FILE, JSON.stringify(list, null, 2), 'utf8');
    return res.json({ ok: true, activity: list });
  } catch (err) {
    console.error('Failed to store activity', err);
    return res.status(500).json({ ok: false, message: 'Unable to store activity.' });
  }
});

app.get('/api/content', (_req, res) => {
  try {
    if (!fs.existsSync(CMS_FILE)) {
      return res.json({ ok: true, content: null });
    }
    const content = JSON.parse(fs.readFileSync(CMS_FILE, 'utf8'));
    return res.json({ ok: true, content });
  } catch (err) {
    console.error('Failed to read CMS content', err);
    return res.status(500).json({ ok: false, message: 'Unable to read content.' });
  }
});

app.put('/api/content', requireDashboard, (req, res) => {
  const content = req.body?.content;
  if (!content || typeof content !== 'object' || Array.isArray(content)) {
    return res.status(400).json({ ok: false, message: 'Invalid content payload.' });
  }
  try {
    writeCms(content);
    return res.json({ ok: true });
  } catch (err) {
    console.error('Failed to save CMS content', err);
    return res.status(500).json({ ok: false, message: 'Unable to save content.' });
  }
});

app.delete('/api/content', requireDashboard, (_req, res) => {
  try {
    if (fs.existsSync(CMS_FILE)) fs.unlinkSync(CMS_FILE);
    if (fs.existsSync(PUBLIC_CMS)) fs.unlinkSync(PUBLIC_CMS);
    return res.json({ ok: true });
  } catch (err) {
    console.error('Failed to reset CMS content', err);
    return res.status(500).json({ ok: false, message: 'Unable to reset content.' });
  }
});

app.post('/api/upload', requireDashboard, (req, res) => {
  const name = String(req.body?.name || 'image');
  const data = String(req.body?.data || '');
  const match = data.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    return res.status(400).json({ ok: false, message: 'Please upload a valid image.' });
  }
  const mime = match[1];
  if (!mime.startsWith('image/')) {
    return res.status(400).json({ ok: false, message: 'Only image uploads are allowed.' });
  }
  const buffer = Buffer.from(match[2], 'base64');
  if (buffer.length > 8 * 1024 * 1024) {
    return res.status(400).json({ ok: false, message: 'Image must be under 8MB.' });
  }
  const safe = String(name || 'image')
    .replace(/[^a-zA-Z0-9._-]/g, '')
    .replace(/\.[a-z0-9]+$/i, '')
    .slice(0, 40) || 'image';
  const filename = `${Date.now()}-${safe}${extFromMime(mime, name)}`;
  try {
    fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer);
    try {
      fs.writeFileSync(path.join(PUBLIC_UPLOADS, filename), buffer);
    } catch {
      /* ignore */
    }
    return res.json({ ok: true, url: `/uploads/${filename}` });
  } catch (err) {
    console.error('Failed to store upload', err);
    return res.status(500).json({ ok: false, message: 'Unable to store image.' });
  }
});

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
  res.json({ ok: true, service: 'lawsake-api' });
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
      'Thank you. Your enquiry has been received and will be reviewed shortly. If your matter is urgent, please also WhatsApp +91 93951 59957 or call +91 93655 95365 with the word URGENT.',
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
  console.log(`Lawsake API running on http://localhost:${PORT}`);
});
