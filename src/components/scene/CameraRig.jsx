import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { buildKeyframes, evaluateCamera } from '@/utils/cameraKeyframes'
import { projects } from '@/data/projects'
import { SCENE } from '@/config/scene'
import { scrollState } from '@/hooks/useWindowScroll'

export function CameraRig({ onActiveProject }) {
  const keyframes = useMemo(() => buildKeyframes(projects, SCENE), [])
  const lastActive = useRef(null)

  useFrame((state) => {
    const result = evaluateCamera(scrollState.offset, keyframes)
    if (!result) return

    const { position, quaternion, activeProjectIndex } = result

    if (position) state.camera.position.lerp(position, SCENE.LERP_POSITION)
    if (quaternion) state.camera.quaternion.slerp(quaternion, SCENE.LERP_ROTATION)

    if (activeProjectIndex !== lastActive.current) {
      lastActive.current = activeProjectIndex
      onActiveProject?.(activeProjectIndex)
    }
  })

  return null
}
