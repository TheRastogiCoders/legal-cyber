import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../cms/ContentContext';
import { CMS_SECTIONS, emptyItem } from '../cms/schema';
import { clone } from '../data/defaults';
import {
  CMS_AUTH_KEY,
  DEVELOPER,
  DASHBOARD_PASSWORD,
  clearSession,
  fetchActivity,
  getPath,
  logActivity,
  readSession,
  setPath,
  timeAgo,
  writeSession,
} from '../cms/utils';
import './dashboard.css';

const GROUPS = ['Website', 'Pages', 'Knowledge', 'Legal'];

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function uploadImage(file) {
  const data = await fileToDataUrl(file);
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-dashboard-key': DASHBOARD_PASSWORD,
      },
      body: JSON.stringify({ name: file.name, data }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.url) {
        logActivity({ type: 'upload', action: 'Uploaded an image', detail: file.name });
        return json.url;
      }
    }
  } catch {
    /* fall through */
  }
  return data;
}

function moveItem(list, from, to) {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function clusterFields(fields) {
  const clusters = [];
  let copy = [];
  const flush = () => {
    if (!copy.length) return;
    clusters.push({ kind: 'copy', title: 'Copy', fields: copy });
    copy = [];
  };
  fields.forEach((field) => {
    if (field.type === 'image') {
      flush();
      clusters.push({ kind: 'image', title: field.label, fields: [field] });
    } else if (field.type === 'objectList' || field.type === 'stringList') {
      flush();
      clusters.push({ kind: 'list', title: field.label, fields: [field] });
    } else {
      copy.push(field);
    }
  });
  flush();
  return clusters;
}

function Icon({ name }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };
  if (name === 'grid') {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    );
  }
  if (name === 'external') {
    return (
      <svg {...common}>
        <path d="M14 5h5v5" />
        <path d="M19 5 10 14" />
        <path d="M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6" />
      </svg>
    );
  }
  if (name === 'clock') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    );
  }
  if (name === 'plus') {
    return (
      <svg {...common}>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
    );
  }
  if (name === 'user') {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 19c1.4-3.2 3.8-5 7-5s5.6 1.8 7 5" />
      </svg>
    );
  }
  if (name === 'menu') {
    return (
      <svg {...common}>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </svg>
    );
  }
  if (name === 'close') {
    return (
      <svg {...common}>
        <path d="M6 6l12 12" />
        <path d="M18 6 6 18" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 15V9h4v6" />
      <path d="M16 15V7h4v8" />
    </svg>
  );
}

function BrandLogo({ className = '' }) {
  return <img src="/logo.png" alt="Lawsake" className={`dash-logo ${className}`.trim()} />;
}

function initials(name) {
  return String(name || 'A')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'A';
}

function ActivityList({ items, empty = 'No activity yet.' }) {
  if (!items?.length) return <p className="dash-help">{empty}</p>;
  return (
    <ol className="dash-activity">
      {items.map((item) => (
        <li key={item.id}>
          <span className={`dash-activity__dot dash-activity__dot--${item.type}`} />
          <div>
            <strong>{item.action}</strong>
            <p>
              {item.actor} · {item.role || 'Admin'}
              {item.detail ? ` · ${item.detail}` : ''}
            </p>
          </div>
          <time>{timeAgo(item.at)}</time>
        </li>
      ))}
    </ol>
  );
}

