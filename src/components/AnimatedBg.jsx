import { useEffect, useRef } from 'react'

export default function AnimatedBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let W = window.innerWidth, H = window.innerHeight
    let mouse = { x: W / 2, y: H / 2 }

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W; canvas.height = H
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY })

    const COUNT = Math.min(80, Math.floor(W * H / 15000))
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }))

    const orbs = [
      { x: W * 0.15, y: H * 0.25, r: 350, dx: 0.15, dy: 0.1 },
      { x: W * 0.80, y: H * 0.15, r: 280, dx: -0.12, dy: 0.14 },
      { x: W * 0.55, y: H * 0.70, r: 320, dx: 0.09, dy: -0.16 },
    ]

    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark'

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const dark = isDark()

      orbs.forEach(o => {
        o.x += o.dx; o.y += o.dy
        if (o.x < -o.r || o.x > W + o.r) o.dx *= -1
        if (o.y < -o.r || o.y > H + o.r) o.dy *= -1
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r)
        g.addColorStop(0, dark ? 'rgba(79,142,247,0.07)' : 'rgba(37,99,235,0.06)')
        g.addColorStop(0.5, dark ? 'rgba(124,58,237,0.04)' : 'rgba(124,58,237,0.03)')
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2)
        ctx.fill()
      })

      particles.forEach(p => {
        const dx = mouse.x - p.x, dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          p.vx += dx / dist * 0.015
          p.vy += dy / dist * 0.015
        }
        p.vx *= 0.99; p.vy *= 0.99
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = dark ? 'rgba(240,238,232,0.25)' : 'rgba(37,99,235,0.2)'
        ctx.fill()
      })

      const CONNECT_DIST = 130
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.3
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = dark ? `rgba(79,142,247,${alpha})` : `rgba(37,99,235,${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
        const dmx = particles[i].x - mouse.x
        const dmy = particles[i].y - mouse.y
        const dm = Math.sqrt(dmx * dmx + dmy * dmy)
        if (dm < 160) {
          const alpha = (1 - dm / 160) * 0.5
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = dark ? `rgba(79,142,247,${alpha})` : `rgba(37,99,235,${alpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0,
    }} />
  )
}