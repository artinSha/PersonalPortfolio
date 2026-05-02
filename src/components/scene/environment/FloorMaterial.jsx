import { useMemo } from 'react'
import * as THREE from 'three'

// Light cream/beige large tiles — 2×2 tiles per canvas, each tile 0.6 world units
function makeFloorTexture() {
  const W = 256
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = W
  const ctx = canvas.getContext('2d')

  const GRID   = W / 2   // 128px per tile
  const GROUT  = 3
  const COLORS = ['#eae4d4', '#e6e0d0', '#ece6d6']

  ctx.fillStyle = '#c4beb2'   // grout color fills first
  ctx.fillRect(0, 0, W, W)

  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
      ctx.fillStyle = COLORS[(r + c) % COLORS.length]
      ctx.fillRect(
        c * GRID + GROUT,
        r * GRID + GROUT,
        GRID - GROUT * 2,
        GRID - GROUT * 2
      )
    }
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  return tex
}

// Tactile paving — 4×4 grid of raised studs on yellow, canvas = 0.5×0.5 world units
function makeTactileTexture() {
  const W = 64
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = W
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#d4b800'
  ctx.fillRect(0, 0, W, W)

  const COUNT   = 4
  const SPACING = W / COUNT   // 16px
  const RADIUS  = 5

  for (let r = 0; r < COUNT; r++) {
    for (let c = 0; c < COUNT; c++) {
      const cx = (c + 0.5) * SPACING
      const cy = (r + 0.5) * SPACING

      // Stud body (shadow/base)
      ctx.fillStyle = '#a88a00'
      ctx.beginPath()
      ctx.arc(cx, cy, RADIUS, 0, Math.PI * 2)
      ctx.fill()

      // Stud top highlight
      ctx.fillStyle = '#f0d000'
      ctx.beginPath()
      ctx.arc(cx - 1, cy - 1, RADIUS - 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  return tex
}

// Each canvas = 2×2 tiles, each tile = 0.6 world units → canvas covers 1.2 world units
const FLOOR_CANVAS_WORLD = 2 * 0.6   // 1.2
// Tactile canvas covers 0.5 × 0.5 world units (strip width = 0.5)
const TACTILE_WORLD = 0.5

const STRIP_WIDTH = 0.5

export function FloorMaterial({ length, width }) {
  const floorTex = useMemo(() => {
    const t = makeFloorTexture()
    t.repeat.set(width / FLOOR_CANVAS_WORLD, length / FLOOR_CANVAS_WORLD)
    return t
  }, [length, width])

  const tactileTex = useMemo(() => {
    const t = makeTactileTexture()
    // 1 repeat across strip width, tile every 0.5 units along length
    t.repeat.set(1, length / TACTILE_WORLD)
    return t
  }, [length])

  return (
    <group>
      {/* Light cream floor tiles */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -length / 2]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial map={floorTex} roughness={0.75} metalness={0.0} />
      </mesh>

      {/* Center tactile paving strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, -length / 2]}>
        <planeGeometry args={[STRIP_WIDTH, length]} />
        <meshStandardMaterial map={tactileTex} roughness={0.85} metalness={0.0} />
      </mesh>
    </group>
  )
}
