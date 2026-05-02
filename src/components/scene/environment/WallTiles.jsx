import { useMemo } from 'react'
import * as THREE from 'three'

const CW = 256, CH = 256
const CELL = 16
const GROUT = 2

export function makeTileTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = CW
  canvas.height = CH
  const ctx = canvas.getContext('2d')

  const TW = CELL - GROUT

  // Aged warm-cream palette — less uniform, more yellowed than pure white
  const COLORS = ['#d8d4c8', '#d4d0c4', '#dcd8cc', '#d6d2c6', '#dad6ca']

  // Darker, slightly warm grout
  ctx.fillStyle = '#646270'
  ctx.fillRect(0, 0, CW, CH)

  const count = CW / CELL
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      const x = c * CELL + GROUT / 2
      const y = r * CELL + GROUT / 2

      // Base tile color — use a mix of hashes for non-repeating variation
      ctx.fillStyle = COLORS[(r * 3 + c * 7 + 1) % COLORS.length]
      ctx.fillRect(x, y, TW, TW)

      // ~15% of tiles get a warm amber stain
      if ((r * 11 + c * 7) % 13 === 0) {
        ctx.fillStyle = 'rgba(170,130,50,0.09)'
        ctx.fillRect(x, y, TW, TW)
      }

      // ~6% of tiles are slightly darker (mineral deposits / age)
      if ((r * 13 + c * 5) % 19 === 0) {
        ctx.fillStyle = 'rgba(0,0,0,0.07)'
        ctx.fillRect(x, y, TW, TW)
      }

      // Glazed ceramic bevel
      ctx.fillStyle = 'rgba(255,255,255,0.15)'
      ctx.fillRect(x, y, TW, 1)
      ctx.fillRect(x, y, 1, TW)
      ctx.fillStyle = 'rgba(0,0,0,0.09)'
      ctx.fillRect(x, y + TW - 1, TW, 1)
      ctx.fillRect(x + TW - 1, y, 1, TW)
    }
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  return tex
}

// 16 tiles per canvas side × 0.25 world units per tile = 4.0 world units per canvas
const CANVAS_WORLD = (CW / CELL) * 0.25  // 4.0

const BAND_H     = 0.32    // wainscot band height
const BAND_Y     = 0.95    // band center — waist height
const BAND_COLOR = '#2a5c30'  // NYC hunter green

const BASE_H     = 0.22    // floor-edge baseboard height
const BASE_COLOR = '#0c0a08'  // near-black

export function WallTiles({ side, length, width, height }) {
  const texture = useMemo(() => {
    const t = makeTileTexture()
    t.repeat.set(length / CANVAS_WORLD, height / CANVAS_WORLD)
    return t
  }, [length, height])

  const wallX  = side === 'left' ? -width / 2 : width / 2
  const inward = side === 'left' ? 0.003 : -0.003
  const rotY   = side === 'left' ? Math.PI / 2 : -Math.PI / 2

  return (
    <group>
      {/* Main aged tile wall */}
      <mesh position={[wallX, height / 2, -length / 2]} rotation={[0, rotY, 0]}>
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial map={texture} roughness={0.52} metalness={0.02} />
      </mesh>

      {/* Hunter-green wainscot accent band */}
      <mesh position={[wallX + inward, BAND_Y, -length / 2]} rotation={[0, rotY, 0]}>
        <planeGeometry args={[length, BAND_H]} />
        <meshStandardMaterial color={BAND_COLOR} roughness={0.55} metalness={0.0} />
      </mesh>

      {/* Dark floor-edge baseboard */}
      <mesh position={[wallX + inward * 2, BASE_H / 2, -length / 2]} rotation={[0, rotY, 0]}>
        <planeGeometry args={[length, BASE_H]} />
        <meshStandardMaterial color={BASE_COLOR} roughness={0.9} metalness={0.0} />
      </mesh>
    </group>
  )
}
