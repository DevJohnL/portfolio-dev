import { useEffect, useState } from 'react'

export function useMousePosition() {
  const [pos, setPos] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return pos
}
