import { Suspense } from 'react'
import { useTexture } from '@react-three/drei'
import { SCENE } from '@/config/scene'
import { projects } from '@/data/projects'

const { TUNNEL_WIDTH, POSTER_WALL_OFFSET, CAMERA_Y } = SCENE

const lastIdx  = projects.length - 1
const lastWall = projects[lastIdx].wall
const WALL_X   = lastWall === 'left'
  ?  TUNNEL_WIDTH / 2 - POSTER_WALL_OFFSET
  : -TUNNEL_WIDTH / 2 + POSTER_WALL_OFFSET
const ROT_Y    = lastWall === 'left' ? -Math.PI / 2 : Math.PI / 2

const AD_Z  = -25.5
const AD_W  = 1.3
const AD_H  = AD_W / (2 / 3)
const FRAME = 0.05

function DistanceAdMesh() {
  const texture = useTexture('/assets/distance-ad.png')
  return (
    <group position={[WALL_X, CAMERA_Y + 0.5, AD_Z]} rotation={[0, ROT_Y, 0]}>
      <mesh>
        <boxGeometry args={[AD_W + FRAME * 2, AD_H + FRAME * 2, 0.03]} />
        <meshStandardMaterial color="#d8d4cc" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[AD_W, AD_H]} />
        <meshStandardMaterial map={texture} roughness={0.6} />
      </mesh>
    </group>
  )
}

export function DistanceAd() {
  return (
    <Suspense fallback={null}>
      <DistanceAdMesh />
    </Suspense>
  )
}
