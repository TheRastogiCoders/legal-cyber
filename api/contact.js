const rateMap = new Map();

function rateLimit(ip) {
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
  return entry.count > max;
}

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  const forwarded = req.headers['x-forwarded-for'];
  const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : null) || 'unknown';
  if (rateLimit(ip)) {
    return res.status(429).json({ ok: false, message: 'Too many requests. Please try again shortly.' });
  }

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

  if (website) {
    return res.json({ ok: true, message: 'Thank you. Your enquiry has been received.' });
  }

  if (!name || !phone || !email || !city || !matterType || !description) {
    return res.status(400).json({ ok: false, message: 'Please complete all required fields.' });
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

  console.log(`[enquiry] ${enquiry.id} | ${enquiry.urgency} | ${enquiry.matterType} | ${enquiry.email}`);

  return res.json({
    ok: true,
    id: enquiry.id,
    message:
      'Thank you. Your enquiry has been received and will be reviewed shortly. If your matter is urgent, please also WhatsApp +91 93951 59957 with the word URGENT.',
  });
};
