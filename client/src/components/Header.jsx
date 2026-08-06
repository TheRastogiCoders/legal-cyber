import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV } from '../data/content';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setOpenDrop(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    return () => document.body.classList.remove('nav-open');
  }, [open]);

  return (
    <header className={`site-header${open ? ' site-header--open' : ''}`}>
      <div className="container nav-wrap">
        <Link
          to="/"
          className="brand"
          onClick={() => {
            setOpen(false);
            setOpenDrop(null);
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}
        >
          <img src="/logo.png" alt="Lawsake" className="brand-logo" />
        </Link>

        <button
          type="button"
          className={`menu-toggle${open ? ' is-open' : ''}`}
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-toggle__bar" aria-hidden="true" />
          <span className="menu-toggle__bar" aria-hidden="true" />
          <span className="menu-toggle__bar" aria-hidden="true" />
        </button>

        <nav id="site-nav" className={`nav ${open ? 'open' : ''}`}>
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className={`dropdown ${openDrop === item.label ? 'open' : ''}`}>
                <button
                  type="button"
                  className="nav-link nav-link--parent"
                  aria-expanded={openDrop === item.label}
                  onClick={() => setOpenDrop((v) => (v === item.label ? null : item.label))}
                >
                  <span>{item.label}</span>
                  <span className="nav-chevron" aria-hidden="true">
                    ▾
                  </span>
                </button>
                <div className="dropdown-menu">
                  <NavLink to={item.to} onClick={() => setOpen(false)} end>
                    Overview
                  </NavLink>
                  {item.children.map((child) => (
                    <NavLink key={child.to} to={child.to} onClick={() => setOpen(false)}>
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link${item.cta ? ' nav-cta' : ''}${isActive && !item.cta ? ' active' : ''}`
                }
                onClick={() => setOpen(false)}
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>
      </div>

      {open ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </header>
  );
}
