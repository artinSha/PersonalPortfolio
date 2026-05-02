import { useMemo } from 'react'
import * as THREE from 'three'
import { SCENE } from '@/config/scene'

const SIGN_W = 4.0
const SIGN_H = 0.75
const SIGN_Z = -4
const SIGN_Y = 3.2

// Derived top-down from ceiling so everything stays connected
const BRACKET_Y = SCENE.TUNNEL_HEIGHT - 0.025          // flush with ceiling
const SIGN_TOP  = SIGN_Y + SIGN_H / 2                  // 2.85
const ROD_LEN   = (BRACKET_Y - 0.025) - SIGN_TOP       // spans bracket-bottom → sign-top
const ROD_Y     = SIGN_TOP + ROD_LEN / 2               // rod center

function makeSignTexture() {
  const W = 1024, H = 192
  const canvas = document.createElement('canvas')
  canvas.width  = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  // Dark background
  ctx.fillStyle = '#111111'
  ctx.fillRect(0, 0, W, H)

  // Outer border
  ctx.strokeStyle = '#555555'
  ctx.lineWidth = 3
  ctx.strokeRect(1.5, 1.5, W - 3, H - 3)

  // Left blue badge (subway-style identifier)
  const BADGE_W = 200
  ctx.fillStyle = '#1560bd'
  ctx.fillRect(0, 0, BADGE_W, H)

  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = 'bold 78px Arial, sans-serif'
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  ctx.fillText('AS', BADGE_W / 2, H / 2)

  // Divider after badge
  ctx.fillStyle = '#777777'
  ctx.fillRect(BADGE_W, 10, 2, H - 20)

  // Right arrow section
  const ARROW_START = W - 96
  ctx.fillStyle = '#333333'
  ctx.fillRect(ARROW_START, 10, 2, H - 20)

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 54px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('↓', ARROW_START + 48, H / 2)

  // Main content — centered in space between badge and arrow
  const CONTENT_X = BADGE_W + (ARROW_START - BADGE_W) / 2
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 50px Arial, sans-serif'
  if ('letterSpacing' in ctx) ctx.letterSpacing = '3px'
  ctx.fillText('ARTIN SHAHPOURI', CONTENT_X, 72)

  ctx.fillStyle = '#cccccc'
  ctx.font = '27px Arial, sans-serif'
  if ('letterSpacing' in ctx) ctx.letterSpacing = '5px'
  ctx.fillText('SOFTWARE ENGINEER', CONTENT_X, 112)

  ctx.fillStyle = '#888888'
  ctx.font = '20px Arial, sans-serif'
  if ('letterSpacing' in ctx) ctx.letterSpacing = '3px'
  ctx.fillText('COMPUTING SCIENCE  ·  SFU', CONTENT_X, 148)

  return new THREE.CanvasTexture(canvas)
}

export function IntroSign() {
  const texture = useMemo(() => makeSignTexture(), [])

  return (
    <group>
      {/* Ceiling bracket */}
      <mesh position={[0, BRACKET_Y, SIGN_Z]}>
        <boxGeometry args={[3.6, 0.05, 0.06]} />
        <meshStandardMaterial color="#c8b400" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Left rod */}
      <mesh position={[-1.5, ROD_Y, SIGN_Z]}>
        <cylinderGeometry args={[0.015, 0.015, ROD_LEN, 8]} />
        <meshStandardMaterial color="#c8b400" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Right rod */}
      <mesh position={[1.5, ROD_Y, SIGN_Z]}>
        <cylinderGeometry args={[0.015, 0.015, ROD_LEN, 8]} />
        <meshStandardMaterial color="#c8b400" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Sign panel */}
      <mesh position={[0, SIGN_Y, SIGN_Z]}>
        <boxGeometry args={[SIGN_W, SIGN_H, 0.04]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.55}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
