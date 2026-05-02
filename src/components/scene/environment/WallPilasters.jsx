import { SCENE } from '@/config/scene'
import { projects } from '@/data/projects'

const PILLAR_RADIUS = 0.14
const PILLAR_SEGS   = 16
const PILLAR_COLOR  = '#f5c300'

export function WallPilasters() {
  const { TUNNEL_WIDTH, TUNNEL_HEIGHT, BUFFER_START, SEGMENT_LENGTH } = SCENE
  const n = projects.length

  const zPositions = [
    0,
    ...Array.from({ length: n + 1 }, (_, i) => -(BUFFER_START + i * SEGMENT_LENGTH)),
  ]

  // Half-embedded into wall so pillars look structurally attached
  const sides = [
    -(TUNNEL_WIDTH / 2) + PILLAR_RADIUS * 0.5,
     (TUNNEL_WIDTH / 2) - PILLAR_RADIUS * 0.5,
  ]

  return (
    <group>
      {sides.map((x, si) =>
        zPositions.map((z, zi) => (
          <mesh key={`${si}-${zi}`} position={[x, TUNNEL_HEIGHT / 2, z]}>
            <cylinderGeometry args={[PILLAR_RADIUS, PILLAR_RADIUS, TUNNEL_HEIGHT, PILLAR_SEGS]} />
            <meshStandardMaterial color={PILLAR_COLOR} roughness={0.5} metalness={0.1} />
          </mesh>
        ))
      )}
    </group>
  )
}
