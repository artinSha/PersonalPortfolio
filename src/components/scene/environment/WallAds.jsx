import { AdPanel } from './AdPanel'
import { SCENE } from '@/config/scene'
import { projects } from '@/data/projects'

const { TUNNEL_WIDTH, POSTER_WALL_OFFSET, BUFFER_START, SEGMENT_LENGTH, CAMERA_Y } = SCENE

function opposingWall(projectIndex) {
  const wall = projects[projectIndex].wall
  return {
    x:    wall === 'left' ?  TUNNEL_WIDTH / 2 - POSTER_WALL_OFFSET : -TUNNEL_WIDTH / 2 + POSTER_WALL_OFFSET,
    rotY: wall === 'left' ? -Math.PI / 2 : Math.PI / 2,
  }
}

const lastIdx = projects.length - 1
const segMid  = BUFFER_START + SEGMENT_LENGTH * 0.5

const ADS = [
  { src: '/assets/reduced/metro-ad.jpg',    ...opposingWall(0),       z: -segMid - 1   },
  { src: '/assets/reduced/water-ad.jpg',    ...opposingWall(1),       z: -segMid - 6.5 },
  { src: '/assets/reduced/tap-ad.jpg',      ...opposingWall(lastIdx), z: -(BUFFER_START + lastIdx * SEGMENT_LENGTH + SEGMENT_LENGTH * 0.5) + 2 },
  { src: '/assets/reduced/distance-ad.jpg', ...opposingWall(lastIdx), z: -25.5 },
]

export function WallAds() {
  return ADS.map(({ src, x, rotY, z }) => (
    <AdPanel key={src} src={src} position={[x, CAMERA_Y + 0.5, z]} rotY={rotY} />
  ))
}
