import { useMemo } from 'react'
import * as THREE from 'three'

const TILE_SIZE = 64
const GROUT = 4

function makeTileTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = TILE_SIZE
  canvas.height = TILE_SIZE
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#c8c8d0'
  ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE)
  ctx.fillStyle = '#5a5a6a'
  ctx.fillRect(0, 0, TILE_SIZE, GROUT)
  ctx.fillRect(0, 0, GROUT, TILE_SIZE)
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  return tex
}

export function WallTiles({ side, length, width, height }) {
  const texture = useMemo(() => {
    const t = makeTileTexture()
    const tileWorldSize = 0.3
    t.repeat.set(length / tileWorldSize, height / tileWorldSize)
    return t
  }, [length, height])

  const x = side === 'left' ? -width / 2 : width / 2
  const rotY = side === 'left' ? Math.PI / 2 : -Math.PI / 2

  return (
    <mesh position={[x, height / 2, -length / 2]} rotation={[0, rotY, 0]}>
      <planeGeometry args={[length, height]} />
      <meshStandardMaterial map={texture} roughness={0.6} metalness={0.05} />
    </mesh>
  )
}
