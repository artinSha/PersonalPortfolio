export function CeilingPanels({ length, width, height }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, height, -length / 2]}>
      <planeGeometry args={[width, length]} />
      <meshStandardMaterial color="#1a1a24" roughness={0.9} metalness={0.1} />
    </mesh>
  )
}
