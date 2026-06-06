import { useEffect, useRef, useState } from 'react'

// Cursor customizado: ponto + anel com lag suave.
// Cresce ao passar sobre elementos interativos. Só renderiza com mouse (pointer: fine).
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)

    const pos = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }
    let raf

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      const interactive = e.target.closest('a, button, [role="button"], [data-cursor-hover]')
      setHovering(!!interactive)
    }

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.15
      ring.y += (pos.y - ring.y) * 0.15
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-accent"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[100] rounded-full border transition-[width,height,border-color] duration-200 ${
          hovering
            ? 'h-14 w-14 border-accent-2/80'
            : 'h-8 w-8 border-accent/50'
        }`}
      />
    </>
  )
}
