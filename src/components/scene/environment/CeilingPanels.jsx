import { useMemo } from 'react'
import * as THREE from 'three'

function makeCeilingTexture() {
  const W = 256, H = 256
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#141820'
  ctx.fillRect(0, 0, W, H)

  // Soft shadow flanking each seam (recessed-panel illusion)
  ctx.strokeStyle = 'rgba(0,0,0,0.22)'
  ctx.lineWidth = 7
  for (let x = 0; x <= W; x += 128) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
  }
  for (let y = 0; y <= H; y += 64) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
  }

  // Crisp seam line on top
  ctx.strokeStyle = '#0c0e14'
  ctx.lineWidth = 1.5
  for (let x = 0; x <= W; x += 128) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
  }
  for (let y = 0; y <= H; y += 64) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  return tex
}

// Canvas: 2 panels wide × 4 panels tall; each panel = 1.5 × 0.75 world units
const WORLD_W = 2 * 1.5  // 3.0
const WORLD_H = 4 * 0.75 // 3.0

export function CeilingPanels({ length, width, height }) {
  const texture = useMemo(() => {
    const t = makeCeilingTexture()
    t.repeat.set(width / WORLD_W, length / WORLD_H)
    return t
  }, [length, width])

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, height, -length / 2]}>
      <planeGeometry args={[width, length]} />
      <meshStandardMaterial map={texture} roughness={0.8} metalness={0.2} />
    </mesh>
  )
}