function TextInput({ value, onChange, multiline, placeholder }) {
  if (multiline) {
    return (
      <textarea
        className="dash-input dash-input--area"
        rows={4}
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  return (
    <input
      className="dash-input"
      type="text"
      value={value || ''}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function ImageField({ value, onChange }) {
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);

  const applyFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setBusy(true);
    try {
      onChange(await uploadImage(file));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className={`dash-image${over ? ' is-over' : ''}${busy ? ' is-busy' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        applyFile(e.dataTransfer.files?.[0]);
      }}
    >
      <div className="dash-image__preview">
        {value ? <img src={value} alt="" /> : <div className="dash-image__empty">Drop an image here</div>}
        <label className="dash-image__overlay">
          {busy ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
          <input
            type="file"
            accept="image/*"
            disabled={busy}
            onChange={(e) => {
              applyFile(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
        </label>
      </div>
      <div className="dash-image__controls">
        <span className="dash-kicker">Image URL</span>
        <TextInput value={value} onChange={onChange} placeholder="https://… or uploaded file path" />
        <p className="dash-help">Upload a file, drag it onto the preview, or paste any image URL.</p>
      </div>
    </div>
  );
}

function StringListEditor({ value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const update = (i, next) => onChange(items.map((item, idx) => (idx === i ? next : item)));
  return (
    <div className="dash-list">
      {items.map((item, i) => (
        <div className="dash-list__row" key={i}>
          <span className="dash-index">{String(i + 1).padStart(2, '0')}</span>
          <textarea
            className="dash-input dash-input--area"
            rows={2}
            value={item}
            onChange={(e) => update(i, e.target.value)}
          />
          <div className="dash-row-actions">
            <button type="button" className="dash-icon-btn" onClick={() => onChange(moveItem(items, i, i - 1))} aria-label="Move up">
              ↑
            </button>
            <button type="button" className="dash-icon-btn" onClick={() => onChange(moveItem(items, i, i + 1))} aria-label="Move down">
              ↓
            </button>
            <button type="button" className="dash-icon-btn dash-icon-btn--danger" onClick={() => onChange(items.filter((_, idx) => idx !== i))} aria-label="Remove">
              ×
            </button>
          </div>
        </div>
      ))}
      <button type="button" className="dash-add" onClick={() => onChange([...items, ''])}>
        + Add item
      </button>
    </div>
  );
}

function FieldControl({ field, value, onChange }) {
  if (field.type === 'textarea') return <TextInput value={value} onChange={onChange} multiline />;
  if (field.type === 'image') return <ImageField value={value} onChange={onChange} />;
  if (field.type === 'checkbox') {
    return (
      <label className="dash-check">
        <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
        {field.label}
      </label>
    );
  }
  if (field.type === 'stringList') return <StringListEditor value={value} onChange={onChange} />;
  if (field.type === 'objectList') {
    return (
      <ObjectListEditor
        value={value}
        fields={field.fields}
        itemLabel={field.itemLabel}
        onChange={onChange}
        imageMap={field.imageMap}
        imageKey={field.imageKey}
        rootOnChange={field.rootOnChange}
        draft={field.draft}
      />
    );
  }
  return <TextInput value={value} onChange={onChange} />;
}

function ObjectListEditor({ value, fields, itemLabel, onChange, imageMap, imageKey, rootOnChange, draft }) {
  const items = Array.isArray(value) ? value : [];
  const [open, setOpen] = useState(0);

  const updateItem = (i, key, nextVal) => {
    const current = items[i] || {};
    if (imageKey && key === imageKey && imageMap && rootOnChange && draft) {
      const oldKey = current[imageKey];
      const map = { ...(draft[imageMap] || {}) };
      if (oldKey && oldKey !== nextVal && map[oldKey]) {
        map[nextVal] = map[oldKey];
        delete map[oldKey];
        rootOnChange(setPath(draft, imageMap, map));
      }
    }
    onChange(items.map((item, idx) => (idx === i ? { ...item, [key]: nextVal } : item)));
  };

  const setImage = (slug, url) => {
    if (!imageMap || !rootOnChange || !draft) return;
    rootOnChange(setPath(draft, `${imageMap}.${slug}`, url));
  };

  return (
    <div className="dash-collection">
      {items.map((item, i) => {
        const label = item?.[itemLabel] || `Item ${i + 1}`;
        const slug = imageKey ? item?.[imageKey] : '';
        const mappedImage = imageMap && draft && slug ? getPath(draft, `${imageMap}.${slug}`) : '';
        const ownImage = item?.image;
        const thumb = mappedImage || ownImage;
        return (
          <div className={`dash-item${open === i ? ' is-open' : ''}`} key={i}>
            <div className="dash-item__head">
              <button type="button" className="dash-item__toggle" onClick={() => setOpen(open === i ? -1 : i)}>
                {thumb ? <img src={thumb} alt="" /> : <span className="dash-item__num">{String(i + 1).padStart(2, '0')}</span>}
                <span className="dash-item__title">{label}</span>
                <span className="dash-item__chevron">{open === i ? '▾' : '▸'}</span>
              </button>
              <div className="dash-row-actions">
                <button type="button" className="dash-icon-btn" onClick={() => onChange(moveItem(items, i, i - 1))} aria-label="Move up">
                  ↑
                </button>
                <button type="button" className="dash-icon-btn" onClick={() => onChange(moveItem(items, i, i + 1))} aria-label="Move down">
                  ↓
                </button>
              </div>
            </div>
            {open === i ? (
              <div className="dash-item__body">
                {imageMap && slug ? (
                  <label className="dash-field">
                    <span>Image</span>
                    <ImageField value={mappedImage} onChange={(url) => setImage(slug, url)} />
                  </label>
                ) : null}
                {fields.map((field) => (
                  <label className="dash-field" key={field.key}>
                    {field.type !== 'checkbox' ? <span>{field.label}</span> : null}
                    <FieldControl
                      field={{ ...field, draft, rootOnChange }}
                      value={item[field.key]}
                      onChange={(next) => updateItem(i, field.key, next)}
                    />
                  </label>
                ))}
                <button
                  type="button"
                  className="dash-remove"
                  onClick={() => {
                    onChange(items.filter((_, idx) => idx !== i));
                    setOpen(Math.max(0, i - 1));
                  }}
                >
                  Remove this item
                </button>
              </div>
            ) : null}
          </div>
        );
      })}
      <button type="button" className="dash-add" onClick={() => onChange([...items, emptyItem(fields)])}>
        + Add item
      </button>
    </div>
  );
}

function RequestPage({ session, onLogged }) {
  const [title, setTitle] = useState('');
  const [pathHint, setPathHint] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('Normal');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('/api/page-requests', { headers: { 'x-dashboard-key': DASHBOARD_PASSWORD } })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (Array.isArray(json?.requests)) setRequests(json.requests);
      })
      .catch(() => {});
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    setNotice('');
    const payload = {
      title,
      pathHint,
      description,
      urgency,
      requestedBy: session?.name || 'Administrator',
    };
    try {
      const res = await fetch('/api/page-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-dashboard-key': DASHBOARD_PASSWORD,
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.message || 'Could not send the request.');
        setBusy(false);
        return;
      }
      if (Array.isArray(json.requests)) setRequests(json.requests);
      await logActivity({
        type: 'request',
        action: 'Requested a new page',
        detail: title,
      });
      onLogged?.();
      const body = [
        `New page request from Lawsake dashboard`,
        `Requested by: ${payload.requestedBy}`,
        `Page name: ${title}`,
        pathHint ? `Suggested URL: ${pathHint}` : '',
        `Urgency: ${urgency}`,
        '',
        description,
      ]
        .filter(Boolean)
        .join('\n');
      window.open(
        `mailto:${DEVELOPER.email}?subject=${encodeURIComponent(`Lawsake: add page — ${title}`)}&body=${encodeURIComponent(body)}`,
        '_blank'
      );
      setTitle('');
      setPathHint('');
      setDescription('');
      setUrgency('Normal');
      setNotice('Request saved. Your email app should open so you can send it to the developer.');
    } catch {
      setError('Could not reach the server. Email the developer directly instead.');
    }
    setBusy(false);
  };

  return (
    <main className="dash-main dash-request">
      <section className="dash-dev-banner">
        <p className="dash-kicker">Add a page</p>
        <h1>You can edit every existing page here. A new page needs the developer.</h1>
        <p>
          Tell {DEVELOPER.name} what the page should be called, what it should say, and which images to use. They will build
          the page, then it will appear in this dashboard for you to update later.
        </p>
        <div className="dash-hero-panel__actions">
          <a className="dash-save dash-save--light" href={`mailto:${DEVELOPER.email}`}>
            Email {DEVELOPER.name}
          </a>
          <a className="dash-ghost dash-ghost--light" href={DEVELOPER.website} target="_blank" rel="noreferrer">
            Open developer website
          </a>
        </div>
      </section>

      <form className="dash-panel dash-request__form" onSubmit={submit}>
        <div className="dash-panel__head">
          <h2>Page request</h2>
          <span>Sent to {DEVELOPER.name}</span>
        </div>
        <div className="dash-request__grid">
          <label className="dash-field">
            <span>Page name</span>
            <input className="dash-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Our Team" required />
          </label>
          <label className="dash-field">
            <span>Suggested URL (optional)</span>
            <input className="dash-input" value={pathHint} onChange={(e) => setPathHint(e.target.value)} placeholder="e.g. /team" />
          </label>
        </div>
        <label className="dash-field">
          <span>What should be on this page?</span>
          <textarea
            className="dash-input dash-input--area"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Headings, sections, images, buttons, and any example you want copied."
            required
          />
        </label>
        <div className="dash-request__actions">
          <label className="dash-field">
            <span>Urgency</span>
            <select className="dash-input" value={urgency} onChange={(e) => setUrgency(e.target.value)}>
              <option>Normal</option>
              <option>Soon</option>
              <option>Urgent</option>
            </select>
          </label>
          <button className="dash-save" type="submit" disabled={busy}>
            {busy ? 'Sending…' : 'Send to developer'}
          </button>
        </div>
        {error ? <p className="dash-error">{error}</p> : null}
        {notice ? <p className="dash-status">{notice}</p> : null}
      </form>

      <section className="dash-panel dash-request__history">
        <div className="dash-panel__head">
          <h2>Previous requests</h2>
          <span>{requests.length} sent</span>
        </div>
        {requests.length ? (
          <ul className="dash-request-list">
            {requests.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.title}</strong>
                  <p>
                    {item.pathHint || 'No URL yet'} · {item.urgency} · {item.requestedBy}
                  </p>
                </div>
                <time>{timeAgo(item.createdAt)}</time>
              </li>
            ))}
          </ul>
        ) : (
          <div className="dash-empty">
            <strong>No page requests yet</strong>
            <p>When you send a brief, it will be listed here.</p>
          </div>
        )}
      </section>
    </main>
  );
}

function FieldBlock({ field, draft, patch }) {
  return (
    <label className="dash-field">
      {field.type !== 'checkbox' ? <span>{field.label}</span> : null}
      <FieldControl
        field={{ ...field, draft, rootOnChange: patch }}
        value={getPath(draft, field.path)}
        onChange={(next) => patch(setPath(draft, field.path, next))}
      />
    </label>
  );
}

function Overview({ draft, onOpen, activity, session }) {
  const hero = getPath(draft, 'images.hero');
  const name = getPath(draft, 'site.name');
  const tagline = getPath(draft, 'site.tagline');
  const stats = [
    { label: 'Practice areas', value: draft.practiceAreas?.length || 0, id: 'practice' },
    { label: 'Articles', value: draft.articles?.length || 0, id: 'knowledge' },
    { label: 'FAQs', value: draft.faqs?.length || 0, id: 'faq' },
    { label: 'Glossary terms', value: draft.glossary?.length || 0, id: 'glossary' },
  ];

  return (
    <div className="dash-overview">
      <section className="dash-hero-panel">
        {hero ? <img className="dash-hero-panel__bg" src={hero} alt="" /> : null}
        <div className="dash-hero-panel__shade" />
        <div className="dash-hero-panel__copy">
          <BrandLogo className="dash-logo--hero" />
          <p className="dash-kicker dash-kicker--light">Command centre</p>
          <h1>Update the {name} website from one place</h1>
          <p>{tagline}. Every field is pre-filled with the live copy — change only what needs to change, then save.</p>
          <div className="dash-hero-panel__actions">
            <button type="button" className="dash-save" onClick={() => onOpen('home')}>
              Edit homepage
            </button>
            <Link className="dash-ghost dash-ghost--light" to="/" target="_blank" rel="noreferrer">
              Open live site
            </Link>
          </div>
        </div>
      </section>

      <div className="dash-stats">
        {stats.map((item) => (
          <button type="button" className="dash-stat" key={item.id} onClick={() => onOpen(item.id)}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <section className="dash-dev-banner dash-dev-banner--card">
        <div>
          <p className="dash-kicker">New page</p>
          <h2>Want to add a page that is not here yet?</h2>
          <p>Editing existing pages is yours. Building a brand-new page (new URL, new layout) is a developer task — send the brief from this dashboard.</p>
        </div>
        <button type="button" className="dash-save dash-save--light" onClick={() => onOpen('request')}>
          Contact developer
        </button>
      </section>

      <div className="dash-split">
        <section className="dash-panel">
          <div className="dash-panel__head">
            <h2>User activity</h2>
            <button type="button" className="dash-text-btn" onClick={() => onOpen('activity')}>
              View all
            </button>
          </div>
          <ActivityList items={activity.slice(0, 6)} />
        </section>
        <section className="dash-panel dash-admin-card">
          <div className="dash-panel__head">
            <h2>Admin login</h2>
            <span>Active session</span>
          </div>
          <div className="dash-admin">
            <span className="dash-admin__avatar">{initials(session?.name)}</span>
            <div>
              <strong>{session?.name || 'Administrator'}</strong>
              <p>{session?.role || 'Admin'} · signed in {session?.loggedInAt ? timeAgo(session.loggedInAt) : 'now'}</p>
            </div>
          </div>
          <p className="dash-help">Only signed-in admins can publish copy and images to the live website.</p>
          <button type="button" className="dash-ghost" onClick={() => onOpen('admin')}>
            Open admin profile
          </button>
        </section>
      </div>

      <div className="dash-page-grid">
        {CMS_SECTIONS.map((section) => {
          const image = section.previewImage ? getPath(draft, section.previewImage) : '';
          const title = section.previewTitle ? getPath(draft, section.previewTitle) : section.label;
          return (
            <button type="button" className="dash-page-card" key={section.id} onClick={() => onOpen(section.id)}>
              <div className="dash-page-card__media">
                {image ? <img src={image} alt="" /> : <span>{section.group}</span>}
              </div>
              <div className="dash-page-card__body">
                <span>{section.group}</span>
                <strong>{section.label}</strong>
                <p>{title}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Login({ onOk, content }) {
  const [name, setName] = useState('Administrator');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const hero = content?.images?.hero;

  const submit = async (e) => {
    e.preventDefault();
    if (password === DASHBOARD_PASSWORD) {
      const session = {
        name: name.trim() || 'Administrator',
        role: 'Admin',
        loggedInAt: new Date().toISOString(),
      };
      try {
        sessionStorage.setItem(CMS_AUTH_KEY, '1');
      } catch {
        /* ignore */
      }
      writeSession(session);
      await logActivity({
        type: 'login',
        action: 'Admin signed in',
        detail: 'Dashboard access',
        actor: session.name,
      });
      onOk(session);
      return;
    }
    setError('Incorrect password.');
  };

  return (
    <div className="dash-login">
      {hero ? <img className="dash-login__bg" src={hero} alt="" /> : null}
      <div className="dash-login__veil" />

      <div className="dash-login__frame">
        <section className="dash-login__intro">
          <p className="dash-kicker dash-kicker--light">Lawsake · Content studio</p>
          <h1>The website, under your control.</h1>
          <p>Change headlines, images, and practice pages without touching code. New pages are built by the developer.</p>
          <ul>
            <li>Publish live copy in one save</li>
            <li>Every action is logged to your name</li>
            <li>Request a new page from inside the dashboard</li>
          </ul>
          <Link className="dash-login__site" to="/">
            View live website →
          </Link>
        </section>

        <form className="dash-login__card" onSubmit={submit}>
          <div className="dash-login__logo-wrap">
            <BrandLogo />
          </div>
          <p className="dash-kicker">Admin access</p>
          <h2>Sign in</h2>
          <p className="dash-login__lede">Use your name so activity on the site is recorded against this session.</p>

          <label className="dash-field">
            <span>Admin name</span>
            <input className="dash-input" type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="username" />
          </label>
          <label className="dash-field">
            <span>Password</span>
            <div className="dash-login__password">
              <input
                className="dash-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                autoFocus
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>
          {error ? <p className="dash-error">{error}</p> : null}
          <button className="dash-login__submit" type="submit">
            Enter dashboard
          </button>
          <p className="dash-login__dev">
            Need a page that does not exist yet?{' '}
            <a href={`mailto:${DEVELOPER.email}`}>Contact {DEVELOPER.name}</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { content, save, reset, saving, status, setStatus } = useContent();
  const [authed, setAuthed] = useState(false);
  const [session, setSession] = useState(() => readSession());
  const [sectionId, setSectionId] = useState('overview');
  const [draft, setDraft] = useState(() => clone(content));
  const [dirty, setDirty] = useState(false);
  const [query, setQuery] = useState('');
  const [savedAt, setSavedAt] = useState('');
  const [activity, setActivity] = useState([]);
  const [navOpen, setNavOpen] = useState(false);

  const goTo = (id) => {
    setSectionId(id);
    setNavOpen(false);
  };

  const refreshActivity = async () => {
    setActivity(await fetchActivity());
  };

  useEffect(() => {
    try {
      if (sessionStorage.getItem(CMS_AUTH_KEY) === '1') {
        setAuthed(true);
        setSession(readSession() || { name: 'Administrator', role: 'Admin', loggedInAt: new Date().toISOString() });
      }
    } catch {
      /* ignore */
    }
    document.title = 'Content dashboard — Lawsake';
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);

  useEffect(() => {
    if (authed) refreshActivity();
  }, [authed]);

  useEffect(() => {
    if (!dirty) setDraft(clone(content));
  }, [content, dirty]);

  const section = useMemo(
    () => CMS_SECTIONS.find((item) => item.id === sectionId) || null,
    [sectionId]
  );

  const filteredNav = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CMS_SECTIONS.filter((item) => !q || item.label.toLowerCase().includes(q) || item.group?.toLowerCase().includes(q));
  }, [query]);

  const groupedNav = useMemo(
    () => GROUPS.map((group) => ({ group, items: filteredNav.filter((item) => item.group === group) })).filter((g) => g.items.length),
    [filteredNav]
  );

  const clusters = useMemo(() => (section ? clusterFields(section.fields) : []), [section]);

  const patch = (next) => {
    setDraft(next);
    setDirty(true);
    setStatus('');
  };

  const onSave = useCallback(async () => {
    await save(draft);
    setDirty(false);
    setSavedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    const label = CMS_SECTIONS.find((item) => item.id === sectionId)?.label || 'Overview';
    await logActivity({ type: 'save', action: 'Published website content', detail: label });
    refreshActivity();
  }, [draft, save, sectionId]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (dirty && !saving) onSave();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dirty, saving, onSave]);

  useEffect(() => {
    const onLeave = (e) => {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onLeave);
    return () => window.removeEventListener('beforeunload', onLeave);
  }, [dirty]);

  useEffect(() => {
    if (!navOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setNavOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [navOpen]);

  const onReset = async () => {
    if (!window.confirm('Restore the original website copy and images? Your dashboard edits will be cleared.')) return;
    const fresh = await reset();
    setDraft(clone(fresh));
    setDirty(false);
    setSavedAt('');
    await logActivity({ type: 'restore', action: 'Restored original website copy' });
    refreshActivity();
  };

  const onLogout = async () => {
    await logActivity({ type: 'logout', action: 'Admin signed out', actor: session?.name });
    clearSession();
    setAuthed(false);
    setSession(null);
    setSectionId('overview');
  };

  if (!authed) return <Login onOk={(next) => { setSession(next); setAuthed(true); }} content={content} />;

  const previewImage = section?.previewImage ? getPath(draft, section.previewImage) : '';
  const previewTitle = section?.previewTitle ? getPath(draft, section.previewTitle) : section?.label;

  return (
    <div className={`dash${navOpen ? ' is-nav-open' : ''}`}>
      <button type="button" className="dash-side-backdrop" aria-label="Close menu" aria-hidden={!navOpen} tabIndex={navOpen ? 0 : -1} onClick={() => setNavOpen(false)} />
      <aside className="dash-side" id="dash-nav">
        <div className="dash-brand">
          <BrandLogo />
          <span>Content studio</span>
          <button type="button" className="dash-side__close" onClick={() => setNavOpen(false)} aria-label="Close menu">
            <Icon name="close" />
          </button>
        </div>

        <div className="dash-admin dash-admin--side">
          <span className="dash-admin__avatar">{initials(session?.name)}</span>
          <div>
            <strong>{session?.name || 'Administrator'}</strong>
            <p>Admin login active</p>
          </div>
        </div>

        <div className={`dash-pill${dirty ? ' is-dirty' : ''}`}>{dirty ? 'Unsaved edits' : savedAt ? `Saved ${savedAt}` : 'In sync with site'}</div>

        <label className="dash-search">
          <span className="visually-hidden">Search pages</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pages…" />
        </label>

        <nav>
          <button type="button" className={sectionId === 'overview' ? 'is-active' : ''} onClick={() => goTo('overview')}>
            <Icon name="grid" />
            Overview
          </button>
          <button type="button" className={sectionId === 'activity' ? 'is-active' : ''} onClick={() => goTo('activity')}>
            <Icon name="clock" />
            User activity
          </button>
          <button type="button" className={sectionId === 'admin' ? 'is-active' : ''} onClick={() => goTo('admin')}>
            <Icon name="user" />
            Admin login
          </button>
          <button type="button" className={sectionId === 'request' ? 'is-active' : ''} onClick={() => goTo('request')}>
            <Icon name="plus" />
            Add a page
          </button>
          {groupedNav.map((group) => (
            <div className="dash-nav-group" key={group.group}>
              <p>{group.group}</p>
              {group.items.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={item.id === sectionId ? 'is-active' : ''}
                  onClick={() => goTo(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <button type="button" className="dash-view" onClick={onLogout}>
          Sign out
        </button>
        <Link className="dash-view" to="/" target="_blank" rel="noreferrer">
          <Icon name="external" />
          View live website
        </Link>
      </aside>

      <div className="dash-workspace">
        <header className="dash-topbar">
          <div className="dash-topbar__brand">
            <button
              type="button"
              className="dash-nav-toggle"
              aria-label="Open pages menu"
              aria-expanded={navOpen}
              aria-controls="dash-nav"
              onClick={() => setNavOpen(true)}
            >
              <Icon name="menu" />
            </button>
            <div className="dash-logo-plate">
              <BrandLogo />
            </div>
            <span>Website control</span>
          </div>
          <div className="dash-topbar__meta">
            <button type="button" className="dash-chip dash-chip--activity" onClick={() => goTo('activity')}>
              {activity.length} actions logged
            </button>
            <button type="button" className="dash-chip dash-chip--admin" onClick={() => goTo('admin')}>
              <span>{initials(session?.name)}</span>
              <em>{session?.name || 'Admin'}</em>
            </button>
            <button type="button" className="dash-ghost dash-topbar__signout" onClick={onLogout}>
              Sign out
            </button>
          </div>
        </header>

        {sectionId === 'overview' ? (
          <Overview draft={draft} onOpen={goTo} activity={activity} session={session} />
        ) : sectionId === 'activity' ? (
          <main className="dash-main">
            <section className="dash-panel">
              <div className="dash-panel__head">
                <h2>User activity</h2>
                <span>{activity.length} events</span>
              </div>
              <p className="dash-help">Every admin sign-in, publish, image upload, and restore is listed here.</p>
              <ActivityList items={activity} empty="No activity recorded yet. Publish a change to start the log." />
            </section>
          </main>
        ) : sectionId === 'admin' ? (
          <main className="dash-main">
            <section className="dash-panel dash-admin-card">
              <div className="dash-panel__head">
                <h2>Admin login</h2>
                <span>Signed in</span>
              </div>
              <div className="dash-admin dash-admin--large">
                <span className="dash-admin__avatar">{initials(session?.name)}</span>
                <div>
                  <strong>{session?.name || 'Administrator'}</strong>
                  <p>Role: {session?.role || 'Admin'}</p>
                  <p>Session started {session?.loggedInAt ? new Date(session.loggedInAt).toLocaleString() : 'this visit'}</p>
                </div>
              </div>
              <p className="dash-help">This dashboard is limited to administrators. Sign out when you leave the machine.</p>
              <div className="dash-bar__actions">
                <button type="button" className="dash-ghost" onClick={onLogout}>
                  Sign out
                </button>
                <button type="button" className="dash-save" onClick={() => goTo('overview')}>
                  Back to overview
                </button>
              </div>
            </section>
          </main>
        ) : sectionId === 'request' ? (
          <RequestPage session={session} onLogged={refreshActivity} />
        ) : (
          <main className="dash-main">
            <header className="dash-preview">
              {previewImage ? <img src={previewImage} alt="" /> : <div className="dash-preview__fallback" />}
              <div className="dash-preview__shade" />
              <div className="dash-preview__copy">
                <p className="dash-kicker dash-kicker--light">{section.group}</p>
                <h1>{section.label}</h1>
                <p>{section.hint || previewTitle}</p>
              </div>
              {section.href ? (
                <Link className="dash-preview__open" to={section.href} target="_blank" rel="noreferrer">
                  Preview page
                </Link>
              ) : null}
            </header>

            {status ? <p className={`dash-status${status.includes('failed') || status.includes('Start the server') ? ' is-warn' : ''}`}>{status}</p> : null}

            <div className="dash-form">
              {clusters.map((cluster, i) => (
                <section className={`dash-panel dash-panel--${cluster.kind}`} key={`${cluster.title}-${i}`}>
                  <div className="dash-panel__head">
                    <h2>{cluster.title}</h2>
                    {cluster.kind === 'image' ? <span>Shown on the live page immediately after save</span> : null}
                    {cluster.kind === 'list' ? <span>{getPath(draft, cluster.fields[0].path)?.length || 0} items</span> : null}
                  </div>
                  {cluster.fields.map((field) => (
                    <FieldBlock key={field.path} field={field} draft={draft} patch={patch} />
                  ))}
                </section>
              ))}
            </div>
          </main>
        )}

        <footer className="dash-dock">
          <div>
            <strong>{dirty ? 'You have unsaved changes' : 'All changes saved'}</strong>
            <span>
              Save to publish to the live website
              <span className="dash-dock__shortcut"> · Ctrl + S</span>
            </span>
          </div>
          <div className="dash-bar__actions">
            <button type="button" className="dash-ghost" onClick={onReset}>
              Restore defaults
            </button>
            <button type="button" className="dash-save" onClick={onSave} disabled={saving || !dirty}>
              {saving ? 'Publishing…' : 'Save & publish'}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

