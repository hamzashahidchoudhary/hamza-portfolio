import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)', padding: '2rem 0', position: 'relative', zIndex: 1 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <NavLink to="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted)', letterSpacing: '0.04em' }}>
          Muhammad Hamza
        </NavLink>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)' }}>
          © {new Date().getFullYear()} — Full Stack Developer
        </span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hamzashahidchoudhary/' },
            { label: 'Email', href: 'mailto:muhammad.hamza.dev@outlook.com' },
          ].map(s => (
            <a key={s.label} href={s.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', transition: 'color 0.18s' }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >{s.label}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
