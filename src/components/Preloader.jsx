import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('draw')

  useEffect(() => {
    const start = performance.now()
    const DRAW_MS = 1400
    const FILL_MS = 500
    const HOLD_MS = 350

    let raf
    const tick = now => {
      const elapsed = now - start
      const pct = Math.min(100, Math.round((elapsed / (DRAW_MS + FILL_MS)) * 100))
      setProgress(pct)

      if (elapsed < DRAW_MS) {
        setPhase('draw')
        raf = requestAnimationFrame(tick)
      } else if (elapsed < DRAW_MS + FILL_MS) {
        setPhase('fill')
        raf = requestAnimationFrame(tick)
      } else if (elapsed < DRAW_MS + FILL_MS + HOLD_MS) {
        setPhase('hold')
        raf = requestAnimationFrame(tick)
      } else {
        setVisible(false)
        setTimeout(onDone, 650)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  const drawDuration = 1.4

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(6px)', scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: '#0a0a0f',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.35,
            backgroundImage: 'linear-gradient(rgba(37,99,235,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(circle at center, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 70%)',
          }} />

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: phase === 'draw' ? 0.5 : 0.8, scale: 1 }}
            transition={{ duration: 1.2 }}
            style={{
              position: 'absolute', width: 340, height: 340, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)',
              filter: 'blur(10px)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 0.4, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ position: 'absolute', left: '50%', marginLeft: -150, fontFamily: "'JetBrains Mono', monospace", fontSize: '2rem', color: '#2563eb', fontWeight: 300 }}
          >&lt;</motion.div>
          <motion.div
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 0.4, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ position: 'absolute', left: '50%', marginLeft: 120, fontFamily: "'JetBrains Mono', monospace", fontSize: '2rem', color: '#2563eb', fontWeight: 300 }}
          >/&gt;</motion.div>

          <svg width="180" height="180" viewBox="0 0 180 180" style={{ position: 'relative', zIndex: 1 }}>
            <motion.rect
              x="10" y="10" width="160" height="160" rx="32"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: drawDuration * 0.5, ease: 'easeInOut' }}
            />
            <motion.path
              d="M 48 122 L 48 58 L 68 100 L 90 58 L 90 122"
              fill="none"
              stroke="#f0eee8"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: drawDuration * 0.55, ease: 'easeInOut', delay: drawDuration * 0.2 }}
            />
            <motion.path
              d="M 100 58 L 100 122 M 100 90 L 132 90 M 132 58 L 132 122"
              fill="none"
              stroke="#4ade80"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: drawDuration * 0.55, ease: 'easeInOut', delay: drawDuration * 0.42 }}
            />
            {(phase === 'fill' || phase === 'hold') && (
              <motion.rect
                x="10" y="10" width="160" height="160" rx="32"
                fill="#2563eb"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.12, 0] }}
                transition={{ duration: 0.5 }}
              />
            )}
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ marginTop: '2rem', textAlign: 'center' }}
          >
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#6b7280', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
              {phase === 'draw' ? 'RENDERING PORTFOLIO' : phase === 'fill' ? 'FINALIZING' : 'READY'}
            </p>
            <div style={{ width: 160, height: 2, background: '#1e1e26', borderRadius: 2, overflow: 'hidden', margin: '0 auto' }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
                style={{ height: '100%', background: 'linear-gradient(90deg, #2563eb, #4ade80)' }}
              />
            </div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#4b4b57', marginTop: '0.6rem', letterSpacing: '0.1em' }}>
              {progress}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}