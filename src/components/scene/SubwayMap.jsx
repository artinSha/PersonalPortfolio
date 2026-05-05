import { Suspense } from 'react'
import { useTexture } from '@react-three/drei'
import { SCENE } from '@/config/scene'

// Map dimensions — image is landscape ~1.47:1
const MAP_W  = 2.2
const MAP_H  = MAP_W / 1.47   // ≈ 1.5
const FRAME  = 0.06

// Right wall, in the entry buffer before any project posters
const WALL_X = SCENE.TUNNEL_WIDTH / 2 - SCENE.POSTER_WALL_OFFSET 
const MAP_Z  = -2.0
const MAP_Y  = SCENE.CAMERA_Y + 0.4   // just above eye level center

function MapMesh() {
  const texture = useTexture('/assets/reduced/subway-map.jpg')
  return (
    <group position={[WALL_X, MAP_Y, MAP_Z]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[MAP_W + FRAME * 2, MAP_H + FRAME * 2, 0.03]} />
        <meshStandardMaterial color="#d8d4cc" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Map surface */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[MAP_W, MAP_H]} />
        <meshStandardMaterial map={texture} roughness={0.6} />
      </mesh>
    </group>
  )
}

export function SubwayMap() {
  return (
    <Suspense fallback={null}>
      <MapMesh />
    </Suspense>
  )
}
