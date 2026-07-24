import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const COMMANDS = [
  { id: 'home', label: 'Go to Home', hint: 'Page', action: nav => nav('/') },
  { id: 'about', label: 'Go to About', hint: 'Page', action: nav => nav('/about') },
  { id: 'projects', label: 'Go to Projects', hint: 'Page', action: nav => nav('/projects') },
  { id: 'skills', label: 'Go to Skills', hint: 'Page', action: nav => nav('/skills') },
  { id: 'contact', label: 'Go to Contact', hint: 'Page', action: nav => nav('/contact') },
  { id: 'email', label: 'Email Muhammad Hamza', hint: 'Action', action: () => window.location.href = 'mailto:muhammad.hamza.dev@outlook.com' },
  { id: 'linkedin', label: 'Open LinkedIn', hint: 'Link', action: () => window.open('https://www.linkedin.com/in/hamzashahidchoudhary/', '_blank') },
  { id: 'github', label: 'Open GitHub', hint: 'Link', action: () => window.open('https://github.com/hamzashahidchoudhary', '_blank') },
  { id: 'resume', label: 'Download Resume', hint: 'Download', action: () => window.open('/resume.pdf', '_blank') },
  { id: 'theme', label: 'Toggle Dark / Light Mode', hint: 'Action', action: (nav, extra) => extra?.toggleTheme?.() },
]

export default function CommandPalette({ toggleTheme }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const filtered = COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery(''); setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const handleKeyNav = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
    if (e.key === 'Enter' && filtered[selected]) {
      filtered[selected].action(navigate, { toggleTheme })
      setOpen(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 400,
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.5rem 0.9rem', borderRadius: 99,
          background: 'var(--bg2)', border: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)',
          cursor: 'pointer', boxShadow: 'var(--shadow)',
        }}
      >
        <span>⌘K</span>
        <span style={{ opacity: 0.6 }}>Search</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 2000 }}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed', top: '18vh', left: '50%', transform: 'translateX(-50%)',
                width: 'min(560px, 92vw)', zIndex: 2001,
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 14, boxShadow: '0 24px 70px rgba(0,0,0,0.35)', overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--muted)' }}>⌘</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => { setQuery(e.target.value); setSelected(0) }}
                  onKeyDown={handleKeyNav}
                  placeholder="Type a command or search..."
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--ink)',
                  }}
                />
                <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)', border: '1px solid var(--border)', padding: '0.15rem 0.4rem', borderRadius: 4 }}>ESC</kbd>
              </div>
              <div style={{ maxHeight: '50vh', overflowY: 'auto', padding: '0.5rem' }}>
                {filtered.length === 0 && (
                  <p style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem' }}>No results found</p>
                )}
                {filtered.map((cmd, i) => (
                  <div
                    key={cmd.id}
                    onMouseEnter={() => setSelected(i)}
                    onClick={() => { cmd.action(navigate, { toggleTheme }); setOpen(false) }}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '0.7rem 0.9rem', borderRadius: 8, cursor: 'pointer',
                      background: i === selected ? 'var(--accent-lt)' : 'transparent',
                      color: i === selected ? 'var(--accent)' : 'var(--ink2)',
                      transition: 'background 0.1s',
                    }}
                  >
                    <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{cmd.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)' }}>{cmd.hint}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}