import { clone, DEFAULT_CONTENT } from '../data/defaults';
import { whatsappUrl } from '../data/content';

export const CMS_STORAGE_KEY = 'lawsake-cms-v1';
export const CMS_AUTH_KEY = 'lawsake-dash-auth';
export const CMS_SESSION_KEY = 'lawsake-dash-session';
export const ACTIVITY_KEY = 'lawsake-dash-activity';
export const DASHBOARD_PASSWORD = import.meta.env.VITE_DASHBOARD_PASSWORD || 'lawsake-admin';

export const DEVELOPER = {
  name: 'Rastogi Codeworks',
  website: 'https://rastogicodeworks.com',
  email: import.meta.env.VITE_DEVELOPER_EMAIL || 'hello@rastogicodeworks.com',
};

export function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

export function hydrate(saved, defaults = DEFAULT_CONTENT) {
  if (saved == null) return clone(defaults);
  if (Array.isArray(defaults)) {
    return Array.isArray(saved) ? clone(saved) : clone(defaults);
  }
  if (isPlainObject(defaults) && isPlainObject(saved)) {
    const out = {};
    const keys = new Set([...Object.keys(defaults), ...Object.keys(saved)]);
    keys.forEach((key) => {
      if (key in defaults && key in saved) out[key] = hydrate(saved[key], defaults[key]);
      else if (key in saved) out[key] = clone(saved[key]);
      else out[key] = clone(defaults[key]);
    });
    return out;
  }
  return saved === undefined ? clone(defaults) : clone(saved);
}

export function getPath(obj, path) {
  return String(path)
    .split('.')
    .reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

export function setPath(obj, path, value) {
  const keys = String(path).split('.');
  const next = clone(obj);
  let cursor = next;
  keys.forEach((key, i) => {
    if (i === keys.length - 1) {
      cursor[key] = value;
    } else {
      const current = cursor[key];
      cursor[key] = Array.isArray(current) ? [...current] : isPlainObject(current) ? { ...current } : {};
      cursor = cursor[key];
    }
  });
  return next;
}

export function readLocalContent() {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function writeLocalContent(content) {
  try {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(content));
  } catch {
    /* quota / private mode */
  }
}

export function clearLocalContent() {
  try {
    localStorage.removeItem(CMS_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function siteWhatsApp(content) {
  return whatsappUrl(content?.site);
}

export function featuredPracticeAreas(content) {
  const slugs = String(content?.home?.featuredSlugs || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return (content.practiceAreas || []).filter((p) => slugs.includes(p.slug));
}

export function readSession() {
  try {
    const raw = sessionStorage.getItem(CMS_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeSession(session) {
  try {
    sessionStorage.setItem(CMS_SESSION_KEY, JSON.stringify(session));
  } catch {
    /* ignore */
  }
}

export function clearSession() {
  try {
    sessionStorage.removeItem(CMS_AUTH_KEY);
    sessionStorage.removeItem(CMS_SESSION_KEY);
  } catch {
    /* ignore */
  }
}

export function timeAgo(iso) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const minutes = Math.max(0, Math.round((Date.now() - then) / 60000));
  if (minutes < 1) return 'Just now';
  if (minutes === 1) return '1 min ago';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours === 1) return '1 hr ago';
  if (hours < 24) return `${hours} hr ago`;
  return new Date(iso).toLocaleString();
}

export function readLocalActivity() {
  try {
    const list = JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '[]');
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function writeLocalActivity(list) {
  try {
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify((list || []).slice(0, 80)));
  } catch {
    /* ignore */
  }
}

export async function fetchActivity() {
  try {
    const res = await fetch('/api/activity', {
      headers: { 'x-dashboard-key': DASHBOARD_PASSWORD },
    });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.activity)) {
        writeLocalActivity(json.activity);
        return json.activity;
      }
    }
  } catch {
    /* API offline */
  }
  return readLocalActivity();
}

export async function logActivity({ type, action, detail, actor }) {
  const session = readSession();
  const entry = {
    id: `ACT-${Date.now()}`,
    at: new Date().toISOString(),
    type: type || 'action',
    action: action || 'Dashboard action',
    detail: detail || '',
    actor: actor || session?.name || 'Administrator',
    role: session?.role || 'Admin',
  };
  writeLocalActivity([entry, ...readLocalActivity()]);
  try {
    const res = await fetch('/api/activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-dashboard-key': DASHBOARD_PASSWORD,
      },
      body: JSON.stringify(entry),
    });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.activity)) writeLocalActivity(json.activity);
    }
  } catch {
    /* keep local copy */
  }
  return entry;
}

