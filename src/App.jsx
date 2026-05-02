import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from './components/scene/Scene'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { ScrollHint } from './components/ui/ScrollHint'
import { projects } from './data/projects'
import { useWindowScrollSetup } from './hooks/useWindowScroll'

const SCROLL_PAGES = Math.round(projects.length * 3.5)

export default function App() {
  useWindowScrollSetup()

  return (
    <>
      <div style={{ height: `${SCROLL_PAGES * 100}vh` }} aria-hidden="true" />
      <ScrollHint />
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 200 }}
        gl={{ antialias: true }}
        style={{ position: 'fixed', inset: 0 }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <Scene />
        </Suspense>
      </Canvas>
    </>
  )
}
