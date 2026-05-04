import { useEffect, useRef } from 'react'
import '@/styles/overlay.css'

const GITHUB_URL = 'https://github.com/artinSha'
const LINKEDIN_URL = 'https://linkedin.com/in/artinshahpouri'
const RESUME_URL = 'https://drive.google.com/file/d/1Us3G7y2Ip_ycsohrhrLUC4D7H3gEFWMO/view?usp=drive_link'
const BIO = `Hello! I'm a CS student at Simon Fraser University and a Vancouver-based Software Developer.`

function drawTileCanvas() {
  const CW = 256, CELL = 16, GROUT = 2
  const canvas = document.createElement('canvas')
  canvas.width = CW
  canvas.height = CW
  const ctx = canvas.getContext('2d')
  const TW = CELL - GROUT
  const COLORS = ['#d8d4c8', '#d4d0c4', '#dcd8cc', '#d6d2c6', '#dad6ca']

  ctx.fillStyle = '#646270'
  ctx.fillRect(0, 0, CW, CW)

  const count = CW / CELL
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      const x = c * CELL + GROUT / 2
      const y = r * CELL + GROUT / 2
      ctx.fillStyle = COLORS[(r * 3 + c * 7 + 1) % COLORS.length]
      ctx.fillRect(x, y, TW, TW)
      if ((r * 11 + c * 7) % 13 === 0) {
        ctx.fillStyle = 'rgba(170,130,50,0.09)'
        ctx.fillRect(x, y, TW, TW)
      }
      if ((r * 13 + c * 5) % 19 === 0) {
        ctx.fillStyle = 'rgba(0,0,0,0.07)'
        ctx.fillRect(x, y, TW, TW)
      }
      ctx.fillStyle = 'rgba(255,255,255,0.15)'
      ctx.fillRect(x, y, TW, 1)
      ctx.fillRect(x, y, 1, TW)
      ctx.fillStyle = 'rgba(0,0,0,0.09)'
      ctx.fillRect(x, y + TW - 1, TW, 1)
      ctx.fillRect(x + TW - 1, y, 1, TW)
    }
  }
  return canvas
}

export function IntroScreen() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const tileCanvas = drawTileCanvas()
    el.style.backgroundImage = `url(${tileCanvas.toDataURL()})`
    el.style.backgroundSize = '512px 512px'

    function onScroll() {
      el.style.transform = `translateY(-${window.scrollY}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={ref} className="intro-screen">
      <div className="intro-screen__ceiling-glow" />

      <div className="intro-screen__panel">
        <div className="intro-screen__content">
          <div className="intro-screen__photo-wrap">
            <img
              className="intro-screen__photo"
              src="/assets/profile/photo.jpg"
              alt="Artin Shahpouri"
            />
          </div>

          <div className="intro-screen__text">
            <div className="intro-screen__name">Artin Shahpouri</div>
            <div className="intro-screen__role">Software Engineer</div>
            <div className="intro-screen__edu">Computing Science · SFU</div>
            <p className="intro-screen__bio">{BIO}</p>

            <div className="intro-screen__links">
              <a className="intro-screen__link" href={GITHUB_URL} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="intro-screen__link" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="intro-screen__link" href={RESUME_URL} target="_blank" rel="noreferrer">
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="intro-screen__wainscot" />
      <div className="intro-screen__baseboard" />

      <div className="intro-screen__scroll-guide">
        <div className="intro-screen__scroll-text">Scroll to explore</div>
        <div className="intro-screen__scroll-arrow">↓</div>
      </div>
    </div>
  )
}
