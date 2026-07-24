import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  '$ whoami',
  'muhammad_hamza',
  '$ status --check',
  'full_stack_developer: ready',
  '$ launch portfolio.exe',
]

export default function Preloader({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (lineIdx >= LINES.length) {
      const t = setTimeout(() => {
        setVisible(false)
        setTimeout(onDone, 700)
      }, 400)
      return () => clearTimeout(t)
    }
    const line = LINES[lineIdx]
    if (charIdx < line.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), 22)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0) }, 220)
      return () => clearTimeout(t)
    }
  }, [lineIdx, charIdx, onDone])

  useEffect(() => {
    const total = LINES.reduce((a, l) => a + l.length, 0)
    const done = LINES.slice(0, lineIdx).reduce((a, l) => a + l.length, 0) + charIdx
    setProgress(Math.min(100, Math.round((done / total) * 100)))
  }, [lineIdx, charIdx])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: '#0a0a0d',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <motion.div
            exit={{ scale: 0.9 }}
            style={{
              width: 'min(440px, 86vw)', fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.85rem', color: '#4ade80',
              background: '#111114', border: '1px solid #26262e',
              borderRadius: 10, padding: '1.5rem', minHeight: 160,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', gap: 6, marginBottom: '1rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f87171' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fbbf24' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#4ade80' }} />
            </div>
            {LINES.slice(0, lineIdx).map((l, i) => (
              <div key={i} style={{ marginBottom: 6, opacity: l.startsWith('$') ? 0.6 : 1, color: l.startsWith('$') ? '#9ca3af' : '#4ade80' }}>{l}</div>
            ))}
            {lineIdx < LINES.length && (
              <div style={{ marginBottom: 6, opacity: LINES[lineIdx].startsWith('$') ? 0.6 : 1, color: LINES[lineIdx].startsWith('$') ? '#9ca3af' : '#4ade80' }}>
                {LINES[lineIdx].slice(0, charIdx)}
                <span style={{ animation: 'blinkCursor 0.9s step-end infinite' }}>▊</span>
              </div>
            )}
          </motion.div>

          <div style={{ width: 'min(440px, 86vw)', height: 2, background: '#1e1e24', borderRadius: 2, marginTop: '1.5rem', overflow: 'hidden' }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #2563eb, #4ade80)' }}
            />
          </div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#4b4b57', marginTop: '0.75rem', letterSpacing: '0.1em' }}>
            {progress}% LOADED
          </p>

          <style>{`@keyframes blinkCursor { 0%,50%{opacity:1} 51%,100%{opacity:0} }`}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}