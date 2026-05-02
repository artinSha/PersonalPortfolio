import { useMemo } from 'react'
import { SCENE } from '@/config/scene'
import { makeTileTexture } from './WallTiles'

const COUNT   = SCENE.STAIR_COUNT    // 8
const DEPTH   = SCENE.STAIR_DEPTH    // 0.5 per step in Z
const HEIGHT  = SCENE.STAIR_HEIGHT   // 0.2 per step in Y
const W       = SCENE.TUNNEL_WIDTH   // 4.8
const TOTAL_Z = COUNT * DEPTH        // 4.0
const TOTAL_Y = COUNT * HEIGHT       // 1.6
const CANVAS_WORLD = 4.0             // world units per tile canvas (matches WallTiles)

export function Staircase() {
  const wallTex = useMemo(() => {
    const t = makeTileTexture()
    t.repeat.set(TOTAL_Z / CANVAS_WORLD, (TOTAL_Y + SCENE.TUNNEL_HEIGHT) / CANVAS_WORLD)
    return t
  }, [])

  const wallH   = TOTAL_Y + SCENE.TUNNEL_HEIGHT   // 5.6
  const wallCenterY = (SCENE.TUNNEL_HEIGHT - TOTAL_Y) / 2  // 1.2

  return (
    <group>
      {/* Steps */}
      {Array.from({ length: COUNT }, (_, i) => (
        <group key={i}>
          {/* Tread — horizontal surface */}
          <mesh position={[0, -(i * HEIGHT) - 0.02, i * DEPTH + DEPTH / 2]}>
            <boxGeometry args={[W, 0.04, DEPTH]} />
            <meshStandardMaterial color="#c2bdb6" roughness={0.85} metalness={0.0} />
          </mesh>
          {/* Riser — vertical face */}
          <mesh position={[0, -(i * HEIGHT) - HEIGHT / 2, i * DEPTH]}>
            <boxGeometry args={[W, HEIGHT, 0.04]} />
            <meshStandardMaterial color="#aaa49e" roughness={0.9} metalness={0.0} />
          </mesh>
        </group>
      ))}

      {/* Left side wall */}
      <mesh position={[-W / 2, wallCenterY, TOTAL_Z / 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[TOTAL_Z, wallH]} />
        <meshStandardMaterial map={wallTex} roughness={0.52} metalness={0.02} />
      </mesh>

      {/* Right side wall */}
      <mesh position={[W / 2, wallCenterY, TOTAL_Z / 2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[TOTAL_Z, wallH]} />
        <meshStandardMaterial map={wallTex} roughness={0.52} metalness={0.02} />
      </mesh>

      {/* Back wall behind bottom landing */}
      <mesh position={[0, wallCenterY, TOTAL_Z + 0.02]}>
        <planeGeometry args={[W, wallH]} />
        <meshStandardMaterial color="#b8b2ac" roughness={0.9} metalness={0.0} />
      </mesh>

      {/* Bottom landing floor */}
      <mesh position={[0, -TOTAL_Y, TOTAL_Z]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, 0.04]} />
        <meshStandardMaterial color="#c2bdb6" roughness={0.85} metalness={0.0} />
      </mesh>
    </group>
  )
}
