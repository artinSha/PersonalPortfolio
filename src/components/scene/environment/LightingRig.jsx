import { SCENE } from '@/config/scene'

const STRIP_SPACING = 6
const LIGHT_COLOR = '#ffe8b0'

export function LightingRig({ length }) {
  const count = Math.ceil(length / STRIP_SPACING)

  return (
    <>
      <ambientLight intensity={0.04} />
      {Array.from({ length: count }, (_, i) => {
        const z = -(i * STRIP_SPACING + STRIP_SPACING * 0.5)
        return (
          <group key={i} position={[0, SCENE.TUNNEL_HEIGHT - 0.05, z]}>
            {/* Visible emissive tube */}
            <mesh>
              <boxGeometry args={[SCENE.TUNNEL_WIDTH * 0.7, 0.06, 0.18]} />
              <meshStandardMaterial
                color={LIGHT_COLOR}
                emissive={LIGHT_COLOR}
                emissiveIntensity={3}
              />
            </mesh>
            {/* Functional light */}
            <pointLight
              color={LIGHT_COLOR}
              intensity={8}
              distance={10}
              decay={2}
              position={[0, -0.2, 0]}
            />
          </group>
        )
      })}
    </>
  )
}
