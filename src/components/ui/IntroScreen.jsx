import '../../styles/overlay.css'

export function IntroScreen({ domRef }) {
  return (
    <div ref={domRef} className="intro-screen">
      <div className="intro-screen__content">
        <p className="intro-screen__sub">Software Engineer</p>
        <h1 className="intro-screen__name">Artin Shahpouri</h1>
        <p className="intro-screen__hint">↓ scroll to explore</p>
      </div>
    </div>
  )
}
