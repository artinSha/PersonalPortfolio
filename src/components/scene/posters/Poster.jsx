import { useTexture, Html } from '@react-three/drei'
import { SCENE } from '@/config/scene'
import { ProjectOverlay } from '@/components/ui/ProjectOverlay'

export function Poster({ position, rotationY, project, isActive }) {
  const texture = useTexture(project.image)
  const { POSTER_WIDTH, POSTER_HEIGHT } = SCENE
  const FRAME = 0.08

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Outer frame */}
      <mesh>
        <boxGeometry args={[POSTER_WIDTH + FRAME * 2, POSTER_HEIGHT + FRAME * 2, 0.04]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Poster surface */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[POSTER_WIDTH, POSTER_HEIGHT]} />
        <meshStandardMaterial map={texture} roughness={0.8} />
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
