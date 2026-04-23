import { SCENE } from '@/config/scene'
import { WallTiles } from './WallTiles'
import { FloorMaterial } from './FloorMaterial'
import { CeilingPanels } from './CeilingPanels'
import { LightingRig } from './LightingRig'

export function Hallway({ length }) {
  const { TUNNEL_WIDTH, TUNNEL_HEIGHT } = SCENE
  return (
    <group>
      <WallTiles side="left"  length={length} width={TUNNEL_WIDTH} height={TUNNEL_HEIGHT} />
      <WallTiles side="right" length={length} width={TUNNEL_WIDTH} height={TUNNEL_HEIGHT} />
      <FloorMaterial   length={length} width={TUNNEL_WIDTH} />
      <CeilingPanels   length={length} width={TUNNEL_WIDTH} height={TUNNEL_HEIGHT} />
      <LightingRig     length={length} />
      <fog attach="fog" args={['#0a0a12', 18, 55]} />
    </group>
  )
}
