export function FloorMaterial({ length, width }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -length / 2]}>
      <planeGeometry args={[width, length]} />
      <meshStandardMaterial color="#111116" roughness={0.95} metalness={0.0} />
    </mesh>
  )
}
