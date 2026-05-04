import { Suspense } from 'react'
import { useTexture } from '@react-three/drei'
import { SCENE } from '@/config/scene'
import { projects } from '@/data/projects'

const { TUNNEL_WIDTH, TUNNEL_HEIGHT, BUFFER_START, SEGMENT_LENGTH, BUFFER_END } = SCENE

const END_Z = -(BUFFER_START + projects.length * SEGMENT_LENGTH + BUFFER_END)

function TrainMesh() {
  const texture = useTexture('/assets/subway-train.png')
  return (
    <>
      <mesh position={[0, TUNNEL_HEIGHT / 2, END_Z]}>
        <planeGeometry args={[TUNNEL_WIDTH, TUNNEL_HEIGHT]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive="white"
          emissiveIntensity={0.05}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>
      {/* Station light — illuminates tunnel walls near the train */}
      <pointLight
        position={[0, TUNNEL_HEIGHT * 0.85, END_Z + 3]}
        color="#fff4e0"
        intensity={10}
        distance={12}
        decay={2}
      />
    </>
  )
}

export function TunnelEnd() {
  return (
    <Suspense fallback={null}>
      <TrainMesh />
    </Suspense>
  )
}
