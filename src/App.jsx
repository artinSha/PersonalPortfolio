import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import { Scene } from './components/scene/Scene'
import { IntroScreen } from './components/ui/IntroScreen'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { projects } from './data/projects'

const SCROLL_PAGES = Math.round(projects.length * 3.5)

export default function App() {
  const introRef = useRef()

  return (
    <>
      <IntroScreen domRef={introRef} />
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 200 }}
        gl={{ antialias: true }}
        style={{ position: 'fixed', inset: 0 }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <ScrollControls pages={SCROLL_PAGES} damping={0.3} style={{ zIndex: 1 }}>
            <Scene introRef={introRef} />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </>
  )
}
