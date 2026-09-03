import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default function Weather({ position, weather }) {
  const glb = useLoader(GLTFLoader, 'models/weather.glb')
  // glb.scene.position.x = 1
  // glb.scene.rotation.y = 1

  return (
    <mesh position={position}>
      <primitive object={glb.nodes[weather]} />
    </mesh>
  )
}
