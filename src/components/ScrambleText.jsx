import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&'

export default function ScrambleText({ text, trigger = true, delay = 0, style, className }) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!trigger) return
    let frame = 0
    const totalFrames = 22
    const timeout = setTimeout(() => {
      const run = () => {
        frame++
        const progress = frame / totalFrames
        setDisplay(
          text.split('').map((char, i) => {
            if (char === ' ') return ' '
            if (i / text.length < progress) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          }).join('')
        )
        if (frame < totalFrames) {
          frameRef.current = requestAnimationFrame(run)
        } else {
          setDisplay(text)
        }
      }
      frameRef.current = requestAnimationFrame(run)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(frameRef.current)
    }
  }, [text, trigger, delay])

  return <span style={style} className={className}>{display}</span>
}