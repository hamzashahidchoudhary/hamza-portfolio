import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
]

export default function Navbar({ onToggleTheme, isDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          height: 64,
          background: scrolled || menuOpen ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(18px)' : 'none',
          borderBottom: scrolled || menuOpen ? '1px solid rgba(26,24,20,0.08)' : '1px solid transparent',
          transition: 'background 0.35s, border-color 0.35s',
        }}
      >
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <NavLink to="/" onClick={close} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500, color: '#fff',
            }}>MH</div>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink)' }}>
              Muhammad Hamza
            </span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                style={({ isActive }) => ({
                  fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 500,
                  padding: '0.4rem 0.85rem', borderRadius: 7,
                  color: isActive ? 'var(--accent)' : 'var(--ink2)',
                  background: isActive ? 'var(--accent-lt)' : 'transparent',
                  transition: 'all 0.18s',
                })}
              >{l.label}</NavLink>
            ))}
            <button
              onClick={onToggleTheme}
              style={{
                background: 'none', border: '1px solid var(--border)',
                borderRadius: 8, padding: '0.45rem 0.7rem',
                cursor: 'pointer', fontSize: '1rem',
                color: 'var(--ink2)', transition: 'all 0.2s',
              }}
              title="Toggle dark mode"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <NavLink to="/contact" className="btn btn-primary"
              style={{ marginLeft: '0.5rem', padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}
            >Hire Me</NavLink>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none', border: '1px solid var(--border)',
              borderRadius: 8, padding: '0.4rem 0.6rem',
              cursor: 'pointer', flexDirection: 'column', gap: 4,
            }}
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              style={{ display: 'block', width: 18, height: 1.5, background: 'var(--ink)', transformOrigin: 'center', borderRadius: 2 }} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1, width: menuOpen ? 0 : 18 }}
              style={{ display: 'block', width: 18, height: 1.5, background: 'var(--ink)', borderRadius: 2 }} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              style={{ display: 'block', width: 18, height: 1.5, background: 'var(--ink)', transformOrigin: 'center', borderRadius: 2 }} />
          </button>
        </div>
      </motion.header>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, zIndex: 199,
              background: 'var(--nav-bg)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)',
              padding: '1rem 1.25rem 1.5rem',
              display: 'flex', flexDirection: 'column', gap: '0.25rem',
            }}
          >
            {[...links, { to: '/contact', label: 'Contact' }].map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  onClick={close}
                  style={({ isActive }) => ({
                    display: 'block',
                    fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 500,
                    padding: '0.75rem 0.75rem', borderRadius: 8,
                    color: isActive ? 'var(--accent)' : 'var(--ink2)',
                    background: isActive ? 'var(--accent-lt)' : 'transparent',
                  })}
                >{l.label}</NavLink>
              </motion.div>
            ))}
            <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border)', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                onClick={() => { onToggleTheme(); close() }}
                style={{
                  background: 'none', border: '1px solid var(--border)',
                  borderRadius: 8, padding: '0.7rem',
                  cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500,
                  color: 'var(--ink2)', width: '100%',
                }}
              >
                {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
              <NavLink to="/contact" onClick={close} className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.7rem' }}
              >Hire Me →</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 700px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}