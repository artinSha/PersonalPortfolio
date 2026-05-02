import { SCENE } from '@/config/scene'
import { projects } from '@/data/projects'

const PANEL_W      = 0.7
const PANEL_H      = 1.7
const PANEL_Y      = 1.1
const FRAME_W      = 0.76
const FRAME_H      = 1.76
const FRAME_DEPTH  = 0.04
const FRAME_COLOR  = '#3a2c08'
const FACE_COLOR   = '#c89010'

const WALL_SIDES = [
  { key: 'left',  wallX: -(SCENE.TUNNEL_WIDTH / 2), rotY:  Math.PI / 2 },
  { key: 'right', wallX:  (SCENE.TUNNEL_WIDTH / 2), rotY: -Math.PI / 2 },
]

function buildPanelZPositions() {
  const { BUFFER_START, SEGMENT_LENGTH, BUFFER_END } = SCENE
  const n = projects.length
  const zs = []
  zs.push(-(BUFFER_START * 0.25))
  zs.push(-(BUFFER_START * 0.75))
  for (let i = 0; i < n; i++) {
    zs.push(-(BUFFER_START + i * SEGMENT_LENGTH + SEGMENT_LENGTH * 0.2))
    zs.push(-(BUFFER_START + i * SEGMENT_LENGTH + SEGMENT_LENGTH * 0.8))
  }
  zs.push(-(BUFFER_START + n * SEGMENT_LENGTH + BUFFER_END * 0.5))
  return zs
}

const PANEL_ZS = buildPanelZPositions()

export function WallPanels() {
  return (
    <group>
      {WALL_SIDES.map(({ key, wallX, rotY }) =>
        PANEL_ZS.map((z, idx) => {
          const sign    = Math.sign(wallX)           // -1 left, +1 right
          const frameX  = wallX - sign * (FRAME_DEPTH / 2)
          const faceX   = wallX - sign * (FRAME_DEPTH + 0.003)

          return (
            <group key={`${key}-${idx}`} position={[0, PANEL_Y, z]}>
              {/* Recessed dark frame */}
              <mesh position={[frameX, 0, 0]}>
                <boxGeometry args={[FRAME_DEPTH, FRAME_H, FRAME_W]} />
                <meshStandardMaterial color={FRAME_COLOR} roughness={0.9} metalness={0.1} />
              </mesh>
              {/* Amber face panel */}
              <mesh position={[faceX, 0, 0]} rotation={[0, rotY, 0]}>
                <planeGeometry args={[PANEL_W, PANEL_H]} />
                <meshStandardMaterial
                  color={FACE_COLOR}
                  roughness={0.55}
                  metalness={0.3}
                  emissive={FACE_COLOR}
                  emissiveIntensity={0.05}
                />
              </mesh>
            </group>
          )
        })
      )}
    </group>
  )
}
