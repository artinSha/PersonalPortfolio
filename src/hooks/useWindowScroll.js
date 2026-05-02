import { useEffect } from 'react'

export const scrollState = { offset: 0 }

export function useWindowScrollSetup() {
  useEffect(() => {
    function onScroll() {
      const introHeight = window.innerHeight
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      // Skip the first viewport worth of scroll (reserved for the intro screen)
      const cameraScroll = Math.max(0, window.scrollY - introHeight)
      const cameraMax = maxScroll - introHeight
      scrollState.offset = cameraMax > 0 ? cameraScroll / cameraMax : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
