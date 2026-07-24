import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CHARS = '01{}<>/;=+-*#'
const VIEW_W = 280
const VIEW_H = 170
const CELL = 13
const COLS = Math.ceil(VIEW_W / CELL) + 1
const ROWS = Math.ceil(VIEW_H / CELL) + 1

function randChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

function makeGrid() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => randChar())
  )
}

export default function Preloader({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [grid, setGrid] = useState(makeGrid)
  const startRef = useRef(null)

  useEffect(() => {
    const DURATION = 1900
    const HOLD = 350
    let raf
    const tick = now => {
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startRef.current
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100))
      setProgress(pct)
      if (elapsed < DURATION + HOLD) {
        raf = requestAnimationFrame(tick)
      } else {
        setVisible(false)
        setTimeout(onDone, 650)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  useEffect(() => {
    const iv = setInterval(() => {
      setGrid(g => g.map(row =>
        row.map(c => (Math.random() < 0.18 ? randChar() : c))
      ))
    }, 90)
    return () => clearInterval(iv)
  }, [])

  const fillFrac = progress / 100
  const fillTopY = VIEW_H - fillFrac * VIEW_H

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
          }}
        >
          <svg width={VIEW_W} height={VIEW_H} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} style={{ overflow: 'visible' }}>
            <defs>
              <clipPath id="mhLetters">
                <text
                  x={VIEW_W / 2} y={VIEW_H * 0.74}
                  textAnchor="middle"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight="800"
                  fontSize={VIEW_H * 0.72}
                  letterSpacing="-4"
                >MH</text>
              </clipPath>
            </defs>

            <text
              x={VIEW_W / 2} y={VIEW_H * 0.74}
              textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="800"
              fontSize={VIEW_H * 0.72}
              letterSpacing="-4"
              fill="none"
              stroke="rgba(37,99,235,0.35)"
              strokeWidth="1.5"
            >MH</text>

            <g clipPath="url(#mhLetters)">
              {grid.map((row, r) => (
                row.map((ch, c) => (
                  <text
                    key={`${r}-${c}`}
                    x={c * CELL}
                    y={r * CELL + 10}
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="12"
                    fill={(r * COLS + c) % 6 === 0 ? '#4ade80' : '#2563eb'}
                    opacity={0.9}
                  >{ch}</text>
                ))
              ))}

              <rect x="0" y="0" width={VIEW_W} height={Math.max(0, fillTopY)} fill="#0a0a0f" />

              <motion.rect
                x="0" y={fillTopY - 1.5} width={VIEW_W} height="2.5"
                fill="#4ade80"
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 0 5px #4ade80)' }}
              />
            </g>

            <text
              x={VIEW_W / 2} y={VIEW_H * 0.74}
              textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="800"
              fontSize={VIEW_H * 0.72}
              letterSpacing="-4"
              fill="none"
              stroke="rgba(240,238,232,0.55)"
              strokeWidth="1"
            >MH</text>
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ marginTop: '1.75rem', textAlign: 'center' }}
          >
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#6b7280', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
              {progress < 100 ? 'COMPILING PORTFOLIO' : 'READY'}
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