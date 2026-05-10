import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from './components/scene/Scene'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { IntroScreen } from './components/ui/IntroScreen'
import { ScrollHint } from './components/ui/ScrollHint'
import { ProjectOverlay } from './components/ui/ProjectOverlay'
import { projects } from './data/projects'
import { useWindowScrollSetup } from './hooks/useWindowScroll'

// +1 reserves one viewport-height of scroll for the intro screen
const SCROLL_PAGES = Math.round(projects.length * 3.5) + 1

const overlayStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 100,
  pointerEvents: 'none',
}

export default function App() {
  useWindowScrollSetup()
  const [activeProjectIndex, setActiveProjectIndex] = useState(null)
  const activeProject = activeProjectIndex !== null ? projects[activeProjectIndex] : null

  return (
    <>
      <div style={{ height: `${SCROLL_PAGES * 100}vh` }} aria-hidden="true" />
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 200 }}
        gl={{ antialias: true }}
        style={{ position: 'fixed', inset: 0 }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <Scene onActiveProject={setActiveProjectIndex} />
        </Suspense>
      </Canvas>
      {activeProject && (
        <div style={overlayStyle}>
          <ProjectOverlay project={activeProject} />
        </div>
      )}
      <IntroScreen />
      <ScrollHint />
    </>
  )
}
