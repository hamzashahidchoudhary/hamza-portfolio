import { motion } from 'framer-motion'

const W = 52
const H = 28
const PAD = 3
const KNOB = H - PAD * 2

export default function ThemeToggle({ isDark, onToggle, style }) {
  return (
    <motion.button
      onClick={e => { e.stopPropagation(); onToggle() }}
      whileTap={{ scale: 0.93 }}
      aria-label="Toggle dark mode"
      style={{
        position: 'relative',
        width: W, height: H,
        borderRadius: 999,
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        overflow: 'hidden',
        flexShrink: 0,
        ...style,
      }}
      animate={{
        background: isDark
          ? 'linear-gradient(135deg, #1a1a2e 0%, #232946 100%)'
          : 'linear-gradient(135deg, #7ec8f2 0%, #a3d9f5 100%)',
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <motion.svg
        width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', inset: 0 }}
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        {[
          [8, 7], [14, 16], [22, 9], [10, 20], [26, 18],
        ].map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x} cy={y} r={0.8}
            fill="#fff"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
          />
        ))}
      </motion.svg>

      <motion.div
        animate={{ opacity: isDark ? 0 : 1, x: isDark ? 6 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ position: 'absolute', right: 3, bottom: 3, width: 26, height: 14 }}
      >
        <svg width="26" height="14" viewBox="0 0 26 14">
          <ellipse cx="10" cy="9" rx="8" ry="4.2" fill="rgba(255,255,255,0.85)" />
          <ellipse cx="17" cy="7" rx="6" ry="3.4" fill="rgba(255,255,255,0.7)" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ x: isDark ? W - KNOB - PAD : PAD }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        style={{
          position: 'absolute', top: PAD, left: 0,
          width: KNOB, height: KNOB, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <motion.div
          animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.5 : 1, rotate: isDark ? 90 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: 'absolute', width: KNOB, height: KNOB, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #ffe08a, #ffb020)',
            boxShadow: '0 0 8px rgba(255,176,32,0.7)',
          }}
        />
        <motion.div
          animate={{ opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.5, rotate: isDark ? 0 : -90 }}
          transition={{ duration: 0.35 }}
          style={{
            position: 'absolute', width: KNOB, height: KNOB, borderRadius: '50%',
            background: 'radial-gradient(circle at 65% 35%, #f4f4f8, #cfd3e0)',
            boxShadow: '0 0 8px rgba(200,210,255,0.5)',
          }}
        >
          <div style={{
            position: 'absolute', top: '8%', left: '2%',
            width: '78%', height: '78%', borderRadius: '50%',
            background: '#232946',
          }} />
        </motion.div>
      </motion.div>
    </motion.button>
  )
}