import { useMemo } from 'react'
import { useScroll } from '@react-three/drei'
import { buildKeyframes, evaluateCamera } from '@/utils/cameraKeyframes'
import { projects } from '@/data/projects'
import { SCENE } from '@/config/scene'

export function useScrollCamera() {
  const scroll = useScroll()
  const keyframes = useMemo(() => buildKeyframes(projects, SCENE), [])

  const result = evaluateCamera(scroll.offset, keyframes)
  return result ?? { position: null, quaternion: null, activeProjectIndex: null }
}
