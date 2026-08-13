import { Plane, TorusKnot } from '@react-three/drei'

export default function Meshes2() {
  return (
    <>
      <Plane args={[40, 40]} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial />
      </Plane>
      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[1, 2, 1]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={'#ffffff'} roughness={0.5} metalness={1} />
      </TorusKnot>
    </>
  )
}
