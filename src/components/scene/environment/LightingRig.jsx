import { SCENE } from '@/config/scene'

const STRIP_SPACING = 6
const TUBE_COLOR  = '#c8d4ee'  // cool fluorescent blue-white
const LIGHT_COLOR = '#d8e4ff'

export function LightingRig({ length }) {
  const count = Math.ceil(length / STRIP_SPACING)
  return (
    <>
      <ambientLight intensity={0.04} color="#b8c4dc" />
      {Array.from({ length: count }, (_, i) => {
        const z = -(i * STRIP_SPACING + STRIP_SPACING * 0.5)
        const dimmed = i % 7 === 4   // one in seven fixtures is aging/dim
        return (
          <group key={i} position={[0, SCENE.TUNNEL_HEIGHT - 0.05, z]}>
            {/* Fluorescent tube */}
            <mesh>
              <boxGeometry args={[SCENE.TUNNEL_WIDTH * 0.72, 0.04, 0.12]} />
              <meshStandardMaterial
                color={TUBE_COLOR}
                emissive={TUBE_COLOR}
                emissiveIntensity={dimmed ? 1.2 : 3.5}
              />
            </mesh>
            <pointLight
              color={LIGHT_COLOR}
              intensity={dimmed ? 4 : 9}
              distance={11}
              decay={2}
              position={[0, -0.2, 0]}
            />
          </group>
        )
      })}
    </>
  )
}
