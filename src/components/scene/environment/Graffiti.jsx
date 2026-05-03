import { Suspense } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { SCENE } from '@/config/scene'
import { projects } from '@/data/projects'

const { BUFFER_START, SEGMENT_LENGTH, TUNNEL_WIDTH } = SCENE

// Original graffiti — opposing wall of project 2 (index 1)
const proj2Wall = projects[1].wall
const WALL_X   = proj2Wall === 'left' ?  TUNNEL_WIDTH / 2 - 0.01 : -TUNNEL_WIDTH / 2 + 0.01
const ROT_Y    = proj2Wall === 'left' ? -Math.PI / 2             :  Math.PI / 2
const GRAFFITI_Z = -(BUFFER_START + SEGMENT_LENGTH * 0.5) + 7.2

const GRAFFITI_W = 2.6
const GRAFFITI_H = GRAFFITI_W / (501 / 200)

// Intro graffiti — opposing wall of project 1 (index 0)
const proj1Wall   = projects[0].wall
const INTRO_WALL_X = proj1Wall === 'left' ?  TUNNEL_WIDTH / 2 - 0.01 : -TUNNEL_WIDTH / 2 + 0.01
const INTRO_ROT_Y  = proj1Wall === 'left' ? -Math.PI / 2             :  Math.PI / 2
const INTRO_Z      = -(BUFFER_START + 0 * SEGMENT_LENGTH + SEGMENT_LENGTH * 0.5) + 2

const INTRO_W = 2.6
const INTRO_H = INTRO_W / (501 / 200)

// King graffiti — same wall as water-ad (left wall), just before the pillar at Z = -21
const KING_Z = -(BUFFER_START + 2 * SEGMENT_LENGTH) + 1
const KING_W = 1.5
const KING_H = KING_W * (3 / 4)

function GraffitiMesh() {
  const texture      = useTexture('/assets/graffiti.png')
  const introTexture = useTexture('/assets/graffiti_intro.png')
  const kingTexture  = useTexture('/assets/king-graffiti.png')

  return (
    <>
      <mesh position={[WALL_X, 2.0, GRAFFITI_Z]} rotation={[0, ROT_Y, 0]}>
        <planeGeometry args={[GRAFFITI_W, GRAFFITI_H]} />
        <meshBasicMaterial
          map={texture}
          transparent
          blending={THREE.MultiplyBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[INTRO_WALL_X, 2, INTRO_Z]} rotation={[0, INTRO_ROT_Y, 0]}>
        <planeGeometry args={[INTRO_W, INTRO_H]} />
        <meshBasicMaterial
          map={introTexture}
          transparent
          blending={THREE.MultiplyBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[WALL_X, 1.5, KING_Z]} rotation={[0, ROT_Y, 0]}>
        <planeGeometry args={[KING_W, KING_H]} />
        <meshBasicMaterial
          map={kingTexture}
          transparent
          blending={THREE.MultiplyBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  )
}

export function Graffiti() {
  return (
    <Suspense fallback={null}>
      <GraffitiMesh />
    </Suspense>
  )
}
