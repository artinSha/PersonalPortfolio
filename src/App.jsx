import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from './components/scene/Scene'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { IntroScreen } from './components/ui/IntroScreen'
import { projects } from './data/projects'
import { useWindowScrollSetup } from './hooks/useWindowScroll'

// +1 reserves one viewport-height of scroll for the intro screen
const SCROLL_PAGES = Math.round(projects.length * 3.5) + 1

export default function App() {
  useWindowScrollSetup()

  return (
    <>
      <div style={{ height: `${SCROLL_PAGES * 100}vh` }} aria-hidden="true" />
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 200 }}
        gl={{ antialias: true }}
        style={{ position: 'fixed', inset: 0 }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <Scene />
        </Suspense>
      </Canvas>
      <IntroScreen />
    </>
  )
}
