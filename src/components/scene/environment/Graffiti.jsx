import { Suspense } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { SCENE } from '@/config/scene'
import { projects } from '@/data/projects'

const { BUFFER_START, SEGMENT_LENGTH, TUNNEL_WIDTH } = SCENE

// Opposing wall of project 1
const project1Wall = projects[1].wall  // 'right'
const WALL_X  = project1Wall === 'left' ?  TUNNEL_WIDTH / 2 - 0.01 : -TUNNEL_WIDTH / 2 + 0.01
const ROT_Y   = project1Wall === 'left' ? -Math.PI / 2             :  Math.PI / 2
const GRAFFITI_Z = -(BUFFER_START + SEGMENT_LENGTH * 0.5) + 7.2  

const GRAFFITI_W = 2.6
const GRAFFITI_H = GRAFFITI_W / (501 / 200)  // preserve source aspect ratio ≈ 1.04

function GraffitiMesh() {
  const texture = useTexture('/assets/graffiti.png')
  return (
    <mesh position={[WALL_X, 2.0, GRAFFITI_Z]} rotation={[0, ROT_Y, 0]}>
      <planeGeometry args={[GRAFFITI_W, GRAFFITI_H]} />
      <meshBasicMaterial
        map={texture}
        transparent
        blending={THREE.MultiplyBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

export function Graffiti() {
  return (
    <Suspense fallback={null}>
      <GraffitiMesh />
    </Suspense>
  )
}
