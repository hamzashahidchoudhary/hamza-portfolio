import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TECHS = [
  { name: 'HTML', color: '#e34f26' },
  { name: 'CSS', color: '#2965f1' },
  { name: 'JS', color: '#f0db4f' },
  { name: 'React', color: '#61dafb' },
  { name: 'Node', color: '#3c873a' },
  { name: 'Express', color: '#9ca3af' },
  { name: 'Laravel', color: '#ff2d20' },
  { name: '.NET', color: '#9b4de0' },
  { name: 'MongoDB', color: '#47a248' },
  { name: 'Postgres', color: '#4f8fd8' },
  { name: 'Flutter', color: '#02aef0' },
  { name: 'Firebase', color: '#ffca28' },
]

const VIEW_W = 300
const DROP_ZONE_H = 55
const LETTER_H = 170
const TOTAL_H = DROP_ZONE_H + LETTER_H
const DURATION = TECHS.length * 155 + 300
const HOLD = 350

export default function Preloader({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [drops, setDrops] = useState([])
  const startRef = useRef(null)
  const fillTopRef = useRef(TOTAL_H)
  const idRef = useRef(0)
  const techIdxRef = useRef(0)

  useEffect(() => {
    let raf
    const tick = now => {
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startRef.current
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100))
      setProgress(pct)
      const fillFrac = pct / 100
      fillTopRef.current = TOTAL_H - fillFrac * LETTER_H
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
      if (techIdxRef.current >= TECHS.length) return
      const tech = TECHS[techIdxRef.current]
      techIdxRef.current += 1
      const id = idRef.current++
      const x = VIEW_W * 0.3 + Math.random() * VIEW_W * 0.4
      const targetY = fillTopRef.current
      setDrops(d => [...d, { id, ...tech, x, targetY }])
      setTimeout(() => {
        setDrops(d => d.filter(item => item.id !== id))
      }, 600)
    }, 155)
    return () => clearInterval(iv)
  }, [])

  const fillTopY = fillTopRef.current
  const wavePhase = (Date.now() % 1400) / 1400 * Math.PI * 2
  const waveOffset = Math.sin(wavePhase) * 3
  const waveD = `M 0 ${fillTopY} C ${VIEW_W * 0.25} ${fillTopY - waveOffset}, ${VIEW_W * 0.25} ${fillTopY + waveOffset}, ${VIEW_W * 0.5} ${fillTopY} C ${VIEW_W * 0.75} ${fillTopY - waveOffset}, ${VIEW_W * 0.75} ${fillTopY + waveOffset}, ${VIEW_W} ${fillTopY} L ${VIEW_W} ${TOTAL_H} L 0 ${TOTAL_H} Z`

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
          <svg width={VIEW_W} height={TOTAL_H} viewBox={`0 0 ${VIEW_W} ${TOTAL_H}`} style={{ overflow: 'visible' }}>
            <defs>
              <clipPath id="mhLetters2">
                <text
                  x={VIEW_W / 2} y={DROP_ZONE_H + LETTER_H * 0.74}
                  textAnchor="middle"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight="800"
                  fontSize={LETTER_H * 0.72}
                  letterSpacing="-4"
                >MH</text>
              </clipPath>
              <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>

            <text
              x={VIEW_W / 2} y={DROP_ZONE_H + LETTER_H * 0.74}
              textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="800"
              fontSize={LETTER_H * 0.72}
              letterSpacing="-4"
              fill="none"
              stroke="rgba(59,130,246,0.35)"
              strokeWidth="1.5"
            >MH</text>

            <g clipPath="url(#mhLetters2)">
              <path d={waveD} fill="url(#waterGrad)" />
              {progress > 8 && [0, 1, 2].map(i => (
                <motion.circle
                  key={i}
                  cx={VIEW_W * (0.35 + i * 0.15)}
                  r={2 + (i % 2)}
                  fill="rgba(255,255,255,0.5)"
                  animate={{
                    cy: [TOTAL_H - 5, fillTopY + 4],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
                />
              ))}
            </g>

            <AnimatePresence>
              {drops.map(d => (
                <motion.text
                  key={d.id}
                  x={d.x}
                  textAnchor="middle"
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize="11"
                  fontWeight="700"
                  fill={d.color}
                  initial={{ y: -6, opacity: 0 }}
                  animate={{ y: d.targetY, opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 0.6, ease: 'easeIn', times: [0, 0.15, 0.8, 1] }}
                >{d.name}</motion.text>
              ))}
            </AnimatePresence>

            <text
              x={VIEW_W / 2} y={DROP_ZONE_H + LETTER_H * 0.74}
              textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="800"
              fontSize={LETTER_H * 0.72}
              letterSpacing="-4"
              fill="none"
              stroke="rgba(240,238,232,0.55)"
              strokeWidth="1"
            >MH</text>
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ marginTop: '1.5rem', textAlign: 'center' }}
          >
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#6b7280', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
              {progress < 100 ? 'LOADING STACK' : 'READY'}
            </p>
            <div style={{ width: 160, height: 2, background: '#1e1e26', borderRadius: 2, overflow: 'hidden', margin: '0 auto' }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
                style={{ height: '100%', background: 'linear-gradient(90deg, #3b82f6, #4ade80)' }}
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