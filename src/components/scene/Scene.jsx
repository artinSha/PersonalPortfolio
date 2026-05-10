import { useMemo } from 'react'
import { CameraRig } from './CameraRig'
import { Hallway } from './environment/Hallway'
import { IntroSign } from './environment/IntroSign'
import { Staircase } from './environment/Staircase'
import { Graffiti } from './environment/Graffiti'
import { PosterWall } from './posters/PosterWall'
import { WallAds } from './environment/WallAds'
import { TunnelEnd } from './environment/TunnelEnd'
import { SubwayMap } from './SubwayMap'
import { projects } from '@/data/projects'
import { SCENE } from '@/config/scene'

export function Scene({ onActiveProject }) {
  const tunnelLength = useMemo(
    () => SCENE.BUFFER_START + projects.length * SCENE.SEGMENT_LENGTH + SCENE.BUFFER_END,
    []
  )

  return (
    <>
      <CameraRig onActiveProject={onActiveProject} />
      <Hallway length={tunnelLength} />
      <Staircase />
      <Graffiti />
      <IntroSign />
      <PosterWall projects={projects} />
      <SubwayMap />
      <WallAds />
      {/* <pointLight position={[0, 3.9, -24]} color="#d8e4ff" intensity={7} distance={11} decay={2} /> */}
      <TunnelEnd />
    </>
  )
}
