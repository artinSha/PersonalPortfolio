import { useState, useEffect } from 'react'
import '@/styles/overlay.css'

export function ScrollHint() {
  const [visible, setVisible] = useState(true)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    function onScroll() {
      setVisible(false)
      setTimeout(() => setMounted(false), 300)
    }
    window.addEventListener('scroll', onScroll, { once: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!mounted) return null

  return (
    <div className={`scroll-hint${visible ? '' : ' scroll-hint--hidden'}`}>
      <div className="scroll-hint__text">Scroll to walk down the hallway</div>
      <div className="scroll-hint__arrow">↓</div>
    </div>
  )
}
