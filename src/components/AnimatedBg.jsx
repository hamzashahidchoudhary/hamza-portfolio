import { useEffect, useRef } from 'react'

export default function AnimatedBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let W = window.innerWidth, H = window.innerHeight

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W; canvas.height = H
    }
    resize()
    window.addEventListener('resize', resize)

    const orbs = [
      { x: W * 0.15, y: H * 0.25, r: 320, dx: 0.18, dy: 0.12, color: 'rgba(37,99,235,0.07)' },
      { x: W * 0.80, y: H * 0.15, r: 260, dx: -0.14, dy: 0.16, color: 'rgba(124,58,237,0.05)' },
      { x: W * 0.55, y: H * 0.70, r: 300, dx: 0.10, dy: -0.18, color: 'rgba(16,185,129,0.05)' },
      { x: W * 0.90, y: H * 0.60, r: 200, dx: -0.20, dy: -0.10, color: 'rgba(234,179,8,0.05)' },
    ]

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      orbs.forEach(o => {
        o.x += o.dx; o.y += o.dy
        if (o.x < -o.r || o.x > W + o.r) o.dx *= -1
        if (o.y < -o.r || o.y > H + o.r) o.dy *= -1
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r)
        g.addColorStop(0, o.color)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2)
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
        opacity: 1,
      }}
    />
  )
}
