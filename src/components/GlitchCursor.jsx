import { useEffect, useRef, useState } from 'react'

const ARROW_PATH = 'M3 3 L21 12 L13 13.5 L11.5 21 Z'

function CursorShape({ isPointer }) {
  if (isPointer) {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <rect x="7" y="11" width="11" height="9" rx="3" />
        <rect x="8" y="2" width="2.4" height="9" rx="1.2" />
        <rect x="11" y="1" width="2.4" height="10" rx="1.2" />
        <rect x="14" y="2.5" width="2.4" height="8.5" rx="1.2" />
        <rect x="17" y="4" width="2.2" height="7" rx="1.1" />
        <rect x="4" y="13" width="2.4" height="7" rx="1.2" transform="rotate(-25 5.2 16.5)" />
      </svg>
    )
  }
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d={ARROW_PATH} />
    </svg>
  )
}

export default function GlitchCursor() {
  const blackRef = useRef(null)
  const cyanRef = useRef(null)
  const magentaRef = useRef(null)
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    let pos = { x: -100, y: -100 }
    let glitchX = 0, glitchY = 0

    const apply = () => {
      if (blackRef.current) blackRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      if (cyanRef.current) cyanRef.current.style.transform = `translate(${pos.x - 2 + glitchX}px, ${pos.y - 2 + glitchY}px)`
      if (magentaRef.current) magentaRef.current.style.transform = `translate(${pos.x + 2 - glitchX}px, ${pos.y + 2 - glitchY}px)`
    }

    const move = e => {
      pos = { x: e.clientX, y: e.clientY }
      const target = e.target.closest && e.target.closest('a, button, [data-hover], input, textarea')
      setIsPointer(!!target)
      apply()
    }

    window.addEventListener('mousemove', move)

    const glitchInterval = setInterval(() => {
      glitchX = (Math.random() - 0.5) * 8
      glitchY = (Math.random() - 0.5) * 8
      apply()
      setTimeout(() => { glitchX = 0; glitchY = 0; apply() }, 90)
    }, 2600)

    return () => {
      window.removeEventListener('mousemove', move)
      clearInterval(glitchInterval)
    }
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      <div ref={cyanRef} style={{ position: 'absolute', top: 0, left: 0, color: '#00fff9', mixBlendMode: 'screen', willChange: 'transform' }}>
        <CursorShape isPointer={isPointer} />
      </div>
      <div ref={magentaRef} style={{ position: 'absolute', top: 0, left: 0, color: '#ff00c8', mixBlendMode: 'screen', willChange: 'transform' }}>
        <CursorShape isPointer={isPointer} />
      </div>
      <div ref={blackRef} style={{ position: 'absolute', top: 0, left: 0, color: '#0a0a0f', willChange: 'transform' }}>
        <CursorShape isPointer={isPointer} />
      </div>
    </div>
  )
}