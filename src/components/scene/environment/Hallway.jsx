import { SCENE } from '@/config/scene'
import { WallTiles }   from './WallTiles'
import { FloorMaterial } from './FloorMaterial'
import { TunnelVault }  from './TunnelVault'
import { LightingRig }  from './LightingRig'
import { WallPilasters } from './WallPilasters'

export function Hallway({ length }) {
  const { TUNNEL_WIDTH, TUNNEL_HEIGHT } = SCENE
  return (
    <group>
      <WallTiles side="left"  length={length} width={TUNNEL_WIDTH} height={TUNNEL_HEIGHT} />
      <WallTiles side="right" length={length} width={TUNNEL_WIDTH} height={TUNNEL_HEIGHT} />
      <FloorMaterial length={length} width={TUNNEL_WIDTH} />
      <TunnelVault   length={length} />
      <WallPilasters />
      <LightingRig   length={length} />
      <fog attach="fog" args={['#0c0e16', 20, 58]} />
    </group>
  )
}
