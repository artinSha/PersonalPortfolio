import { useMemo } from 'react'
import { buildKeyframes, evaluateCamera } from '@/utils/cameraKeyframes'
import { projects } from '@/data/projects'
import { SCENE } from '@/config/scene'
import { scrollState } from './useWindowScroll'

export function useScrollCamera() {
  const keyframes = useMemo(() => buildKeyframes(projects, SCENE), [])
  const result = evaluateCamera(scrollState.offset, keyframes)
  return result ?? { position: null, quaternion: null, activeProjectIndex: null }
}
