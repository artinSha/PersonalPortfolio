import { useMemo } from 'react'
import * as THREE from 'three'
import { SCENE } from '@/config/scene'
import { makeTileTexture } from './WallTiles'

const RADIAL_SEGS = 24
const ARCH_RISE   = 0.5
const HALF_W      = SCENE.TUNNEL_WIDTH  / 2   // 3
const BASE_Y      = SCENE.TUNNEL_HEIGHT       // 4

// Arc-length integral for semi-ellipse (a=HALF_W, b=ARCH_RISE), computed once.
// ds/dt = sqrt((HALF_W·sin t)² + (ARCH_RISE·cos t)²)
const TOTAL_ARC_LEN = (() => {
  let s = 0
  for (let r = 0; r < RADIAL_SEGS; r++) {
    const t0 = (r       / RADIAL_SEGS) * Math.PI
    const t1 = ((r + 1) / RADIAL_SEGS) * Math.PI
    const tm = (t0 + t1) * 0.5
    const dx = HALF_W    * Math.sin(tm)
    const dy = ARCH_RISE * Math.cos(tm)
    s += Math.sqrt(dx * dx + dy * dy) * (t1 - t0)
  }
  return s   // ≈ 6.5
})()

const TILE_WORLD = 0.25   // world units per tile cell (matches WallTiles)

export function TunnelVault({ length }) {
  const geometry = useMemo(() => {
    const LENGTH_SEGS = Math.ceil(length / 2)

    // Cumulative arc lengths per radial vertex (for uniform UV)
    const cumArc = new Float32Array(RADIAL_SEGS + 1)
    cumArc[0] = 0
    for (let r = 0; r < RADIAL_SEGS; r++) {
      const t0 = (r       / RADIAL_SEGS) * Math.PI
      const t1 = ((r + 1) / RADIAL_SEGS) * Math.PI
      const tm = (t0 + t1) * 0.5
      const dx = HALF_W    * Math.sin(tm)
      const dy = ARCH_RISE * Math.cos(tm)
      cumArc[r + 1] = cumArc[r] + Math.sqrt(dx * dx + dy * dy) * (t1 - t0)
    }

    const numV  = (RADIAL_SEGS + 1) * (LENGTH_SEGS + 1)
    const positions = new Float32Array(numV * 3)
    const normals   = new Float32Array(numV * 3)
    const uvs       = new Float32Array(numV * 2)
    const indices   = new Uint32Array(RADIAL_SEGS * LENGTH_SEGS * 6)

    let vi = 0, uvi = 0
    for (let j = 0; j <= LENGTH_SEGS; j++) {
      const vCoord = j / LENGTH_SEGS
      const z      = -vCoord * length

      for (let r = 0; r <= RADIAL_SEGS; r++) {
        const t = (r / RADIAL_SEGS) * Math.PI
        positions[vi    ] = -HALF_W * Math.cos(t)
        positions[vi + 1] = BASE_Y + ARCH_RISE * Math.sin(t)
        positions[vi + 2] = z

        // Analytic inward-pointing normal: (ARCH_RISE·cos t, -HALF_W·sin t, 0) normalised
        const nx = ARCH_RISE * Math.cos(t)
        const ny = -HALF_W   * Math.sin(t)
        const mag = Math.sqrt(nx * nx + ny * ny) || 1
        normals[vi    ] = nx / mag
        normals[vi + 1] = ny / mag
        normals[vi + 2] = 0

        uvs[uvi    ] = cumArc[r] / TOTAL_ARC_LEN
        uvs[uvi + 1] = vCoord
        vi  += 3
        uvi += 2
      }
    }

    // Inward-facing winding: [A,C,B] then [B,C,D]
    let ii = 0
    const stride = RADIAL_SEGS + 1
    for (let j = 0; j < LENGTH_SEGS; j++) {
      for (let r = 0; r < RADIAL_SEGS; r++) {
        const A = j * stride + r
        const B = A + 1
        const C = A + stride
        const D = C + 1
        indices[ii++] = A; indices[ii++] = C; indices[ii++] = B
        indices[ii++] = B; indices[ii++] = C; indices[ii++] = D
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('normal',   new THREE.BufferAttribute(normals,   3))
    geo.setAttribute('uv',       new THREE.BufferAttribute(uvs,       2))
    geo.setIndex(new THREE.BufferAttribute(indices, 1))
    return geo
  }, [length])

  const texture = useMemo(() => {
    const t = makeTileTexture()
    t.repeat.set(TOTAL_ARC_LEN / TILE_WORLD, length / TILE_WORLD)
    return t
  }, [length])

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        map={texture}
        roughness={0.48}
        metalness={0.02}
        side={THREE.FrontSide}
      />
    </mesh>
  )
}
