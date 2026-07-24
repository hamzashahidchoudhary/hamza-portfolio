import { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W = window.innerWidth, H = window.innerHeight
    let animId
    const trail = []
    let mouse = { x: -200, y: -200 }

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W; canvas.height = H
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY })

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      trail.push({ x: mouse.x, y: mouse.y, life: 1 })
      if (trail.length > 28) trail.shift()

      const dark = document.documentElement.getAttribute('data-theme') === 'dark'

      trail.forEach((p, i) => {
        p.life -= 0.035
        if (p.life <= 0) return
        const size = p.life * 7
        const alpha = p.life * 0.5
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = dark
          ? `rgba(79,142,247,${alpha})`
          : `rgba(37,99,235,${alpha})`
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
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 999,
    }} />
  )
}