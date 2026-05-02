import { useMemo } from 'react'
import * as THREE from 'three'

const SIGN_W  = 3.0
const SIGN_H  = 0.55
const SIGN_Z  = -4
const SIGN_Y  = 2.75

const BRACKET_Y = 3.9
const ROD_Y     = 3.45
const ROD_LEN   = 0.87

function makeSignTexture() {
  const W = 512, H = 100
  const canvas = document.createElement('canvas')
  canvas.width  = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0a0a0a'
  ctx.fillRect(0, 0, W, H)

  ctx.fillStyle = '#f5c300'
  ctx.fillRect(0, 0, W, 5)

  ctx.textAlign = 'center'

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 38px Arial, sans-serif'
  if ('letterSpacing' in ctx) ctx.letterSpacing = '3px'
  ctx.fillText('ARTIN SHAHPOURI', W / 2, 47)

  ctx.fillStyle = '#bbbbbb'
  ctx.font = '22px Arial, sans-serif'
  if ('letterSpacing' in ctx) ctx.letterSpacing = '4px'
  ctx.fillText('SOFTWARE ENGINEER', W / 2, 75)

  ctx.fillStyle = '#4a4a4a'
  ctx.font = '14px Arial, sans-serif'
  if ('letterSpacing' in ctx) ctx.letterSpacing = '2px'
  ctx.fillText('▼  SCROLL TO EXPLORE', W / 2, 94)

  return new THREE.CanvasTexture(canvas)
}

export function IntroSign() {
  const texture = useMemo(() => makeSignTexture(), [])

  return (
    <group>
      {/* Ceiling bracket */}
      <mesh position={[0, BRACKET_Y, SIGN_Z]}>
        <boxGeometry args={[2.4, 0.05, 0.06]} />
        <meshStandardMaterial color="#c8b400" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Left rod */}
      <mesh position={[-1.1, ROD_Y, SIGN_Z]}>
        <cylinderGeometry args={[0.015, 0.015, ROD_LEN, 8]} />
        <meshStandardMaterial color="#c8b400" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Right rod */}
      <mesh position={[1.1, ROD_Y, SIGN_Z]}>
        <cylinderGeometry args={[0.015, 0.015, ROD_LEN, 8]} />
        <meshStandardMaterial color="#c8b400" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Sign panel */}
      <mesh position={[0, SIGN_Y, SIGN_Z]}>
        <boxGeometry args={[SIGN_W, SIGN_H, 0.04]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.6}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
