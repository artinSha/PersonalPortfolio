import { useState, useMemo } from 'react'
import { CameraRig } from './CameraRig'
import { Hallway } from './environment/Hallway'
import { IntroSign } from './environment/IntroSign'
import { Staircase } from './environment/Staircase'
import { Graffiti } from './environment/Graffiti'
import { PosterWall } from './posters/PosterWall'
import { WaterAd } from './environment/WaterAd'
import { MetroAd } from './environment/MetroAd'
import { TapAd } from './environment/TapAd'
import { SubwayMap } from './SubwayMap'
import { projects } from '@/data/projects'
import { SCENE } from '@/config/scene'

export function Scene() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null)
  const tunnelLength = useMemo(
    () => SCENE.BUFFER_START + projects.length * SCENE.SEGMENT_LENGTH + SCENE.BUFFER_END,
    []
  )

  return (
    <>
      <CameraRig onActiveProject={setActiveProjectIndex} />
      <Hallway length={tunnelLength} />
      <Staircase />
      <Graffiti />
      <IntroSign />
      <PosterWall projects={projects} activeProjectIndex={activeProjectIndex} />
      <SubwayMap />
      <WaterAd />
      <MetroAd />
      <TapAd />
    </>
  )
}
