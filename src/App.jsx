import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from './components/scene/Scene'
import { IntroScreen } from './components/ui/IntroScreen'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { projects } from './data/projects'
import { useWindowScrollSetup } from './hooks/useWindowScroll'

const SCROLL_PAGES = Math.round(projects.length * 3.5)

export default function App() {
  const introRef = useRef()
  useWindowScrollSetup()

  return (
    <>
      <IntroScreen domRef={introRef} />
      <div style={{ height: `${SCROLL_PAGES * 100}vh` }} aria-hidden="true" />
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 200 }}
        gl={{ antialias: true }}
        style={{ position: 'fixed', inset: 0 }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <Scene introRef={introRef} />
        </Suspense>
      </Canvas>
    </>
  )
}
