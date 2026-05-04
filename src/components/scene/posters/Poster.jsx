import * as THREE from 'three'
import { useTexture, Html } from '@react-three/drei'
import { SCENE } from '@/config/scene'
import { ProjectOverlay } from '@/components/ui/ProjectOverlay'

const FRAME = 0.08
const FRAME_GEO   = new THREE.BoxGeometry(SCENE.POSTER_WIDTH + FRAME * 2, SCENE.POSTER_HEIGHT + FRAME * 2, 0.04)
const SURFACE_GEO = new THREE.PlaneGeometry(SCENE.POSTER_WIDTH, SCENE.POSTER_HEIGHT)

export function Poster({ position, rotationY, project, isActive }) {
  const texture = useTexture(project.image)

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Outer frame */}
      <mesh geometry={FRAME_GEO}>
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Poster surface */}
      <mesh geometry={SURFACE_GEO} position={[0, 0, 0.03]}>
        <meshStandardMaterial map={texture} emissiveMap={texture} emissive="white" emissiveIntensity={0.01} roughness={0.8} />
      </mesh>
      {/* HTML overlay — only mounted when active */}
      {isActive && (
        <Html
          center
          position={[0, 0, 0.1]}
          zIndexRange={[100, 0]}
          transform={false}
          style={{ pointerEvents: 'none' }}
        >
          <ProjectOverlay project={project} />
        </Html>
      )}
    </group>
  )
}
