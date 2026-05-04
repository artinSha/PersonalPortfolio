import { Suspense } from 'react'
import { useTexture } from '@react-three/drei'

const W = 1.3
const H = W / (2 / 3)
const F = 0.05

function AdPanelMesh({ src, position, rotY }) {
  const texture = useTexture(src)
  return (
    <group position={position} rotation={[0, rotY, 0]}>
      <mesh>
        <boxGeometry args={[W + F * 2, H + F * 2, 0.03]} />
        <meshStandardMaterial color="#d8d4cc" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial map={texture} roughness={0.6} />
      </mesh>
    </group>
  )
}

export function AdPanel(props) {
  return (
    <Suspense fallback={null}>
      <AdPanelMesh {...props} />
    </Suspense>
  )
}
