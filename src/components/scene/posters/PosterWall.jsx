import { Suspense } from 'react'
import { SCENE } from '@/config/scene'
import { Poster } from './Poster'

export function PosterWall({ projects, activeProjectIndex }) {
  const { TUNNEL_WIDTH, BUFFER_START, SEGMENT_LENGTH, POSTER_Y, POSTER_WALL_OFFSET } = SCENE

  return (
    <group>
      {projects.map((project, i) => {
        const z = -(BUFFER_START + i * SEGMENT_LENGTH + SEGMENT_LENGTH * 0.5)
        const isLeft = project.wall === 'left'
        const x = isLeft
          ? -(TUNNEL_WIDTH / 2) + POSTER_WALL_OFFSET
          : (TUNNEL_WIDTH / 2) - POSTER_WALL_OFFSET
        const rotationY = isLeft ? Math.PI / 2 : -Math.PI / 2

        return (
          <Suspense key={project.id} fallback={null}>
            <Poster
              position={[x, POSTER_Y, z]}
              rotationY={rotationY}
              project={project}
              isActive={activeProjectIndex === i}
            />
          </Suspense>
        )
      })}
    </group>
  )
}
