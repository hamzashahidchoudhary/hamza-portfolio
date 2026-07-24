import { useRef, useState } from 'react'

export default function MagneticButton({ children, className, style, onClick, href, target, rel }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = e => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    setPos({ x: dx * 0.35, y: dy * 0.35 })
  }

  const handleLeave = () => setPos({ x: 0, y: 0 })

  const props = {
    ref,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
    className,
    style: {
      ...style,
      transform: `translate(${pos.x}px, ${pos.y}px)`,
      transition: pos.x === 0 && pos.y === 0
        ? 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
        : 'transform 0.1s ease',
      display: 'inline-flex', alignItems: 'center',
    },
  }

  if (href) return <a href={href} target={target} rel={rel} {...props}>{children}</a>
  return <button {...props}>{children}</button>
}