import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { buildKeyframes, evaluateCamera } from '@/utils/cameraKeyframes'
import { projects } from '@/data/projects'
import { SCENE } from '@/config/scene'
import { scrollState } from '@/hooks/useWindowScroll'

export function CameraRig({ onActiveProject }) {
  const keyframes = useMemo(() => buildKeyframes(projects, SCENE), [])
  const lastActive = useRef(null)
  const _pos = useRef(new THREE.Vector3())
  const _quat = useRef(new THREE.Quaternion())

  useFrame((state) => {
    const activeProjectIndex = evaluateCamera(scrollState.offset, keyframes, _pos.current, _quat.current)
    if (activeProjectIndex === false) return

    state.camera.position.lerp(_pos.current, SCENE.LERP_POSITION)
    state.camera.quaternion.slerp(_quat.current, SCENE.LERP_ROTATION)

    if (activeProjectIndex !== lastActive.current) {
      lastActive.current = activeProjectIndex
      onActiveProject?.(activeProjectIndex)
    }
  })

  return null
}
