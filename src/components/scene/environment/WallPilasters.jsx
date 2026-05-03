import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { SCENE } from '@/config/scene'
import { projects } from '@/data/projects'

const PILLAR_RADIUS = 0.14
const PILLAR_SEGS   = 16
const PILLAR_COLOR  = '#f5c300'

const PILLAR_GEO = new THREE.CylinderGeometry(PILLAR_RADIUS, PILLAR_RADIUS, SCENE.TUNNEL_HEIGHT, PILLAR_SEGS)
const PILLAR_MAT = new THREE.MeshStandardMaterial({ color: PILLAR_COLOR, roughness: 0.5, metalness: 0.1 })

const _matrix = new THREE.Matrix4()

export function WallPilasters() {
  const { TUNNEL_WIDTH, TUNNEL_HEIGHT, BUFFER_START, SEGMENT_LENGTH } = SCENE
  const n = projects.length

  const zPositions = [
    0,
    ...Array.from({ length: n + 1 }, (_, i) => -(BUFFER_START + i * SEGMENT_LENGTH)),
  ]

  const sides = [
    -(TUNNEL_WIDTH / 2) + PILLAR_RADIUS * 0.5,
     (TUNNEL_WIDTH / 2) - PILLAR_RADIUS * 0.5,
  ]

  const count = sides.length * zPositions.length
  const meshRef = useRef()

  useEffect(() => {
    if (!meshRef.current) return
    let idx = 0
    for (const x of sides) {
      for (const z of zPositions) {
        _matrix.setPosition(x, TUNNEL_HEIGHT / 2, z)
        meshRef.current.setMatrixAt(idx++, _matrix)
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <instancedMesh ref={meshRef} args={[PILLAR_GEO, PILLAR_MAT, count]} frustumCulled={false} />
  )
}
