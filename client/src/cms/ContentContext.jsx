import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { clone, DEFAULT_CONTENT } from '../data/defaults';
import {
  clearLocalContent,
  DASHBOARD_PASSWORD,
  hydrate,
  readLocalContent,
  writeLocalContent,
} from './utils';

const ContentContext = createContext(null);

async function fetchPublished() {
  try {
    const apiRes = await fetch('/api/content');
    if (apiRes.ok) {
      const json = await apiRes.json();
      if (json?.content) return json.content;
    }
  } catch {
    /* API unavailable */
  }
  try {
    const staticRes = await fetch('/cms.json', { cache: 'no-store' });
    if (!staticRes.ok) return null;
    const text = await staticRes.text();
    const json = JSON.parse(text);
    return json?.content || json;
  } catch {
    return null;
  }
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => hydrate(readLocalContent()));
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetchPublished().then((published) => {
      if (cancelled || !published) return;
      const merged = hydrate(published);
      writeLocalContent(merged);
      setContent(merged);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const save = async (next) => {
    const merged = hydrate(next);
    setSaving(true);
    setStatus('');
    writeLocalContent(merged);
    setContent(merged);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-dashboard-key': DASHBOARD_PASSWORD,
        },
        body: JSON.stringify({ content: merged }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setStatus(err.message || 'Saved in this browser. Server publish failed — keep the API running to update the live site.');
        setSaving(false);
        return { ok: true, published: false };
      }
      setStatus('Published. All visitors will see the updated content.');
      setSaving(false);
      return { ok: true, published: true };
    } catch {
      setStatus('Saved in this browser. Start the server (`npm run dev`) to publish for every visitor.');
      setSaving(false);
      return { ok: true, published: false };
    }
  };

  const reset = async () => {
    const fresh = clone(DEFAULT_CONTENT);
    clearLocalContent();
    setContent(fresh);
    try {
      await fetch('/api/content', {
        method: 'DELETE',
        headers: { 'x-dashboard-key': DASHBOARD_PASSWORD },
      });
    } catch {
      /* ignore */
    }
    setStatus('Restored original website copy.');
    return fresh;
  };

  const value = useMemo(
    () => ({ content, setContent, save, reset, saving, status, setStatus }),
    [content, saving, status]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
