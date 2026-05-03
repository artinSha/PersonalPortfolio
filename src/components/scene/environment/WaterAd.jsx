import { Suspense } from 'react'
import { useTexture } from '@react-three/drei'
import { SCENE } from '@/config/scene'
import { projects } from '@/data/projects'

const { TUNNEL_WIDTH, POSTER_WALL_OFFSET, BUFFER_START, SEGMENT_LENGTH, CAMERA_Y } = SCENE

// Same wall as graffiti_intro — opposing side of project 2 (index 1)
const proj2Wall = projects[1].wall
const WALL_X    = proj2Wall === 'left'
  ?  TUNNEL_WIDTH / 2 - POSTER_WALL_OFFSET
  : -TUNNEL_WIDTH / 2 + POSTER_WALL_OFFSET
const ROT_Y     = proj2Wall === 'left' ? -Math.PI / 2 : Math.PI / 2

// Just after the graffiti_intro (which is at Z ≈ -7), still within segment 1
const AD_Z = -(BUFFER_START + 0 * SEGMENT_LENGTH + SEGMENT_LENGTH * 0.5) - 6.5

// Portrait ~2:3 aspect ratio
const AD_W  = 1.3
const AD_H  = AD_W / (2 / 3)
const FRAME = 0.05

function WaterAdMesh() {
  const texture = useTexture('/assets/water-ad.png')
  return (
    <group position={[WALL_X, CAMERA_Y + 0.5, AD_Z]} rotation={[0, ROT_Y, 0]}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[AD_W + FRAME * 2, AD_H + FRAME * 2, 0.03]} />
        <meshStandardMaterial color="#d8d4cc" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Ad surface */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[AD_W, AD_H]} />
        <meshStandardMaterial map={texture} roughness={0.6} />
      </mesh>
    </group>
  )
}

export function WaterAd() {
  return (
    <Suspense fallback={null}>
      <WaterAdMesh />
    </Suspense>
  )
}
