import { useProgress, Html } from '@react-three/drei'
import '../../styles/overlay.css'

export function LoadingScreen() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="loading-screen">
        <div className="loading-screen__bar" style={{ width: `${progress}%` }} />
        <p className="loading-screen__text">{Math.round(progress)}%</p>
      </div>
    </Html>
  )
}
