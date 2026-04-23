import { useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { CameraRig } from './CameraRig'
import { Hallway } from './environment/Hallway'
import { PosterWall } from './posters/PosterWall'
import { projects } from '@/data/projects'
import { SCENE } from '@/config/scene'
import { scrollState } from '@/hooks/useWindowScroll'

function IntroFader({ introRef }) {
  useFrame(() => {
    if (!introRef?.current) return
    const opacity = Math.max(0, 1 - scrollState.offset * 10)
    introRef.current.style.opacity = opacity
    introRef.current.style.pointerEvents = opacity < 0.05 ? 'none' : 'auto'
  })
  return null
}

export function Scene({ introRef }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null)
  const tunnelLength = useMemo(
    () => SCENE.BUFFER_START + projects.length * SCENE.SEGMENT_LENGTH + SCENE.BUFFER_END,
    []
  )

  return (
    <>
      <CameraRig onActiveProject={setActiveProjectIndex} />
      <IntroFader introRef={introRef} />
      <Hallway length={tunnelLength} />
      <PosterWall projects={projects} activeProjectIndex={activeProjectIndex} />
    </>
  )
}
