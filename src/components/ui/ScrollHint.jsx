import { useState, useEffect } from 'react'
import '@/styles/overlay.css'

export function ScrollHint() {
  const [inTunnel, setInTunnel] = useState(false)

  useEffect(() => {
    function onScroll() {
      setInTunnel(window.scrollY > window.innerHeight * 0.9)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!inTunnel) return null

  return (
    <div className="scroll-hint">
      <div className="scroll-hint__arrow">↓</div>
      <div className="scroll-hint__text">Scroll to walk</div>
    </div>
  )
}
