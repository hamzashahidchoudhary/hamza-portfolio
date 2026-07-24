import { useRef, useState } from 'react'

export default function TiltCard({ children, style, className }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 })

  const handleMove = e => {
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rx = ((y / rect.height) - 0.5) * -14
    const ry = ((x / rect.width) - 0.5) * 14
    setTilt({ x: rx, y: ry, gx: (x / rect.width) * 100, gy: (y / rect.height) * 100 })
  }

  const handleLeave = () => setTilt({ x: 0, y: 0, gx: 50, gy: 50 })

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        ...style,
        transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' : 'transform 0.1s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit',
        background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
        pointerEvents: 'none', zIndex: 1,
        opacity: tilt.x === 0 && tilt.y === 0 ? 0 : 1,
        transition: 'opacity 0.3s',
      }} />
      {children}
    </div>
  )
}